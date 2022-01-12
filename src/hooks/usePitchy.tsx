import { useState } from "react";
import { PitchDetector } from "pitchy";

const usePitchy = () => {

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
    const [ note, setNote ] = useState('')
    const [ clarity, setClarity ] = useState(0)

    const start = () => {
        const audioContext = new window.AudioContext()
        const analyserNode = audioContext.createAnalyser()

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
            const octave = Math.ceil((roundedDistance - 9) / 12) + 5

            if (note === 12){
                note = 0
            }

            if (clarity > 0.8) {
                setPitch(frequency)
                setNote(`${notes[note][0]}${octave}`)
                setClarity(Math.round(clarity * 100))
            }
        }
        
        window.setTimeout(
            () => updatePitch(analyserNode, detector, input, sampleRate),
            100
        );
    }

    return { start, pitch, clarity, note }
}

export default usePitchy