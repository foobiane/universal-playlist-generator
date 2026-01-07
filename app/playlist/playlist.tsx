"use client"

import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveAs } from "file-saver";
import { inspect } from "util";

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
                            props.addable = false
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