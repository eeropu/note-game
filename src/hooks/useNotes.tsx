// @ts-nocheck

import { noteFrequencies } from './../data/note-frequencies'
import { keys } from './../data/keys'

interface IUseNotesProps {
    majorOrMinor: 'major' | 'minor',
    key: string,
    position: number
}

const STANDARD_TUNING_NOTE_INDEXES = {
    E: 28,
    A: 33,
    D: 38,
    G: 43,
    B: 47,
    e: 52
}

const useNotes = ({majorOrMinor, key, position}: IUseNotesProps) => {
    const noteNames = Object.keys(noteFrequencies)
    const notesInPosition = Object.keys(STANDARD_TUNING_NOTE_INDEXES).reduce((list, next) => {
        const openString = next as "E" | "A" | "D" | "G" | "B" | "e"
        const a = noteNames.slice(
            STANDARD_TUNING_NOTE_INDEXES[openString] + (position === 1 ? 0 : position),
            STANDARD_TUNING_NOTE_INDEXES[openString] + position + 4
        )
        return list.concat(a)
    }, [] as string[])
    const uniqueNotes = notesInPosition.filter((note, index, self) => self.indexOf(note) === index)
    const notes = uniqueNotes.reduce((list, note) => {
        if (note.includes("/")) {
            const [ sharp, flat ] = note.split("/")
            if (keys[majorOrMinor][key][sharp[0]] === "#") {
                return list.concat(sharp)
            } else if (keys[majorOrMinor][key][flat[0]] === "b") {
                return list.concat(flat)
            } else {
                return list
            }
        } else if (keys[majorOrMinor][key][note[0]] === ""){
            return list.concat(note)
        } else if (
            (note[0] === "F" && keys[majorOrMinor][key]["E"] === "#") ||
            (note[0] === "C" && keys[majorOrMinor][key]["B"] === "#") ||
            (note[0] === "E" && keys[majorOrMinor][key]["F"] === "b") ||
            (note[0] === "B" && keys[majorOrMinor][key]["C"] === "b")
        ) {
            return list.concat(note)
        } else {
            return list
        }
    }, [] as string[])
    return { notes }
}

export default useNotes