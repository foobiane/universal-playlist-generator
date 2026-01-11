"use client"

import { use, useState } from "react"

import { CONSUMER_KEY, CONSUMER_SECRET } from "../auth";
import SongInfo from "../playlist/playlist";

import "./search.scss"

var Discogs = require("disconnect").Client;

function songSearch(formData: FormData) {
    const query = formData.get("query");

    var db = new Discogs({
        consumerKey: CONSUMER_KEY,
        consumerSecret: CONSUMER_SECRET
    }).database();  
    
    return new Promise((resolve) => {
        var songs: Map<string, any>[] = [];

        db.search(query, (err, data) => {
            var limit = 10;

            for (const result of data.results) {
                if (result.type == "master") {
                    songs.push(result);
                    limit--;
                }

                if (limit == 0) break;
            }

            resolve(songs);
        });
    });
}

export default function SearchBar(props) {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className = "SearchBar">
            <form 
                className = "SearchForm"
                action = {
                    (formData) => {
                        songSearch(formData).then((value) => {
                            setSearchResults(value);
                        });
                    }
                }
            >
                <input 
                    className = "Box"
                    placeholder = "Search..."
                    name = "query" 
                />
            </form>
            <ul className = "SearchResults">
                {searchResults.map((result) => {
                    result.addable = true;
                    result.addSongToPlaylist = props.addSongToPlaylist;
                    result.removeSongFromPlaylist = props.removeSongFromPlaylist;
                    
                    return SongInfo(result);
                })}
            </ul>
        </div>
    );
}