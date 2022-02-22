import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsInfoCircle } from 'react-icons/bs'

interface ITooltipProps {
    content: string
}

const TooltipHelper: React.FC<ITooltipProps> = ({ content }) => (
    <OverlayTrigger
        placement={'right'}
        overlay={
            <Tooltip>
                { content }
            </Tooltip>
        }
    >
        <span><BsInfoCircle/></span>
    </OverlayTrigger>
)

export default TooltipHelper