import React from "react";

const SearchResultList = ({ results }) => {
  return (
    <>
      <div className="w-full bg-white flex flex-col shadow-xl rounded-lg mt-2 max-h-[300px] overflow-y-scroll text-black">
        {results.map((result, id) => (
          <div key={id} className="flex items-center space-x-4 p-4 border-b">
            <img
              src={result.posterPath}
              alt={result.title}
              className="w-16 h-24 object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{result.title}</h2>

              <p>Release Date: {result.date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResultList;
