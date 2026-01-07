"use client"

import SearchBar from "./search/search"
import { SongInfo, Playlist } from "./playlist/playlist"
import SharePanel from "./share/share"

import "./page.scss"

import React, { useState } from "react"

const DATE = new Date()
const DATE_STR = DATE.toLocaleDateString() + " " + DATE.toLocaleTimeString()

function SiteTitle() {
    return (
        <div className = "SiteTitle">universal playlist generator</div>
    );
}

function About() {
    return (
        <div className = "AboutPanel">
            <h1>what is this?</h1>
            <p>universal playlist generator is a website for creating and sharing music playlists. you can search up songs on the left search panel and add them to the playlist in the middle. you can then generate a shareable link, export to raw JSON, or even build the playlist on your preferred platform.</p>

            <h1>how does it work?</h1>
            <p>songs can be added to the current playlist by searching for them and clicking the blue "+" icon. they are removed using the red "-" button. song data is pulled from Discogs' API.</p>
            <p>double click the title of the playlist to change it.</p>
            <p>once you construct a playlist, you can share it with friends, export it to JSON, or make it into a playlist on your preferred platform. just click the respective button at the bottom of the playlist pane.</p>
            <p>if you have the JSON of a playlist made with universal playlist generator, you can import it.</p>

            <h1>credits</h1>
            <p>this website is a passion project created by Ian Doherty using NextJS, ReactJS, and CSS. all code is freely available on GitHub.</p>
        </div>
    );
}

export default function Home() {
    const [showingAboutPanel, setShowingAboutPanel] = useState(false);
    const [showingSharePanel, setShowingSharePanel] = useState(false);

    const [playlistArr, setPlaylistArr] = useState([])

    const addSongToPlaylist = (newSong) => {setPlaylistArr(playlistArr.concat(newSong))}
    const removeSongFromPlaylist = (song) => {setPlaylistArr(playlistArr.filter((query) => {return query != song}))}

    return (
        <div>
            <SiteTitle />

            <div className = "Content">
                <SearchBar 
                    addSongToPlaylist = {addSongToPlaylist}
                    removeSongFromPlaylist = {removeSongFromPlaylist}
                />
                
                <Playlist 
                    name = "New Playlist"
                    isEditingName = {false}
                    songs = {playlistArr} 
                    dateCreated = {DATE_STR}
                />

                {showingAboutPanel ?
                    <div>
                        <About />
                        <button
                            onClick = {() => {setShowingAboutPanel(true)}}
                        >hide about [-]</button>
                    </div> :
                    <button
                        onClick = {() => {setShowingAboutPanel(false)}}
                    >show about [+]</button>
                }
            </div>

            {false ? 
                <SharePanel toggleSharePanel = {setShowingSharePanel} /> : 
                <></>
            }
        </div>
    );
}