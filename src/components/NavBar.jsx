import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '../context/GlobaState';

import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { shoppingCart } = useContext(GlobalContext);
  const [items, setItems] = useState(0)

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && navbarOpen) {
        setNavbarOpen(false);
        console.log('i resized');
      }
    };
    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };

  });

  useEffect(() => {
    setItems(shoppingCart.length);
  },[shoppingCart]);

  return (
    <>
      <nav className="absolute w-full lg:relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500">
        <div className="container max-w-screen-xl px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/"
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            >
              PixaBay Search
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto w-full justify-end">
              <li className="nav-item">
                <Link to='/fotos'
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 w-full"
                >
                  Imagens
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/videos'
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Vídeos
                </Link>

              </li>
              <li className="nav-item">
                <Link to='/contato'
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  Fale Conosco
                </Link>
              </li>
              <div className="flex px-3">
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
    </>
  );
}