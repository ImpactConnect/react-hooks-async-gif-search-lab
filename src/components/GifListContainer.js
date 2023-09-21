import React, { useState, useEffect } from "react";
import GifSearch from "./GifSearch";
import GifList from "./GifList";

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim() === "") return;

    const apiKey = "dc6zaTOxFJmzC";
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&rating=g`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const firstThreeGifs = data.data.slice(0, 3);
        setGifs(firstThreeGifs);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <GifSearch onSubmit={handleSearch} />
      <GifList gifs={gifs} />
    </div>
  );
}

export default GifListContainer;
