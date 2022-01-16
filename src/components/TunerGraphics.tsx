import React from 'react'

interface ITunerGraphicsProps {
    pitch: number
    note: string
    deviation: number
}

const TunerGraphics: React.FC<ITunerGraphicsProps> = ({ pitch, note, deviation }) => {
    return (
        <svg className='tuner-graphics'>
            <path className='tuner-graphics-meter' d="M0 50 Q150 -48 300 50 L200 150 Q150 120 100 150 L0 50" />
            <path className='tuner-graphics-pointer' d="M150 70 L160 165 Q150 182 140 165 L150 70 L150 155" 
                transform={`rotate(${deviation * 90})`}
            />
            <circle cx='150' cy='165' r='3'/>
            <text textAnchor='middle'
                x='150'
                y='40'
                fontSize={40}
                fontWeight={500}
                className={Math.abs(deviation) < 0.1 ? 'in-tune' : 'out-of-tune'}>
                    { note }
            </text>
            <text textAnchor='middle' x='150' y='210' fontSize={25}>{ pitch } hz</text>
        </svg>
    )
}

export default TunerGraphics