import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PopUp = ({ message }) => (
  <div className="fixed top-[8px] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md z-50">
    {message}
  </div>
);

const List = () => {
  // Load liked items from localStorage on component mount
  const initialLikedItems = JSON.parse(localStorage.getItem('likedItems')) || {};
  const [responses, setResponse] = useState([]);
  const [likedItems, setLikedItems] = useState(initialLikedItems);
  const [popUpMessage, setPopUpMessage] = useState('');

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ratedTv();
  }, []);

  // Save liked items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  }, [likedItems]);

  const toggleLike = (index) => {
    const updatedLikedItems = { ...likedItems };
    updatedLikedItems[index] = !likedItems[index];
    setLikedItems(updatedLikedItems);

    // Set pop-up message based on like status
    setPopUpMessage(updatedLikedItems[index] ? 'Added to favorites!' : 'Removed from favorites!');
    
    // Clear pop-up after a delay (e.g., 2000 milliseconds or 2 seconds)
    setTimeout(() => {
      setPopUpMessage('');
    }, 2000);
  };

  return (
    <>
      <div className='z-[-2] h-[100%] w-[100%] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white'>
        <div className='flex items-center justify-between px-24 py-12 '>
          <h1 className='text-2xl font-bold'>Featured Movie</h1>
          <p>See More</p>
        </div>
        <div className='grid grid-cols-4 gap-8 px-24 py-4'>
          {responses.map((response, index) => (
            <Link to={`/Details/${response?.id}`}>
            <div key={index} className='relative'>
              <img
                src={`https://image.tmdb.org/t/p/original/${response.poster_path}`}
                alt=''
              />
              <div className="absolute top-0 right-0 bg-[#6A8FB9] py-1 px-1 rounded-[50%] mr-1 mt-1">
                <svg
                  stroke="currentColor"
                  fill={likedItems[index] ? '#BE123C' : '#f0f0f0'}
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-[#BE123C]"
                  height="30"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toggleLike(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  ></path>
                </svg>
              </div>
              <p className='py-1'>{response.release_date}</p>
              <h1 className='text-1xl font-semibold'>{response.title}</h1>
              <h3>{`${response.vote_average}/10`}</h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
      {popUpMessage && <PopUp message={popUpMessage} />}
    </>
  );
};

export default List;
