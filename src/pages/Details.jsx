// Details.jsx

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [video, setVideo] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s",
          },
        }
      );
      console.log(response);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieVideos = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s",
          },
        }
      );
      console.log(response);

      // Filter videos based on the type you want to display
      const officialTrailer = response.data.results.find(
        (video) => video.type === "Trailer" && video.official
      );

      // Set the selected video in the state
      setVideo(officialTrailer); // Change from 'setVideos' to 'setVideo'
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieVideos();
  }, [id]);

  return (
    // <div className='bg-red-500'>
    //   <h1>Details</h1>
    //   <h2>{response.title}</h2>
    //   <p>{response.overview}</p>
    //   <h2>Video</h2>
    //   {video && (
    //     <iframe
    //       title={video.name}
    //       width='560'
    //       height='315'
    //       src={`https://www.youtube.com/embed/${video.key}`}
    //       frameborder='0'
    //       allowFullScreen
    //     ></iframe>
    //   )}
    // </div>
    <div className=" w-full flex">
      <div className=" hidden md:block basis-[20%] bg-blue-600 border-[1px] border-black border-solid rounded-r-3xl">
        <div className="logo flex items-center gap-2">
          <img src="/mlogo.png" alt="logo image" className="w-16 h-16" />
          <h1 className=" font-extrabold">MovieBlog</h1>
        </div>
      </div>
      <div className=" basis-[100%] md:basis-[80%] bg-yellow-300 mx-4 my-4">
        <div className=" w-full h-[30rem] ">
          {video && (
            <iframe
              title={video.name}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.key}`}
              frameborder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
        {/*  */}
        <div className=" flex gap-5 py-4 font-semibold text-2xl">
          <h2>{response.title}</h2>
          <h2>{response.release_date}</h2>
          <h2>{response.runtime}</h2>
        </div>
        {/*  */}
        <div className=" flex flex-col sm:flex-row">
          <div className=" w-full">
            <h1>{response.overview}</h1>
            {response.genres && response.genres.length > 0 && (
              <div className=" py-4">
                <h1>
                  <span className="font-bold text-lg">Genre:</span>{" "}
                  {response.genres.map((genre) => genre.name).join(", ")}
                </h1>
              </div>
            )}
          </div>
          {/*  */}
          <div class=" w-full sm:w-[50%] px-4">
            <div>
              <a
                class="border border-[#BE123C] bg-[#BE123C] py-2 rounded-md text-white flex justify-center items-center"
                href="#"
              >
                See Showtimes
              </a>
            </div>
            <div class="mt-1">
              <a
                class="bg-[#BE123C] border border-[#BE123C] py-2 rounded-md flex justify-center items-center"
                href="#"
              >
                More Watch Options
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
