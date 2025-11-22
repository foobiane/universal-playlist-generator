"use client"

var Discogs = require("disconnect").Client;

export default function SearchBar() {
    return (
        <form action = {songSearch}>
            <input name = "query" />
            <button type = "submit">Search</button>
        </form>
    );
}

function songSearch(formData) {
    const query = formData.get("query");

    var db = new Discogs().database();  
    
    db.search(query, function (err, data) {
        console.log(data);
    });
}