"use client"

import { useState } from "react";

import "./playlist.scss"

var FileSaver = require("file-saver");
var util = require("util");

var songInfoCount = 0;

export default function SongInfo(props) {
    return (
        <li 
            className = "SongInfo"
            key = {songInfoCount++}
        >
            <div className = "Inner">
                <img 
                    className = "Thumb"
                    src = {props.cover_image}
                />
                <p className = "InfoText">
                    <b>{props.title}</b><br />
                    {props.year}<br />
                    {props.genre.join(", ")}<br />
                    <a href = {"https://discogs.com/" + props.uri}>Discogs Link</a>
                </p>
                {props.addable ?
                    <button
                        className = "AddSongButton"
                        onClick = {() => {
                            props.addSongToPlaylist(props);
                        }}
                    >+</button> : 
                    <button
                        className = "RemoveSongButton"
                        onClick = {() => {
                            props.removeSongFromPlaylist(props);
                        }}
                    >-</button>
                }
            </div>
        </li>
    );
}

function loadJson(files: FileList, loadFromJson) {
    var file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
        var asText = reader.result;
        var asObj = JSON.parse(asText);
        loadFromJson(asObj);
    }

    reader.readAsText(file);
}

export function Playlist(props) {
    const [isEditingName, setIsEditingName] = useState(false);

    return (
        <div className = "Playlist">
            {isEditingName ? 
                <form 
                    action = {(e) => {
                        props.setName(e.get("name"));
                        setIsEditingName(false);
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
                        setIsEditingName(true);
                    }}
                >
                    {props.name}
                </h1>
            }
            <p>Date Created: {props.dateCreated}</p>

            <ul style = {{display: "table", width: "100%"}}>
                {props.songs.map((song) => {
                    song.addable = false;
                    return SongInfo(song);
                })}
            </ul>

            {props.songs.length > 0 ?
                <button 
                    className = "ShareButton"
                    onClick = {() => {props.showSharePanel()}}
                >
                share</button> :

                <p className = "NoSongsMessage">
                    no songs added. add songs by searching on the left, or&nbsp;
                    <input
                        id = "jsonUpload"
                        className = "hidden"
                        type = "file"
                        accept = ".json"
                        onChange = {(files) => {loadJson(files, props.loadFromJson)}}
                    />
                    <label htmlFor = "jsonUpload" className = "ImportJsonButton">
                        import from json.
                    </label>
                </p>
            }
        </div>
    );
}