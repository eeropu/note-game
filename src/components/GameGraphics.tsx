import React, { useEffect, useRef } from 'react'
import useImages from '../hooks/useImages'

interface IGameGraphicsProps {
    noteQueue: string[]
}

const GameGraphics: React.FC<IGameGraphicsProps> = ({ noteQueue }) => {

    const { textNoteImages } = useImages()

    const canvas = useRef(null)
    const currentNote = new Image()
    const nextNote = new Image()
    const lastNote = new Image()

    useEffect(() => {
        currentNote.src = textNoteImages[`text_note_${ noteQueue[0].replace("#", "s") }`]
        nextNote.src = textNoteImages[`text_note_${ noteQueue[1].replace("#", "s") }`]
        lastNote.src = textNoteImages[`text_note_${ noteQueue[2].replace("#", "s") }`]
        window.requestAnimationFrame(draw)
    }, )

    const draw = () => {
        const c = canvas.current! as HTMLCanvasElement
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


    return (
        <canvas ref={canvas} width="600" height="200"/>
    )
}

export default GameGraphics