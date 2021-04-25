import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobaState';
import { ImageCard } from '../components/ImageCard'

export const PageCart = () => {
    const { shoppingCart } = useContext(GlobalContext);
    return (
        <section className="pt-8">
            <header className="max-w-7xl mx-auto pt-16 pb-4 lg:pb-8 lg:pt-0 px-6 lg:px-8">
                <h1 className="w-full text-center text-2xl">My Favourites</h1>
            </header>
            <div className="max-w-7xl mx-auto lg:pt-0 px-6 lg:px-8 pb-24">
                {shoppingCart.length ?
                    (<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {shoppingCart.map(itemCart => <ImageCard key={itemCart.id} image={itemCart} />)}
                    </div>)
                    : (
                        <div className="text-lg font-medium text-center mt-16">Your Wishlist is empty...</div>
                    )}

            </div>
        </section>

    )
}
