import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { CircularProgress, Card, CardBody } from "@nextui-org/react";

const PopUp = ({ message }) => (
  <div className="fixed top-[8px] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md z-50">
    {message}
  </div>
);

const List = () => {
  const [responses, setResponse] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [popUpMessage, setPopUpMessage] = useState("");
  const [visibleItems, setVisibleItems] = useState(16); // Initial number of items to display
  const [seeMoreText, setSeeMoreText] = useState("See More");

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ratedTv();
  }, []);

  useEffect(() => {
    const initialLikedItems =
      JSON.parse(localStorage.getItem("likedItems")) || {};
    setLikedItems(initialLikedItems);
  }, []);

  const toggleLike = (index) => {
    const updatedLikedItems = { ...likedItems };
    updatedLikedItems[index] = !likedItems[index];
    setLikedItems(updatedLikedItems);

    setPopUpMessage(
      updatedLikedItems[index]
        ? "Added to favorites!"
        : "Removed from favorites!"
    );

    setTimeout(() => {
      setPopUpMessage("");
    }, 2000);
  };

  const handleSeeMore = () => {
    // Toggle between "See More" and "See Less" based on the current state
    setVisibleItems((prevVisibleItems) =>
      prevVisibleItems < responses.length ? responses.length : 16
    );
    setSeeMoreText((prevText) =>
      prevText === "See More" ? "See Less" : "See More"
    );
  };
  const getColorClass = (voteAverage) => {
    if (voteAverage >= 7) {
      return "stroke-green-500"; // Green for 7 and above
    } else if (voteAverage >= 4) {
      return "stroke-yellow-500"; // Yellow for average (4 to 6.9)
    } else {
      return "stroke-red-500"; // Red for below 4
    }
  };

  return (
    <>
      <div className="z-[-2] h-[100%] w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white lg:px-24 px-3">
        <div className="flex items-center justify-between   py-12 ">
          <h1 className="text-2xl font-bold">Featured Movie</h1>
          <button onClick={handleSeeMore}>{seeMoreText}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {responses.slice(0, visibleItems).map((response, index) => (
            <div
              key={index}
              className="relative overflow-hidden group transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <Link to={`/Details/${response?.id}`}>
                <div className=" relative h-96 w-full bg-gray-600 rounded-[10px] overflow-hidden transition-opacity group-hover:opacity-80 duration-300 ease-in-out">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${response.poster_path}`}
                    alt=""
                    className="h-[100%] w-full object-cover object-center transition-opacity group-hover:opacity-90 duration-300 ease-in-out"
                  />
                </div>
              </Link>
              {response.vote_average !== null && (
                <>
                  <div className="absolute bottom-14">
                    <Card className="w-[60px] h-[60px] border-none rounded-3xl bg-black">
                      <CardBody className="justify-center items-center pb-0">
                        <CircularProgress
                          classNames={{
                            svg: "w-16 h-16 drop-shadow-md",
                            indicator: getColorClass(response.vote_average), // Apply color class for stroke
                            track: "stroke-white/10",
                            value: "text-xl font-semibold text-white", // Use the custom class for coloring
                          }}
                          value={response.vote_average * 10}
                          strokeWidth={4}
                          showValueLabel={true}
                        />
                      </CardBody>
                    </Card>
                  </div>
                  {/* <h3>{`${response.vote_average}/10`}</h3> */}
                </>
              )}
              <h1 className="text-1xl font-semibold ">{response.title}</h1>
              <p className="py-1">{response.release_date}</p>

              <div className="absolute top-0 right-0 bg-[#6A8FB9] py-1 px-1 rounded-[50%] mr-1 mt-1">
                <svg
                  stroke="currentColor"
                  fill={likedItems[index] ? "#BE123C" : "#f0f0f0"}
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-[#BE123C]"
                  height="30"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toggleLike(index)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  ></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popUpMessage && <PopUp message={popUpMessage} />}
    </>
  );
};

export default List;
