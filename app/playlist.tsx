import React from "react"

export default class SongInfo extends React.Component {
    name: string;
    artist: string;
    year: number;
    genres: string[];
    thumbnailUrl: string;
    discogsUrl: string;

    constructor(discogsData: Map<string, any>) {
        super({});
        this.name = discogsData.get("title");
        this.artist = discogsData.get("artist");
        this.year = discogsData.get("year");
        this.genres = discogsData.get("genre");
        this.thumbnailUrl = discogsData.get("thumb");
        this.discogsUrl = "https://discogs.com" + discogsData.get("uri");
    }

    render() {
        return (
            <img src = {this.thumbnailUrl} />
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

    render() {
        const songsRendered = [];

        for (const song of this.songs)
            songsRendered.push(song.render());

        return (
            <p>{songsRendered}</p>
        );
    }
}