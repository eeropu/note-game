import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsInfoCircle } from 'react-icons/bs'

interface ITooltipProps {
    content: string
    image?: {
        src: string,
        alt: string
    }
}

const TooltipHelper: React.FC<ITooltipProps> = ({ content, image }) => (
    <OverlayTrigger
        placement={'right'}
        overlay={
            <Tooltip>
                { content }
            </Tooltip>
        }
    >
        { image ? <img src={image.src} alt={image.alt} width={"100%"}/> 
                : <span><BsInfoCircle/></span>
        }
    </OverlayTrigger>
)

export default TooltipHelper