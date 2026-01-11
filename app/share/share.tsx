import "./share.scss"

import { useState } from "react"

const notHoveringStyle = {
    outline: "1px solid white",
    display: "inline-block",
    width: "80%",
    padding: "10px",
    margin: "0 0 10px 0"
}

const hoveringStyle = {
    outline: "1px solid white",
    color: "black",
    backgroundColor: "white",
    display: "inline-block",
    width: "80%",
    padding: "10px",
    margin: "0 0 10px 0"
}

function ShareButton(props) {
    const [isHovering, setIsHovering] = useState(false)
    const hoverStyle = (isHovering ? hoveringStyle: notHoveringStyle);

    return (
        <li 
            style = {hoverStyle}
            onMouseOver = {() => {setIsHovering(true)}}
            onMouseLeave = {() => {setIsHovering(false)}}
        ><button
            onClick = {props.action}
        >{props.label}</button></li>
    );
}

export default function SharePanel(props) {
    return (
        <div>
            <div className = "DimBackground" />
            <div className = "SharePanel">
                <div className = "Inner">
                    <h1>share</h1>
                    
                    <ul>
                        <ShareButton label = "generate shareable link" />
                        <ShareButton label = "create spotify playlist" />
                        <ShareButton label = "create apple music playlist" />
                        <ShareButton label = "export to json" />
                    </ul>

                    <button 
                        className = "CloseButton"
                        onClick = {() => {props.hideSharePanel()}}
                    >X</button>
                </div>
            </div>
        </div>
    );
}