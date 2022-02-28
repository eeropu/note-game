const text_note_A2 = require('./../assets/text_note_A2.png')
const text_note_A3 = require('./../assets/text_note_A3.png')
const text_note_A4 = require('./../assets/text_note_A3.png')
const text_note_Ab2 = require('./../assets/text_note_Ab2.png')
const text_note_Ab3 = require('./../assets/text_note_Ab3.png')
const text_note_Ab4 = require('./../assets/text_note_Ab4.png')
const text_note_As2 = require('./../assets/text_note_As2.png')
const text_note_As3 = require('./../assets/text_note_As3.png')
const text_note_As4 = require('./../assets/text_note_As4.png')
const text_note_B2 = require('./../assets/text_note_B2.png')
const text_note_B3 = require('./../assets/text_note_B3.png')
const text_note_B4 = require('./../assets/text_note_B4.png')
const text_note_Bb2 = require('./../assets/text_note_Bb2.png')
const text_note_Bb3 = require('./../assets/text_note_Bb3.png')
const text_note_Bb4 = require('./../assets/text_note_Bb4.png')
const text_note_C3 = require('./../assets/text_note_C3.png')
const text_note_C4 = require('./../assets/text_note_C4.png')
const text_note_C5 = require('./../assets/text_note_C5.png')
const text_note_Cs3 = require('./../assets/text_note_Cs3.png')
const text_note_Cs4 = require('./../assets/text_note_Cs4.png')
const text_note_Cs5 = require('./../assets/text_note_Cs5.png')
const text_note_D3 = require('./../assets/text_note_D3.png')
const text_note_D4 = require('./../assets/text_note_D4.png')
const text_note_D5 = require('./../assets/text_note_D5.png')
const text_note_Db3 = require('./../assets/text_note_Db3.png')
const text_note_Db4 = require('./../assets/text_note_Db4.png')
const text_note_Db5 = require('./../assets/text_note_Db5.png')
const text_note_Ds3 = require('./../assets/text_note_Ds3.png')
const text_note_Ds4 = require('./../assets/text_note_Ds4.png')
const text_note_Ds5 = require('./../assets/text_note_Ds5.png')
const text_note_E2 = require('./../assets/text_note_E2.png')
const text_note_E3 = require('./../assets/text_note_E3.png')
const text_note_E4 = require('./../assets/text_note_E4.png')
const text_note_E5 = require('./../assets/text_note_E5.png')
const text_note_Eb3 = require('./../assets/text_note_Eb3.png')
const text_note_Eb4 = require('./../assets/text_note_Eb4.png')
const text_note_Eb5 = require('./../assets/text_note_Eb5.png')
const text_note_F2 = require('./../assets/text_note_F2.png')
const text_note_F3 = require('./../assets/text_note_F3.png')
const text_note_F4 = require('./../assets/text_note_F4.png')
const text_note_Fs2 = require('./../assets/text_note_Fs2.png')
const text_note_Fs3 = require('./../assets/text_note_Fs3.png')
const text_note_Fs4 = require('./../assets/text_note_Fs4.png')
const text_note_G2 = require('./../assets/text_note_G2.png')
const text_note_G3 = require('./../assets/text_note_G3.png')
const text_note_G4 = require('./../assets/text_note_G4.png')
const text_note_Gb2 = require('./../assets/text_note_Gb2.png')
const text_note_Gb3 = require('./../assets/text_note_Gb3.png')
const text_note_Gb4 = require('./../assets/text_note_Gb4.png')
const text_note_Gs2 = require('./../assets/text_note_Gs2.png')
const text_note_Gs3 = require('./../assets/text_note_Gs3.png')
const text_note_Gs4 = require('./../assets/text_note_Gs4.png')
const musical_notation_example = require('./../assets/musical_notation_example.png')
const musical_notation_included = require('./../assets/musical_notation_included.png')


const useImages = () => {

    const textNoteImages: {[k: string]: string} = {
        text_note_A2,
        text_note_A3,
        text_note_A4,
        text_note_Ab2,
        text_note_Ab3,
        text_note_Ab4,
        text_note_As2,
        text_note_As3,
        text_note_As4,
        text_note_B2,
        text_note_B3,
        text_note_B4,
        text_note_Bb2,
        text_note_Bb3,
        text_note_Bb4,
        text_note_C3,
        text_note_C4,
        text_note_C5,
        text_note_Cs3,
        text_note_Cs4,
        text_note_Cs5,
        text_note_D3,
        text_note_D4,
        text_note_D5,
        text_note_Db3,
        text_note_Db4,
        text_note_Db5,
        text_note_Ds3,
        text_note_Ds4,
        text_note_Ds5,
        text_note_E2,
        text_note_E3,
        text_note_E4,
        text_note_E5,
        text_note_Eb3,
        text_note_Eb4,
        text_note_Eb5,
        text_note_F2,
        text_note_F3,
        text_note_F4,
        text_note_Fs2,
        text_note_Fs3,
        text_note_Fs4,
        text_note_G2,
        text_note_G3,
        text_note_G4,
        text_note_Gb2,
        text_note_Gb3,
        text_note_Gb4,
        text_note_Gs2,
        text_note_Gs3,
        text_note_Gs4,
    }

    const otherImages = {
        musical_notation_example,
        musical_notation_included
    }

    return { textNoteImages, otherImages }
}

export default useImages