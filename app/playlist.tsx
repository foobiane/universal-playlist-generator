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

    constructor(props, discogsData: Map<string, any>, addable: boolean = true) {
        super(props);

        this.name = discogsData.get("title");
        this.year = discogsData.get("year");
        this.genres = discogsData.get("style").join(", ");
        this.thumbnailUrl = discogsData.get("cover_image");
        this.discogsUrl = "https://discogs.com" + discogsData.get("uri");
        this.objectUuid = uuidv4();
        this.addable = addable;
    }

    onAddSong() {
        currentPlaylist.addSong(this);
    }

    render() {
        return (
            <li 
                className = {"SongInfo"}
                key = {this.objectUuid}
            >
                <div className = {"Inner"}>
                    <img 
                        className = {"Thumb"}
                        src = {this.thumbnailUrl}
                    />
                    <p className = {"InfoText"}>
                        <b>{this.name}</b><br />
                        {this.year}<br />
                        {this.genres}
                    </p>
                    {this.addable ?
                        <button
                            className = {"AddSongButton"}
                            onClick = {this.onAddSong}
                        >+</button> : <div></div>
                    }
                </div>
            </li>
        );
    }
}

export class Playlist extends React.Component {
    name: string;
    dateCreated: string;
    songs: SongInfo[];

    constructor(props) {
        super(props);

        this.name = "New Playlist";
        this.dateCreated = (new Date()).toLocaleDateString();
        this.songs = []

        this.state = {
            isEditingName: false,
        };
    }

    render() {
        return (
            <div className = "Playlist">
                {this.state.isEditingName ? 
                    <form 
                        action = {(e) => {
                            this.name = e.get("name");
                            this.setState({isEditingName: false});
                        }}
                    >
                        <input 
                            defaultValue = {this.name}
                            name = "name"
                        />
                    </form> : 
                    <h1 onDoubleClick = {() => {this.setState({isEditingName: true})}}>{this.name}</h1>
                }
                <div>
                    {this.songs.map((value) => {return value.render()})}
                </div>
            </div>
        );
    }
}