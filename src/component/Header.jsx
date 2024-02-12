import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiTwotonePlayCircle } from "react-icons/ai";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import "../index.css";
import styles from "../theme.module.css";

const Header = () => {
  const [responses, setResponse] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const history = useHistory(); // Initialize useHistory

  const ratedTv = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s", // Replace with your actual API key
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
          posterPath: `https://image.tmdb.org/t/p/w200${result.poster_path}`,
          date: result.release_date,
          id: result.id, // Include movie ID in suggestions
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.title;

  const renderSuggestion = (suggestion) => (
    <div
    // Handle click on suggestion to redirect to details page
    // onClick={() => history.push(`/details/${suggestion.id}`)}
    >
      <h1 className="pb-3">{suggestion.title.toUpperCase()}</h1>
      <img
        src={suggestion.posterPath}
        alt="Poster"
        className="w-16 h-16 pb-3"
      />
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
    placeholder: "What do you want to watch?",
    value: searchQuery,
    onChange: (event, { newValue }) => setSearchQuery(newValue),
  };

  return (
    <>
      <div
        className="header h-[100vh] w-full relative bg-cover bg-center px-6 lg:px-24"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="gradient-overlay absolute inset-0 bg-gradient-to-tr from-black to-transparent"></div>

        <nav className="py-4 flex items-center sm:gap-6 lg:gap-12 justify-between relative z-20 text-white">
          <div className="hidden sm:flex items-center gap-2 basis-[20%]">
            <img src="/mlogo.png" alt="logo image" className="w-16 h-16" />
            <h1 className="font-extrabold">MovieBlog</h1>
          </div>

          <div className="search-container bg-red-400 flex-shrink basis-[60%]">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              theme={styles}
            />
          </div>

          <div className="right flex items-center gap-4 basis-[20%]">
            <a className="font-semibold hidden lg:flex" href="#">
              Sign In
            </a>

            <div className="bg-red-700 w-8 h-8 flex items-center justify-center rounded-full">
              <RxHamburgerMenu />
            </div>
          </div>
        </nav>

        <div className="py-28 w-full sm:w-[30rem] text-white relative z-10 ">
          <h1 className="text-3xl font-bold pb-2">{title}</h1>
          <h2 className="pb-2">{`${voteAverage}/10`}</h2>
          <p className="pb-2">{overview}</p>
          <div className="btn border w-fit bg-[#BE123C] border-none rounded-lg px-5 py-1 flex items-center justify-between gap-2 cursor-pointer">
            <AiTwotonePlayCircle className="h-4 w-4 pt-[1.2px]" />
            <p>WATCH TRAILER</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
