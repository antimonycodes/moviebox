import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { AiTwotonePlayCircle } from "react-icons/ai";
import axios from "axios";
import "../index.css";
import styles from "../theme.module.css";

const Header = () => {
  const [responses, setResponse] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const ratedTv = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s",
          },
        }
      );
      setResponse(response.data.results);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ratedTv();
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    setRandomIndex(randomIndex);
  }, [responses]);

  const backgroundUrl = `https://image.tmdb.org/t/p/original/${responses[randomIndex]?.backdrop_path}`;
  const title = responses[randomIndex]?.title || "Default Title";
  const voteAverage = responses[randomIndex]?.vote_average || "N/A";
  const overview = responses[randomIndex]?.overview || "Default Overview";

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
          posterPath: `https://image.tmdb.org/t/p/w200${result.poster_path}`, // adjust the size as needed
          date: result.release_date,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      <h1>{suggestion.title.toUpperCase()}</h1>

      <img src={suggestion.posterPath} alt="Poster" className="w-8 h-8" />
      <h1> Release Date: {suggestion.date}</h1>

      <hr className="bg-black" />
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "What do you want to watch",
    value: searchQuery,
    onChange: (event, { newValue }) => setSearchQuery(newValue),
  };

  return (
    <>
      <div
        className="header h-screen w-full relative bg-cover px-24"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {/* Gradient overlay */}
        <div className="gradient-overlay absolute inset-0 bg-gradient-to-tr from-black to-transparent"></div>

        <nav className="py-4 flex items-center justify-between relative z-20 text-white">
          <div className="logo flex items-center gap-2">
            <img src="/mlogo.png" alt="logo image" className="w-16 h-16" />
            <h1 className=" font-extrabold">MovieBlog</h1>
          </div>

          <div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              theme={styles} // Apply the theme
            />
          </div>

          <div className="right flex items-center gap-4">
            <a className=" font-semibold" href="#">
              Sign In
            </a>

            <div className="bg-red-700 w-8 h-8 flex items-center justify-center rounded-full">
              <RxHamburgerMenu />
            </div>
          </div>
        </nav>
        <div className="hero pt-32 text-white relative z-10 w-1/3">
          <h1 className="text-3xl font-bold pb-2">{title}</h1>
          <h2 className=" pb-2">{`${voteAverage}/10`}</h2>
          <p className=" pb-2">{overview}</p>
          <div className="btn border w-fit bg-[#BE123C] border-none rounded-lg px-5 py-1 flex items-center justify-between gap-2 cursor-pointer">
            <AiTwotonePlayCircle className=" h-4 w-4 pt-[1.2px]" />
            <p>WATCH TRAILER</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
