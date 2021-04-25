import React, { useContext } from "react";
import { GlobalContext } from '../context/GlobaState';

import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

export const ImageCard = ({ image }) => {

  const { shoppingCart, handleButtonFavorites } = useContext(GlobalContext);

  const checkInCart = shoppingCart.filter(item => item.id === image.id).length > 0 ? 'text-red-900 animate-bounce' : 'text-red-200 hover:text-red-900';

  return (
    <article className='rounded overflow-hidden shadow-sm hover:shadow-xl relative bg-indigo-100'>
      <div className={`absolute right-3 top-3 ${checkInCart}`}>
        <button onClick={() => handleButtonFavorites(image)}
          className={`outline-none ring-0 focus:outline-none`}>
          <FaHeart size={25} />
        </button>
      </div>
      <Link to={{ pathname: `/photo/${image.id}` }}>
        <img src={image.webformatURL} alt={image.title} className="w-full" />
      </Link>

      <div className="px-3 lg:px-5 pt-4 pb-3 lg:pb-5">
        <Link to={{ pathname: `/photo/${image.id}` }}>
          <h1 className="font-semibold text-purple-500 hover:text-purple-800 text-md lg:text-xl mb-2 leading-tight">
            Photo by {image.user}
          </h1>
        </Link>
        <ul className="text-sm lg:text-md">
          <li><strong>Views: </strong>{image.views}</li>
          <li><strong>Downloads: </strong>{image.downloads}</li>
          <li><strong>Likes: </strong>{image.likes}</li>
        </ul>
      </div>

    </article>
  )
}

