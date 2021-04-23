import React, { useContext } from "react";
import { GlobalContext } from '../context/GlobaState';

import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';


export const ImageCard = ({ image }) => {

  const { shoppingCart, addCart, removeCart } = useContext(GlobalContext);

  const handleButtonFavorites = (id) => {
    if(shoppingCart.filter(item =>item.id === image.id).length === 0){
      const newItem = {
        id: id,
        qty: 1
      }
      addCart(newItem);
    }else{
      removeCart(id);
    }
    
  };

  const checkInCart = shoppingCart.filter(item =>item.id === image.id).length > 0 ? 'text-red-900' : 'text-red-200 hover:text-red-900';
  
  console.log(checkInCart);

  return (
    <div className='rounded overflow-hidden shadow-lg relative'>
      <div className={`absolute right-2 top-2 ${checkInCart}`}>
        <button onClick={() => handleButtonFavorites(image.id)}
          className={`outline-none ring-0 focus:outline-none `}>
          <FaHeart size={20} />
        </button>
      </div>
      <Link
        to={{
          pathname: `/photo/${image.id}`
        }}
      >
        <img src={image.webformatURL} alt="" className="w-full" />
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

    </div>
  )
}

