"use client"

import SearchBar from "./search"
import { Playlist } from "./playlist"

import "./page.scss"

function SiteTitle() {
  return (
    <div className = "SiteTitle">universal playlist generator</div>
  );
}

export default function Home() {
  return (
    <div>
      <SiteTitle />
      <SearchBar />
      <Playlist />
    </div>
  );
}