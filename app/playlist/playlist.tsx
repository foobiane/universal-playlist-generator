"use client"

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { saveAs } from "file-saver";
import { inspect } from "util";

import "./playlist.scss"

var FileSaver = require("file-saver");
var util = require("util");

var songInfoCount = 0;

export function SongInfo(props) {
    return (
        <li 
            className = "SongInfo"
            key = {songInfoCount++}
        >
            <div className = "Inner">
                <img 
                    className = "Thumb"
                    src = {props.thumbnailUrl}
                />
                <p className = "InfoText">
                    <b>{props.name}</b><br />
                    {props.year}<br />
                    {props.genres}<br />
                    <a href = {props.discogsUrl}>Discogs Link</a>
                </p>
                {props.addable ?
                    <button
                        className = "AddSongButton"
                        onClick = {() => {props.playlist.addSong(props)}}
                    >+</button> : 
                    <button
                        className = "RemoveSongButton"
                        onClick = {() => {props.playlist.removeSong(props)}}
                    >-</button>
                }
            </div>
        </li>
    );
}

/**
 * Props:
 * {
 *      isEditingName: boolean;
 *      name: string;
 *      dateCreated: string;
 *      songs: Map<string, any>[];
 *      toggleSharePanel: function;
 * }
 */

export function Playlist(props) {
    return (
        <div className = "Playlist">
            <div className = "Info">
                {props.isEditingName ? 
                    <form 
                        action = {(e) => {
                            props.name = e.get("name");
                            props.isEditingName = false;
                        }}
                    >
                        <input 
                            className = "Title"
                            defaultValue = {props.name}
                            name = "name"
                        />
                    </form> : 
                    <h1 
                        className = "Title"
                        onDoubleClick = {() => {
                            props.isEditingName = true;
                        }}
                    >
                        {props.name}
                    </h1>
                }
                <p>Date Created: {props.dateCreated}</p>
            </div>

            <ul style = {{display: "table", width: "100%"}}>
                {props.songs.map((songInfoProps: Map<string, any>) => {return SongInfo(songInfoProps)})}
            </ul>

            {props.songs.length > 0 ?
                <button 
                    className = "ShareButton"
                    onClick = {() => {props.toggleSharePanel()}}
                >
                share</button> :

                <p className = "NoSongsMessage">
                    no songs added. add songs by searching on the left, or
                    <button
                        className = "ImportJsonButton"
                        onClick = {() => {}}
                    >
                    import from json</button>.
                </p>
            }
        </div>
    );
}

// export class Playlist extends React.Component {
//     name: string;
//     objectUuid: string;

//     constructor(props) {
//         super(props);

//         this.name = "New Playlist";
//         this.state = {
//             songs: [],
//             isEditingName: false,
//             dateCreated: "",
//             showingSharePanel: false
//         };

//         this.objectUuid = uuidv4();
//     }

//     addSong(s: SongInfo) {
//         const newSongs = this.state.songs.concat(s);
//         this.setState({songs: newSongs});
//     }

//     removeSong(s: SongInfo) {
//         const newSongs = this.state.songs.filter((song: SongInfo) => {return song.objectUuid != s.objectUuid})
//         this.setState({songs: newSongs});
//     }

//     componentDidMount() {
//         var d = new Date();
//         this.setState({dateCreated: d.toLocaleDateString() + " " + d.toLocaleTimeString()});
//     }

//     toJson() {
//         var seen: object[] = []

//         var s: string = JSON.stringify(this, (key, value) => {
//             if (value instanceof Promise)
//                 return "[Promise]"; // we don't really care about promise items...

//             else if (typeof value === "object" && value !== null) {
//                 if (seen.indexOf(value) >= 0)
//                     return "[Cycle]";

//                 seen.push(value);
//             }

//             return value;
//         });

//         var blob: Blob = new Blob([s], {type: "text/plain;charset=utf-8"});
//         FileSaver.saveAs(blob, "playlist-" + this.objectUuid + ".json");
//     }
// }