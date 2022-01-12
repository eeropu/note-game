import React from "react";
import usePitchy from "../hooks/usePitchy";

const Tuner: React.FC = () => {
    const { start, pitch, clarity, note } = usePitchy()

    return (
        <div>
            <p>Pitch: { pitch }</p>
            <p>Note: { note }</p>
            <p>Clarity: { clarity }</p>
            <button onClick={start}>Start</button>
        </div>
    )
}

export default Tuner