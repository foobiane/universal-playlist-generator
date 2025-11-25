"use client"

import { CONSUMER_KEY, CONSUMER_SECRET } from "./auth";
import SongInfo from "./playlist";
import React from "react"

var Discogs = require("disconnect").Client;

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSuccess: false,
            searchResults: []
        }
    }

    songSearch(formData: FormData) {
        const query = formData.get("query");

        var db = new Discogs({
            consumerKey: CONSUMER_KEY,
            consumerSecret: CONSUMER_SECRET
        }).database();  
        
        return new Promise((resolve) => {
            var songs : SongInfo[] = [];

            db.search(query, (err, data) => {
                var limit = 3;

                for (const result of data.results) {
                    var m = new Map(Object.entries(result));

                    if (m.get("type") === "master") {
                        songs.push(new SongInfo(m));
                        limit--;
                    }

                    if (limit == 0) break;
                }

                resolve(songs);
            });
        });
    }

    onFormSubmit(e: FormData) {
        this.songSearch(e).then((value) => {
            this.setState({
                searchSuccess: true,
                searchResults: value
            });
        });
    }

    render() {
        return (
            <div>
                <form action = {this.onFormSubmit.bind(this)}>
                    <input name = "query" />
                    <button type = "submit">Search</button>
                </form>
                {this.state.searchSuccess && this.state.searchResults.map((value) => {return value.render()})}
                <p>I am a paragraph</p>
            </div>
        );
    }
}