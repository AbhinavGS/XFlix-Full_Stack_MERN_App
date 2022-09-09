import React, { useState } from "react";

import Header from "./Header";
import GenrePanel from "./GenrePanel";
import Dashboard from "./Dashboard";

const LandingPage = () => {
  const [videos, setVideos] = useState([]);
  const [genre, setGenre] = useState([]);
  const [sort, setSort] = useState("releaseDate");
  const [age, setAge] = useState("0+");

  const handleGenreChange = (e) => {
    const value = e.target.innerText;
    if (value === "All Genre") {
      setGenre([]);
    } else {
      if (!genre.includes(value)) setGenre((prev) => [...prev, value]);
      else {
        setGenre((prev) => {
          return [...prev].filter((item) => item !== value);
        });
      }
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  const handleAgeChange = (e) => {
    const value = e.target.innerText.toLowerCase();
    if (value === "any age group") {
      setAge("0+");
    } else {
      setAge(value);
    }
  };

  return (
    <>
      <Header setVideos={setVideos} />
      <GenrePanel
        genre={genre}
        sort={sort}
        age={age}
        handleGenreChange={handleGenreChange}
        handleSortChange={handleSortChange}
        handleAgeChange={handleAgeChange}
      />
      <Dashboard
        genre={genre}
        sort={sort}
        age={age}
        videos={videos}
        setVideos={setVideos}
      />
    </>
  );
};

export default LandingPage;
