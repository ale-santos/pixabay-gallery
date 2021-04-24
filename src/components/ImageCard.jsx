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
        <button onClick={() => handleButtonFavorites(image.id)}
          className={`outline-none ring-0 focus:outline-none`}>
          <FaHeart size={25} />
        </button>
      </div>
      <Link
        to={{
          pathname: `/photo/${image.id}`
        }}
      >
        <img src={image.webformatURL} alt={image.title} className="w-full" />
      </Link>

      <div className="px-6 pt-4 pb-5">
        <div className="font-semibold text-purple-500 text-lg mb-2 leading-6">
          Photo by {image.user}
        </div>
        <ul>
          <li><strong>Views: </strong>{image.views}</li>
          <li><strong>Downloads: </strong>{image.downloads}</li>
          <li><strong>Likes: </strong>{image.likes}</li>
        </ul>
      </div>

    </article>
  )
}

