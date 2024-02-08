// Details.jsx

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [video, setVideo] = useState(null);  // Change 'id' to 'null'
  
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer YOUR_API_KEY',
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
            accept: 'application/json',
            Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s',
          },
        }
      );
    
      // Filter videos based on the type you want to display
      const officialTrailer = response.data.results.find(video => video.type === 'Trailer' && video.official);

      // Set the selected video in the state
      setVideo(officialTrailer);  // Change from 'setVideos' to 'setVideo'
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
    <div className=' w-full h-screen flex'>
      <div className=' basis-[20%] bg-blue-600 border-[1px] border-black border-solid rounded-r-3xl'>
      <div className="logo flex items-center gap-2">
          <img src="/mlogo.png" alt="logo image" className="w-16 h-16" />
          <h1 className=' font-extrabold'>MovieBlog</h1>
        </div>
    
      </div>
      <div className=' basis-[80%] bg-yellow-300 mx-4 my-4'>
        <div className=' w-full h-[30rem]'>
        {video && (
       <iframe
         title={video.name}
         width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${video.key}`}
         frameborder='0'
         allowFullScreen
        ></iframe>
      )}
        </div>
       <h2>{response.title}</h2>
       {/* <h2>{response.data.published_at}</h2> */}
       <h2>{response.release_date}</h2>

      </div>


    </div>
  );
};

export default Details;
