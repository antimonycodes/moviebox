import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { AiTwotonePlayCircle } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [responses, setResponse] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

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

      const movies = response.data.results;

      // Fetch videos for each movie
      const moviesWithVideos = await Promise.all(
        movies.map(async (movie) => {
          try {
            const videoResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
              {
                headers: {
                  accept: "application/json",
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s",
                },
              }
            );
            const videos = videoResponse.data.results;
            return { ...movie, videos };
          } catch (error) {
            console.error(
              `Error fetching videos for movie ID ${movie.id}:`,
              error
            );
            return movie;
          }
        })
      );

      setResponse(moviesWithVideos);
      console.log(moviesWithVideos);
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
      setResults(
        response.data.results.map((result) => ({
          title: result.title,
          posterPath: `https://image.tmdb.org/t/p/w200${result.poster_path}`,
          date: result.release_date,
          id: result.id,
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

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="header h-[100vh] w-full relative bg-cover bg-center px-2 sm:px-6 lg:px-24"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="gradient-overlay absolute inset-0 bg-gradient-to-tr from-black to-transparent"></div>

        <nav className="py-4 flex items-center sm:gap-6 lg:gap-12 justify-between relative z-20 text-white">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/mlogo.png"
                alt="logo image"
                className="  w-8 h-8 md:w-16 md:h-16"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-extrabold text-red-500">
                <AnimatePresence>
                  {Array.from("MovieBlog").map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </h1>
            </motion.div>
          </div>

          <div className="search-container flex-shrink basis-[60%] flex items-center flex-col relative">
            <div className="border-white border w-full h-10 rounded-2xl px-4 shadow-lg flex items-center">
              <input
                type="search"
                placeholder="What do you want to watch?"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="bg-transparent border-white h-full text-xl w-full focus:outline-none text-black font-semibold "
              />
            </div>
            <div className="w-full absolute top-[100%] bg-white flex flex-col shadow-xl rounded-lg mt-2 max-h-[600px] overflow-y-scroll text-black">
              {results.map((result, id) => (
                <Link to={`/Details/${result.id}`}>
                  <div key={id} className="flex flex-col   p-4 border-b">
                    <img
                      src={result.posterPath}
                      alt={result.title}
                      className="w-24 h-24 object-cover object-center"
                    />
                    <div className=" text-[#BE123C] font-semibold">
                      <h2 className="text-lg font-semibold">{result.title}</h2>
                      <p>Release Date: {result.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="right flex items-center gap-4 basis-[20%] justify-center">
            <a className="font-semibold hidden  lg:flex" href="#">
              Sign In
            </a>

            <div className="bg-red-700 w-8 h-8 flex items-center justify-center rounded-full">
              <RxHamburgerMenu />
            </div>
          </div>
        </nav>

        <div className="py-28 w-full sm:w-[30rem] text-white relative z-10">
          <h1 className="text-3xl font-bold pb-2">{title}</h1>
          <h2 className="pb-2">{`${voteAverage}/10`}</h2>
          <p className="pb-2">{overview}</p>
          <div
            className="btn border w-fit bg-[#BE123C] border-none rounded-lg px-5 py-1 flex items-center justify-between gap-2 cursor-pointer"
            onClick={openModal}
          >
            <AiTwotonePlayCircle className="h-4 w-4 pt-[1.2px]" />
            <p>WATCH TRAILER</p>
          </div>

          {/* Video Trailer Modal */}
          {isModalOpen &&
            responses[randomIndex]?.videos &&
            responses[randomIndex]?.videos.length > 0 && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                {responses[randomIndex].videos
                  .filter((video) => video.type === "Trailer" && video.official)
                  .slice(0, 1) // Display only the first official trailer
                  .map((video) => (
                    <div key={video.key}>
                      <iframe
                        title="Trailer"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                      <button
                        className="absolute top-[25%] right-[29%] text-white"
                        onClick={closeModal}
                      >
                        <FaTimes className=" text-red-700 text-4xl" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Header;
