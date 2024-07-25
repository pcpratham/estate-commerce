import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'


function Header() {
  const {currentUser} = useSelector(state => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto ">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Estate</span>
            <span className="text-slate-700">commerce</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none w-24 sm:w-64 "
          />
          <FaSearch className="text-slate-600 " />
        </form>

        <ul className="flex gap-4 items-center justify-center font-bold ">
            <Link to="/">
          <li className="hidden text-slate-700 hover:underline sm:inline cursor-pointer">
            Home
          </li>
          </Link>
          <Link to="/about">
          <li className="hidden text-slate-700 hover:underline  sm:inline cursor-pointer">
            About
          </li>
          </Link>
          <Link to="/profile">
          {
            currentUser ? <img src={currentUser.avatar} alt="profile" className="w-8 h-8 rounded-full"/> : <li className="cursor-pointer text-slate-700 hover:underline ">Sign in</li>
          }
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
