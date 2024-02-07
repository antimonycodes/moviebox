import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSearch } from 'react-icons/fa';
import { AiTwotonePlayCircle } from "react-icons/ai";

import axios from 'axios';

const Header = () => {
  const [responses, setResponse] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);

  const ratedTv = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU5MTFlYmE5NmNlZmQyMGJjYmIyODFmMjRmNWE1YiIsInN1YiI6IjY1YmE0NWYwYjdkMzUyMDE4MDIyMTU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59z62Zyer3M6lHut_eJjubi1wLNVm7rroHQ_fRuR8_s',
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
  const title = responses[randomIndex]?.title || 'Default Title';
  const voteAverage = responses[randomIndex]?.vote_average || 'N/A';
  const overview = responses[randomIndex]?.overview || 'Default Overview';
  //
  // const InputSpotlightBorder = () => {
  //   const divRef = useRef<HTMLInputElement>(null);
  //   const [isFocused, setIsFocused] = useState(false);
  //   const [position, setPosition] = useState({ x: 0, y: 0 });
  //   const [opacity, setOpacity] = useState(0);
  
  //   const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
  //     if (!divRef.current || isFocused) return;
  
  //     const div = divRef.current;
  //     const rect = div.getBoundingClientRect();
  
  //     setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  //   };
  
  //   const handleFocus = () => {
  //     setIsFocused(true);
  //     setOpacity(1);
  //   };
  
  //   const handleBlur = () => {
  //     setIsFocused(false);
  //     setOpacity(0);
  //   };
  //   const handleMouseEnter = () => {
  //     setOpacity(1);
  //   };
  
  //   const handleMouseLeave = () => {
  //     setOpacity(0);
  //   };
  

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
          <h1 className=' font-extrabold'>MovieBlog</h1>
        </div>
        <div className="searchbox w-full max-w-[50%] mx-auto flex items-center border px-4 py-3 rounded-lg">
          <input
            type="text"
            id="searchInput"
            placeholder="What do you want to watch"
            className="flex-grow border-none text-white bg-transparent placeholder:text-white focus:outline-none"
          />
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <button type="button" className="ml-2">
            <FaSearch className="text-white" />
          </button>
        </div>
        //
        {/* <div className='relative w-full'>
        <input
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          autoComplete='off'
          placeholder='Enter Text Here'
          type='email'
          name='email'
          className='h-12 w-full cursor-default rounded-md border border-gray-800 bg-gray-950 p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none  placeholder:text-gray-500 focus:border-[#8678F9] focus:outline-none'
        />
        <input
          ref={divRef}
          disabled
          style={{
            border: '1px solid #8678F9',
            opacity,
            WebkitMaskImage: radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent),
          }}
          aria-hidden='true'
          className='pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border border-[#8678F9] bg-[transparent] p-3.5 opacity-0  transition-opacity duration-500 placeholder:select-none'
        />
      </div> */}

        //
        <div className="right flex items-center gap-4">
          <a className=' font-semibold' href='#'>Sign In</a>
          {/* <div className=" bg-red-700 w-8 h-6 flex items-center justify-end">
          <RxHamburgerMenu  />
          </div> */}
        <div className="bg-red-700 w-8 h-8 flex items-center justify-center rounded-full">
  <RxHamburgerMenu />
</div>

        
        </div>
      </nav>
      <div className="hero pt-32 text-white relative z-10 w-1/3">
        <h1 className='text-3xl font-bold pb-2'>{title}</h1>
        <h2 className=' pb-2'>{`${voteAverage}/10`}</h2>
        <p className=' pb-2'>{overview}</p>
        <div className="btn border w-fit bg-[#BE123C] border-none rounded-lg px-5 py-1 flex items-center justify-between gap-2 cursor-pointer">
        <AiTwotonePlayCircle className=' h-4 w-4 pt-[1.2px]' />
          <p>WATCH TRAILER</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
