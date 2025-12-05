"use client"

import React from "react"
import { v4 as uuidv4 } from "uuid";

import "./playlist.scss"

export class SongInfo extends React.Component {
    name: string;
    year: number;
    genres: string;
    thumbnailUrl: string;
    discogsUrl: string;
    objectUuid: string;
    addable: boolean;

    constructor(props, data: Map<string, any>, addable: boolean = true) {
        super(props);

        // Data encoded starting with a "_" is created by the clone function below.
        // This is a weird thing we do because *no overloading constructors*! Yippee!
        // (Why do functional languages even bother supporting OOP if they don't care about implementing it well...)
        this.name = data.get("_name") || data.get("title");
        this.year = data.get("year");

        this.genres = data.get("_genres") || data.get("style").join(", ");
        this.thumbnailUrl = data.get("_thumbnailUrl") || data.get("cover_image");
        this.discogsUrl = data.get("_discogsUrl") || ("https://discogs.com" + data.get("uri"));

        this.objectUuid = uuidv4();
        this.addable = addable;
    }

    clone() {
        return new SongInfo(
            this.props,
            new Map<string, any>([
                ["_name", this.name],
                ["year", this.year],
                ["_genres", this.genres],
                ["_thumbnailUrl", this.thumbnailUrl],
                ["_discogsUrl", this.discogsUrl],
            ]),
            this.addable
        );
    }

    render() {
        return (
            <li 
                className = "SongInfo"
                key = {this.objectUuid}
            >
                <div className = "Inner">
                    <img 
                        className = "Thumb"
                        src = {this.thumbnailUrl}
                    />
                    <p className = "InfoText">
                        <b>{this.name}</b><br />
                        {this.year}<br />
                        {this.genres}<br />
                        <a href = {this.discogsUrl}>Discogs Link</a>
                    </p>
                    {this.addable ?
                        <button
                            className = "AddSongButton"
                            onClick = {() => {this.props.songAdd(this)}}
                        >+</button> : 
                        <button
                            className = "RemoveSongButton"
                            onClick = {() => {this.props.songRemove(this)}}
                        >-</button>
                    }
                </div>
            </li>
        );
    }
}

export class Playlist extends React.Component {
    name: string;

    constructor(props) {
        super(props);

        this.name = "New Playlist";
        this.state = {
            isEditingName: false,
            dateCreated: "",
            jsonImport: null
        };
    }

    componentDidMount() {
        var d = new Date();
        this.setState({dateCreated: d.toLocaleDateString() + " " + d.toLocaleTimeString()});
    }

    handleImportJson(e) {
        if (e.target.files) {
            var file = e.target.files[0];
        }
    }

    render() {
        return (
            <div className = "Playlist">
                <div className = "Info">
                    {this.state.isEditingName ? 
                        <form 
                            action = {(e) => {
                                this.name = e.get("name");
                                this.setState({isEditingName: false});
                            }}
                        >
                            <input 
                                className = "Title"
                                defaultValue = {this.name}
                                name = "name"
                            />
                        </form> : 
                        <h1 
                            className = "Title"
                            onDoubleClick = {() => {
                                this.setState({isEditingName: true})
                            }}
                        >
                            {this.name}
                        </h1>
                    }
                    <p>Date Created: {this.state.dateCreated}</p>
                </div>

                {(this.props.songs.length == 0 && false ?
                    <label>
                        import json...
                        <input 
                            type = "file" 
                            accept = ".json"
                            onChange = {handleImportJson}
                        />
                    </label> :
                    <></>
                )}

                <ul style = {{display: "table", width: "100%"}}>
                    {this.props.songs.map((value) => {
                        return value.render()
                    })}
                </ul>
            </div>
        );
    }
}