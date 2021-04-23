import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobaState';

export const PageCart = () => {
    const { shoppingCart } = useContext(GlobalContext);
    console.log(shoppingCart);
    return (
        <div className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-0 px-6 lg:px-8">
            <h1 className="w-full text-center text-2xl">My Favorites</h1>
            <div className="w-full mt-8 px-32 mx-auto">
                
            </div>
        </div>

    )
}
