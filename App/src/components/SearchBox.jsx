import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const services = [
  "Wedding planning",
  "Personal events",
  "Commercial events",
  "Birthday party",
  "Live music & orchestra",
  "Entertainment shows",
  "Bridal makeup",
  "Photography",
  "Travels",
  "Catering services",
  "Decoration",
  "Security",
];

const SearchBox = () => {

  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    updateSuggestions(e.target.value);
  };
  
  const updateSuggestions = (value) => {
    const matches = services.filter((service) => {
      const regex = new RegExp(`^${value}`, "gi");
      return service.match(regex);
    });
    setSuggestions(matches);
    setHighlightedIndex(matches.length > 0 ? 0 : -1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && highlightedIndex > 0) {
      setHighlightedIndex(highlightedIndex - 1);
    } else if (e.keyCode === 40 && highlightedIndex < suggestions.length - 1) {
      setHighlightedIndex(highlightedIndex + 1);
    } else if (e.keyCode === 13 && highlightedIndex !== -1) {
      navigate(`/providers/${suggestions[highlightedIndex]}`);
      setQuery(suggestions[highlightedIndex]);
      setHighlightedIndex(-1);
      setSuggestions([]);
    }
  };
  
  

  const navigate = useNavigate();

  return (
    <div className="relative ">
      {/* <input
        className="w-full h-15 px-9 py-4 bg-white border-2 border-white-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
        type="search"
        name="search"
        placeholder="Search"
      /> */}
      {/* <button
        type="submit"
        className="absolute  rounded-bl-3xl top-1/2 transform -translate-y-1/2 px-6 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md focus:outline-none hover:from-blue-600 hover:to-slate-200 transition duration-200 ease-in-out"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 15l5-5m0 0l-5-5m5 5h-12"
          />
        </svg>
      </button> */}
      <div className="relative">
      <input
  type="text"
  placeholder="Search for services"
  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
  value={query}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
/>


{query.length > 0 && (
  <div className="absolute top-14 left-0 w-full bg-white rounded-md shadow-lg">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className={`p-3 hover:bg-gray-100 cursor-pointer ${
          index === highlightedIndex ? "bg-gray-100" : ""
        }`}
        onClick={() => {
          navigate(`/providers/${suggestion}`);
          setQuery(suggestion);
          setHighlightedIndex(-1);
          setSuggestions([]);
        }}
      >
        {suggestion}
      </div>
    ))}
  </div>
)}


</div>

     

      {/* <div className='dataResult cursor-pointer'>
        {services.map((value,key)=>{
          return <div onClick={()=>navigate(`providers/${value}`)}> {value}</div>
        })}
      </div> */}
    </div>
  );
};

export default SearchBox;
