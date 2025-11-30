import React from "react"
import { v4 as uuidv4 } from "uuid";

import "./playlist.scss"

export default class SongInfo extends React.Component {
    name: string;
    year: number;
    genres: string;
    thumbnailUrl: string;
    discogsUrl: string;
    objectUuid: string;

    constructor(discogsData: Map<string, any>, addable: boolean = true) {
        super({});

        this.name = discogsData.get("title");
        this.year = discogsData.get("year");

        this.genres = discogsData.get("style").join(", ");

        this.thumbnailUrl = discogsData.get("cover_image");
        this.discogsUrl = "https://discogs.com" + discogsData.get("uri");

        this.objectUuid = uuidv4();
    }

    onAddSong() {

    }

    render() {
        return (
            <li 
                className = {"SongInfo"}
                key = {this.objectUuid} // TODO: Use a uuid or something
            >
                <img 
                    className = {"Thumb"}
                    src = {this.thumbnailUrl}
                />
                <p className = {"InfoText"}>
                    <b>{this.name}</b><br />
                    {this.year}<br />
                    {this.genres}
                </p>
                <button
                    className = {"AddSongButton"}
                    onClick = {this.onAddSong}
                >
                    +
                </button>
            </li>
        );
    }
}

export class Playlist extends React.Component {
    name: string;
    dateCreated: string;
    songs: SongInfo[];

    constructor() {
        super({});

        this.name = "New Playlist";
        this.songs = [];
        this.dateCreated = (new Date()).toLocaleDateString();

        this.setState({isEditingName: false});
    }

    // Adds a song to the playlist.
    addSong(s: SongInfo): void {
        this.songs.push(s);
    }

    // Removes a song from the playlist via index.
    removeSong(idx: number) : void {
        delete this.songs[idx];
    }

    // Imports playlist from an exported JSON file string.
    fromJson(jsonString: string) {
        var jsonMap: Map<string, any> = new Map(Object.entries(JSON.parse(jsonString)));

        this.name = jsonMap.get("name");
        this.dateCreated = jsonMap.get("dateCreated");
        this.songs = jsonMap.get("songs");
    }

    // Exports the current playlist to a JSON string.
    toJson() {
        return JSON.stringify(this);
    }

    // Handles when 
    onNameChange(e) {

    }

    render() {
        const songsRendered = [];

        for (const song of this.songs)
            songsRendered.push(song.render());

        return (
            <div>
                {this.state.isEditingName ? 
                    <form>
                        <input onChange = {onNameChange} defaultValue = {this.name}/>
                    </form> : 
                    <h1 onDoubleClick = {() => {this.state.isEditingName = true}}>{this.name}</h1>
                }
                <p>{songsRendered}</p>
            </div>
        );
    }
}

// The main playlist on the page.
export var currentPlaylist = new Playlist();