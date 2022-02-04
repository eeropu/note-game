import React, { useRef } from 'react'

const GameGraphics = () => {

    const circle1 = useRef(null)
    const circle2 = useRef(null)
    const circle3 = useRef(null)
    const circle4 = useRef(null)

    const runAnimation = () => {
        const animateCircle1 = circle1.current! as SVGAnimateElement
        const animateCircle2 = circle2.current! as SVGAnimateElement
        const animateCircle3 = circle3.current! as SVGAnimateElement
        const animateCircle4 = circle4.current! as SVGAnimateElement
        animateCircle1.beginElement()
        animateCircle2.beginElement()
        animateCircle3.beginElement()
        animateCircle4.beginElement()
    }

    return (
        <>
            <svg width={600} height={300} fill='red' className='game-graphics'>
                <circle id='circle-position-1' cx={100} cy={150} r={50}>
                    <animate ref={circle1} attributeName="cx" begin="none" dur="0.3s" repeatCount={1} from="100" to="-100" fill='freeze'/>
                </circle>
                <text textAnchor='middle'
                    x='100'
                    y='162'
                    fontSize={40}
                    fontWeight={500}>
                        A
                </text>
                <circle id='circle-position-2' cx={300} cy={150} r={50}>
                    <animate ref={circle2} attributeName="cx" begin="none" dur="0.3s" repeatCount={1} from="300" to="100" fill='freeze'/>
                </circle>
                <circle id='circle-position-3' cx={500} cy={150} r={50}>
                    <animate ref={circle3} attributeName="cx" begin="none" dur="0.3s" repeatCount={1} from="500" to="300" fill='freeze'/>
                </circle>
                <circle id='circle-position-4' cx={700} cy={150} r={50}>
                    <animate ref={circle4} attributeName="cx" begin="none" dur="0.3s" repeatCount={1} from="700" to="500" fill='freeze'/>
                </circle>
            </svg>
            <button onClick={runAnimation}>test</button>
        </>
    )
}

export default GameGraphics