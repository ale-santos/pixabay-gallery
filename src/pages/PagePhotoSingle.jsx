import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobaState';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { ImageCardTag } from '../components/ImageCardTag';
import { FaHeart, FaTrash } from 'react-icons/fa';

const PagePhotoSingle = () => {
    const { shoppingCart, handleButtonFavorites } = useContext(GlobalContext);
    const [photoData, setPhotoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [inCart, setInCart] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    function checkInCart(id) {
        if (shoppingCart.filter(item => item.id === id).length > 0) {
            // return 'text-red-900';
            return true;
        } else {
            // return 'text-red-200 hover:text-red-900';
            return false;
        }
    }
    
    useEffect(() => {
        const fetchPhoto = async () => {
            setIsLoading(true);
            await axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${id}`)
                .then((res) => {
                    setPhotoData(res.data.hits[0]);
                    setInCart(res.data.hits[0].id);
                })
                .catch((error) => {
                    setPhotoData(0);
                })

            setIsLoading(false);
        };
        fetchPhoto();
        // eslint-disable-next-line
    }, []);

    const tags = photoData ? (photoData && photoData.tags.split(',')) : [];

    function goBack() {
        history.goBack()
    };

    function handlePixayButton(urlPixaBay) {
        const win = window.open(urlPixaBay, '_blank');
        win.focus();
    };
    console.log(photoData);
    return (
        <section className="bg-indigo-100 pt-8 h-full max-h-full">
            <div className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-0 h-full max-h-full">
                {isLoading ? <Loading /> :
                    photoData ?
                        (
                            <div>
                                <div className="flex w-full bg-indigo-100 h-full">
                                    <div className='w-3/5 flex justify-center pr-6'>
                                        <div className={`relative `}>
                                            <button onClick={() => handleButtonFavorites(photoData.id)}
                                                className={`absolute left-3 top-3 outline-none ring-0 focus:outline-none
                                                ${inCart ? 'text-red-900' : 'text-red-200 hover:text-red-900' }`}>
                                                <FaHeart size={30} />
                                            </button>
                                            <img className='object-contain' src={photoData.largeImageURL} alt={photoData.user} />
                                        </div>
                                    </div>
                                    <div className='w-2/5'>
                                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                            <div className="px-4 py-5 sm:px-6">
                                                <h1 className="text-lg leading-6 font-medium text-gray-900"> Photo by {photoData.user}</h1>
                                            </div>
                                            <div className="border-t border-gray-200">
                                                <dl>
                                                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Width:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{photoData.imageWidth} px</dd>
                                                    </div>
                                                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Height:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{photoData.imageHeight} px</dd>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Views:</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{photoData.views}</dd>
                                                    </div>
                                                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{photoData.downloads}</dd>
                                                    </div>
                                                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Likes</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{photoData.likes}</dd>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Tags</dt>
                                                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            {tags.map((tag, index) => (
                                                                <ImageCardTag key={index} tag={tag} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Wishlist</dt>
                                                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <button onClick={() => handleButtonFavorites(photoData.id)}
                                                                className="flex items-center bg-blue-500 hover:bg-blue-700 border-blue-500
                                                                 hover:border-blue-700 text-sm uppercase border-4 text-white py-2 px-4 rounded">
                                                                <FaTrash size={15} className="mr-1"/> Remover wishlist</button>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        <dt className="text-sm font-medium text-gray-500">Pixabay</dt>
                                                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            <button onClick={() => handlePixayButton(photoData.pageURL)}
                                                                className="bg-blue-500 hover:bg-blue-700 border-blue-500
                                                                 hover:border-blue-700 text-sm uppercase border-4 text-white py-2 px-4 rounded">
                                                                Go Page</button>
                                                        </div>
                                                    </div>

                                                </dl>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="flex justify-center mt-12">
                                    <button onClick={goBack}
                                        type="button"
                                        className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm font-semibold border-4 text-white py-2 px-4 rounded" type="button">
                                        Voltar
                        </button>
                                </div>
                            </div>
                        ) :
                        (
                            <div className='flex justify-center w-full'>
                                <h1 className="w-full text-3xl font-semibold text-blue-600 text-center mt-4 mb-6">
                                    Não encontramos essa foto.<br />Verifique os dados e tente novamente!!!! (:</h1>
                            </div>
                        )
                }
            </div>
        </section>
    )
}

export default PagePhotoSingle;
