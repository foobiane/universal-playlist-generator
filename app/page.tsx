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

export default function Home() {
  const [songs, setSongs] = useState<SongInfo[]>([]);

  var songAdd = (newSong: SongInfo) => {
    newSong.addable = false;

    setSongs([...songs, newSong]);
    console.log(songs.length);
  };

  var songRemove = (song: SongInfo) => {
    song.addable = true;

    setSongs(songs.filter((value) => {
      value != song;
    }));
  };

  return (
    <div>
      <SiteTitle />
      <div className = "Content">
        <SearchBar songAdd = {songAdd} songRemove = {songRemove} />
        <Playlist songs = {songs}/>
      </div>
    </div>
  );
}