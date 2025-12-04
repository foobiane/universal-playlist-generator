"use client"

import React from "react"

import { CONSUMER_KEY, CONSUMER_SECRET } from "./auth";
import { SongInfo } from "./playlist";

import "./search.scss"

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
                var limit = 10;

                for (const result of data.results) {
                    var m = new Map(Object.entries(result));

                    if (m.get("type") === "master") {
                        songs.push(new SongInfo({}, m));
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
            <div className = {"SearchBar"}>
                <form 
                    className = {"SearchForm"}
                    action = {this.onFormSubmit.bind(this)}
                >
                    <input 
                        className = {"Box"}
                        placeholder = "Search..."
                        name = "query" 
                    />
                    <button type = "submit"></button>
                </form>
                <ul style = {{display: "table"}}>
                    {this.state.searchSuccess && this.state.searchResults.map((value) => {return value.render()})}
                </ul>
            </div>
        );
    }
}