"use client"

import SearchBar from "./search/search"
import { Playlist } from "./playlist/playlist"
import SharePanel from "./share/share"

import "./page.scss"

import { useState } from "react"

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
    // Playlist metadata
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [playlistArr, setPlaylistArr] = useState([])

    const [dateCreated, setDateCreated] = useState(new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(new Date()));

    // Callbacks 
    const addSongToPlaylist = (newSong) => {
        setPlaylistArr(playlistArr.concat(newSong));
    }
    
    const removeSongFromPlaylist = (song) => {
        setPlaylistArr(playlistArr.filter((query) => {
            return query != song;
        }))
    }

    const loadFromJson = (jsonObj) => {
        setPlaylistName(jsonObj.name);
        setPlaylistArr(jsonObj.songs);
        setDateCreated(jsonObj.dateCreated);
    };

    // Display state
    const [showingSharePanel, setShowingSharePanel] = useState(false);
    const showSharePanel = () => {setShowingSharePanel(true)};
    const hideSharePanel = () => {setShowingSharePanel(false)};

    return (
        <>
            <SiteTitle />

            <div className = "Content">
                <SearchBar 
                    addSongToPlaylist = {addSongToPlaylist}
                    removeSongFromPlaylist = {removeSongFromPlaylist}
                />
                
                <Playlist 
                    name = {playlistName}
                    dateCreated = {dateCreated}
                    songs = {playlistArr} 

                    setName = {setPlaylistName}
                    showSharePanel = {showSharePanel}
                    loadFromJson = {loadFromJson}
                />

                {showingSharePanel ?
                    <SharePanel hideSharePanel = {hideSharePanel} /> :
                    <></>
                }
            </div>
        </>
    );
}