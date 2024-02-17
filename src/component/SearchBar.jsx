import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Suggestions array
  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            include_adult: "false",
            language: "en-US",
            page: "1",
            query: value,
          },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s",
          },
        }
      );
      console.log(response.data.results);
      setSuggestions(
        response.data.results.map((result) => ({
          title: result.title,
          posterPath: `https://image.tmdb.org/t/p/w200${result.poster_path}`,
          date: result.release_date,
          id: result.id, // Include movie ID in suggestions
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchSuggestions(value);
  };
  return (
    <div className=" bg-white w-full h-10 rounded-2xl px-4 shadow-lg flex items-center">
      <input
        type="search"
        placeholder="What do you want to watch?"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className=" bg-transparent border-none h-full text-xl w-full focus:outline-none text-black "
      />
      <FaSearch className=" text-black" />
    </div>
  );
};

export default SearchBar;
