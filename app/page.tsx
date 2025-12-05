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
  const [songs, setSongs] = useState<SongInfo[]>([]);

  var songAdd = (newSong: SongInfo) => {
    var copy = newSong.clone()
    copy.addable = false;

    setSongs((songs: SongInfo[]) => [...songs, copy]);
  };

  var songRemove = (song: SongInfo) => {
    song.addable = true;

    setSongs((songs: SongInfo[]) => songs.filter((value: SongInfo) => {
      return value != song;
    }));
  };

  return (
    <div>
      <SiteTitle />
      <div className = "Content">
        <SearchBar songAdd = {songAdd} songRemove = {songRemove} />
        <Playlist songs = {songs}/>
        <About />
      </div>
    </div>
  );
}