"use client"

import SearchBar from "./search"
import { SongInfo, Playlist } from "./playlist"

import "./page.scss"

import { useState } from "react"

function SiteTitle() {
  return (
    <div className = "SiteTitle">universal playlist generator</div>
  );
}

const [playlistSongs, setPlaylistSongs] = useState({
  songs: []
});

export default function Home() {
  return (
    <div>
      <SiteTitle />
      <SearchBar />
      <Playlist />
    </div>
  );
}