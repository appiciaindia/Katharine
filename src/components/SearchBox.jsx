"use client";
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const SearchBox = () => {

  const [search, setSearch] = useState(false);

  const handleSearcBar = () => {
    setSearch(true);
  }

  return (
    <div className={`${search ? "fixed inset-0 z-[80] h-dvh w-full bg-[#0c213c] px-5 py-10" : "relative"}`}>
      {search && <button type="button" aria-label="Close search" onClick={() => setSearch(false)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-[#0c213c]"><FiX /></button>}
      <form action="#">
        <div className={`search flex items-center rounded-4xl md:bg-white ${search ? "bg-white" : ""}`}>
          <input type="text" placeholder='Search for products' className={`bg-transparent border-0 outline-0 px-4 py-3 xl:w-[300px] lg:w-[150px] md:w-[140px]  ${search ? "inline-block w-full flex-1" : "md:inline-block hidden"}`} />
          <button type='submit' className={`md:flex items-center justify-center md:h-10 text-xl md:w-10 rounded-full md:mx-2 mx-0 cursor-pointer md:bg-[#0c213c]  text-white ${search?"flex bg-[#0c213c] mx-2 w-10 h-10":"hidden bg-transparent"}`}><FaSearch /></button>
          <button type="button" aria-label="Open search" className={`md:hidden items-center justify-center text-xl ${search?"hidden":"flex"} h-10 w-10 cursor-pointer rounded-full bg-transparent text-white`} onClick={handleSearcBar}><FaSearch /></button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox;
