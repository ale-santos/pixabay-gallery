import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobaState';

import { FaHeartbeat, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { shoppingCart, searchMobileOpen, setSearchMobileOpen } = useContext(GlobalContext);
  const [items, setItems] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && navbarOpen) {
        setNavbarOpen(false);
        setSearchMobileOpen(false);
      }
    };
    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  useEffect(() => {
    setItems(shoppingCart.length);
  }, [shoppingCart]);

  function handleSearchMobile() {
    setSearchMobileOpen(!searchMobileOpen);
    setNavbarOpen(false);
  }

  function handleMobileMenu() {
    setNavbarOpen(!navbarOpen);
    setSearchMobileOpen(false);
  }

  function handleClickLogoMenu() {
    setNavbarOpen(false);
    setSearchMobileOpen(false);
  }

  return (
    <div className="fixed lg:relative w-full z-10 top-0 left-0 bg-blue-500">
      <nav className="w-full lg:relative flex flex-wrap items-center justify-between px-2 py-3 ">
        <div className="container max-w-screen-xl px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" onClick={handleClickLogoMenu}
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              PixaBay Search
            </Link>
            <div className="flex">
              {(location.pathname === "/" || location.pathname === "/photos") &&
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid
                    border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button" onClick={handleSearchMobile}>
                  <FaSearch size={20} />
                </button>
              }
              <Link to='/cart'>
                <button
                  className="text-white cursor-pointer leading-none px-3 py-1 border border-solid
                    border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none relative mr-4"
                  type="button" onClick={handleSearchMobile}>
                  <FaHeartbeat size={25} className="text-white " />
                  <span style={{ paddingTop: 0.2 + 'em', paddingBottom: 0.2 + 'em', paddingLeft: 0.6 + 'em', paddingRight: 0.6 + 'em', fontSize: 0.7 + 'em' }}
                    className="flex justify-center items-center rounded-full ml-3 mr-5 leading-0 bg-blue-900 text-white absolute left-5 lg:left-6 bottom-5">
                    {items}
                  </span>
                </button>
              </Link>
              <button
                className="text-white cursor-pointer text-2xl leading-none px-3 py-1 border border-solid
              border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={handleMobileMenu}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
          <div className={"lg:flex flex-grow items-center mb-4 lg:mb-0 " + (navbarOpen ? " flex" : " hidden")}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto w-full justify-end mt-4 lg:mt-0 "
              onClick={handleMobileMenu}>
              <li className="nav-item">
                <Link to='/photos'
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold 
                      leading-snug text-white hover:opacity-75 hover:bg-indigo-700">
                  Photos
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/photos'
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold 
                      leading-snug text-white hover:opacity-75 hover:bg-indigo-700">
                  Videos
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/'
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold 
                    leading-snug text-white hover:opacity-75 hover:bg-indigo-700">
                    Contact
                </Link>
              </li>
              <div className="flex px-3 mt-4 mb-2 lg:mt-0">
                <Link to='/cart'>
                  <FaHeartbeat className="text-3xl text-white absolute" />
                  <span style={{ paddingTop: 0.1 + 'em', paddingBottom: 0.1 + 'em', paddingLeft: 0.6 + 'em', paddingRight: 0.6 + 'em', fontSize: 0.7 + 'em' }}
                    className="flex justify-center items-center rounded-full ml-1 leading-0 bg-blue-900 text-white relative left-6 bottom-2">
                    {items}
                  </span>
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}