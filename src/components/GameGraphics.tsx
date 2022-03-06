import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Vex from 'vexflow'
import useImages from '../hooks/useImages'
import { RootState } from '../redux/store'

const MINOR_TO_MAJOR = {
    A: "C",
    E: "G",
    B: "D",
    'F#': "A",
    'C#': "E",
    "G#": "B",
    "D#": "F#",
    "A#": "C#",
    D: "F",
    G: "Bb",
    C: "Eb",
    F: "Ab",
    Bb: "Db",
    Eb: "Gb",
    Ab: "Cb"
}

interface IGameGraphicsProps {
    noteQueue: string[],
}

const GameGraphics: React.FC<IGameGraphicsProps> = ({ noteQueue }) => {

    const displayType = useSelector((state: RootState) => state.settings.displayType)
    const majorOrMinor = useSelector((state: RootState) => state.key.majorOrMinor)
    const key = useSelector((state: RootState) => state.key.key)

    const { textNoteImages } = useImages()

    const textNoteCanvas = useRef(null)
    const musicalNotationCanvas = useRef(null)
    const currentNote = new Image()
    const nextNote = new Image()
    const lastNote = new Image()

    useEffect(() => {
        currentNote.src = textNoteImages[`text_note_${noteQueue[0].replace("#", "s")}`]
        nextNote.src = textNoteImages[`text_note_${noteQueue[1].replace("#", "s")}`]
        lastNote.src = textNoteImages[`text_note_${noteQueue[2].replace("#", "s")}`]
        window.requestAnimationFrame(draw)
    })

    const draw = () => {
        const c = textNoteCanvas.current! as HTMLCanvasElement
        const ctx = c.getContext('2d') as CanvasRenderingContext2D

        ctx.clearRect(0, 0, 600, 300)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';

        ctx.drawImage(currentNote, 50, 50, 100, 100)
        ctx.drawImage(nextNote, 250, 50, 100, 100)
        ctx.drawImage(lastNote, 450, 50, 100, 100)

        window.requestAnimationFrame(draw)
    }

    const VF = Vex.Flow
    if (musicalNotationCanvas.current) {
        const renderer = new VF.Renderer(musicalNotationCanvas.current, VF.Renderer.Backends.CANVAS);
        const context = renderer.getContext()
        context.clear()
        context.setFillStyle('rgba(0, 0, 0, 0.9)')
        context.fillRect(0, 0, 600, 200)
        var stave = new VF.Stave(10, 40, 580, { fill_style: 'white' });
        context.setStrokeStyle('rgba(255, 255, 255, 0.9)')
        context.setFillStyle('rgba(255, 255, 255, 0.9)')
        // @ts-ignore
        stave.addClef("treble").addKeySignature(majorOrMinor === 'major' ? key : MINOR_TO_MAJOR[key])
        stave.setContext(context).draw();

        const notes = noteQueue.map(note => new VF.StaveNote({ clef: "treble", keys: [`${note[0]}/${Number(note.slice(-1)) + 1}`], duration: "q" }),)
        var voice = new VF.Voice({ num_beats: 3, beat_value: 4 });
        voice.addTickables(notes);

        new VF.Formatter().joinVoices([voice]).format([voice], 580);

        voice.draw(context, stave);
    }

    return (
        <>
            <canvas style={{display: displayType === "text" ? 'block' : 'none'}} ref={textNoteCanvas} width="600" height="200" />
            <canvas style={{display: displayType !== "text" ? 'block' : 'none'}} ref={musicalNotationCanvas} width="600" height="200" />
        </>
    )
}

export default GameGraphics