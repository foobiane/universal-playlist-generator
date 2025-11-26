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

    constructor(discogsData: Map<string, any>) {
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

class Playlist extends React.Component {
    songs: SongInfo[];

    constructor() {
        super({});
        this.songs = [];
    }

    addSong(s: SongInfo): void {
        this.songs.push(s);
    }

    removeSong(idx: number) : void {
        delete this.songs[idx];
    }

    combine(other: Playlist) : void {
        // TODO
    }

    toSpotify() {

    }

    toAppleMusic() {

    }

    toYouTube() {

    }

    toJson() {
        return JSON.stringify(this);
    }

    render() {
        const songsRendered = [];

        for (const song of this.songs)
            songsRendered.push(song.render());

        return (
            <p>{songsRendered}</p>
        );
    }
}