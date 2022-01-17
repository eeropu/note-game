import { useEffect, useState } from "react";
import { PitchDetector } from "pitchy";

let audioContext: AudioContext;
let analyserNode: AnalyserNode;

const usePitchy = (clarityTreshold: number) => {

    const notes = [
        ['A'],
        ['A#', 'Bb'],
        ['B'],
        ['C'],
        ['C#', 'Db'],
        ['D'],
        ['D#', 'Eb'],
        ['E'],
        ['F'],
        ['F#', 'Gb'],
        ['G'],
        ['G#', 'Ab'],
    ]

    const [ pitch, setPitch ] = useState(440)
    const [ note, setNote ] = useState('A')
    const [ deviation, setDeviation ] = useState(0)
    const [ clarity, setClarity ] = useState(0)
    const [ running, setRunning ] = useState(false)

    useEffect(() => {
        if (audioContext && audioContext.state !== 'closed') {
            stop()
        }
    }, [ clarityTreshold ])

    const start = () => {
        setRunning(true)

        audioContext = new window.AudioContext()
        analyserNode = audioContext.createAnalyser()

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            audioContext.createMediaStreamSource(stream).connect(analyserNode)
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
            const input = new Float32Array(analyserNode.fftSize)
            updatePitch(analyserNode, detector, input, audioContext.sampleRate)
        })
    }

    const updatePitch = (analyserNode: AnalyserNode, detector: PitchDetector<Float32Array>, input: Float32Array, sampleRate: number) => {
        analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(input, sampleRate);

        if (pitch) {
            const frequency = Math.round(pitch * 10) / 10
            const distanceFromA4 = (12 * Math.log(frequency/440)) / Math.log(2)
            const roundedDistance = Math.round(distanceFromA4)
            let note = distanceFromA4 >= 0 ? roundedDistance % 12 : 12 + roundedDistance % 12
            const octave = Math.ceil((roundedDistance - 2) / 12) + 4
            let deviation = distanceFromA4 % 1

            if (note === 12){
                note = 0
            }

            if (distanceFromA4 >= 0) {
                deviation = deviation <= 0.5 ? deviation : deviation - 1
            } else {
                deviation = deviation >= -0.5 ? deviation : deviation + 1
            }

            if (clarity * 100 >= clarityTreshold) {
                setPitch(frequency)
                setNote(`${notes[note][0]}${octave}`)
                setDeviation(deviation)
                setClarity(Math.round(clarity * 100))
            }
        }

        window.setTimeout(
            () => {
                if (analyserNode.context.state === 'running') {
                    updatePitch(analyserNode, detector, input, sampleRate)
                }
            },
            200
        );
        
    }

    const stop = () => {
        audioContext.close()
        analyserNode.disconnect()
        setRunning(false)
    }

    return { start, stop, pitch, clarity, note, deviation, running }
}

export default usePitchy