import "./share.scss"

import React from "react"

class ShareButton extends React.Component {
    notHoveringStyle = {
        outline: "1px solid white",
        display: "inline-block",
        width: "80%",
        padding: "10px",
        margin: "0 0 10px 0"
    }

    hoveringStyle = {
        outline: "1px solid white",
        color: "black",
        backgroundColor: "white",
        display: "inline-block",
        width: "80%",
        padding: "10px",
        margin: "0 0 10px 0"
    }

    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
    }

    render() {
        const hoverStyle = (this.state.hovering ? this.hoveringStyle : this.notHoveringStyle)

        return (
            <li 
                style = {hoverStyle}
                onMouseOver = {() => {this.setState({hovering: true})}}
                onMouseLeave = {() => {this.setState({hovering: false})}}
            ><button
                onClick = {this.props.action}
            >{this.props.label}</button></li>
        );
    }
}

export default class SharePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                            onClick = {() => {this.props.hideSharePanel()}}
                        >X</button>
                    </div>
                </div>
            </div>
        );
    }
}