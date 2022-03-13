import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsInfoCircle } from 'react-icons/bs'

interface ITooltipProps {
    content: string
    image?: {
        src: string,
        alt: string
    }
    children?: React.ReactElement
}

const TooltipHelper: React.FC<ITooltipProps> = ({ content, image, children }) => {

    if (children) {
        return (
            <OverlayTrigger
                placement={'right'}
                overlay={
                    <Tooltip>
                        { content }
                    </Tooltip>
                }
            >
                {children}
            </OverlayTrigger>
        )
    }

    return (
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
}

export default TooltipHelper