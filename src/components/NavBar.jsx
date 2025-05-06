import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-200 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-row gap-6 justify-center items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `!text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 
              hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 
              dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 
              transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700' : ''}`
            }
          >
            {/* Used !text-white to ensure text color is white for Home button */}
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `!text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 
              hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 
              dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 
              transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700' : ''}`
            }
          >
            {/* Used !text-white to ensure text color is white for Pastes button */}
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;