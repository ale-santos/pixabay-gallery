import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobaState';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { ImageCardTag } from '../components/ImageCardTag';
import { FaHeart } from 'react-icons/fa';

const PagePhotoSingle = () => {
    const [photoData, setPhotoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    // console.log(history);

    const { shoppingCart, addCart, removeCart } = useContext(GlobalContext);

    function checkInCart(id){
        if(shoppingCart.filter(item => item.id === id).length > 0 ){
            return 'text-red-900';
        }else{
            return 'text-red-200 hover:text-red-900';
        }
    }
    
    useEffect(() => {
        const fetchPhoto = async () => {
            setIsLoading(true);
            await axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${id}`)
                .then((res) => {
                    // console.log(res);
                    setPhotoData(res.data.hits[0]);
                })
                .catch((error) => {
                    setPhotoData(0);
                    // console.log(error.response.status);
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


    function handleButtonFavorites(id) {
        if (shoppingCart.filter(item => item.id === id).length === 0) {
            const newItem = {
                id: id,
                qty: 1
            }
            addCart(newItem);
        } else {
            removeCart(id);
        }
    };

    // console.log(photoData.length);
    // console.log(isLoading);
    return (
        <>
            <div className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-0 ">
                {isLoading ? <Loading /> :
                    photoData ?
                        (
                            <>
                                <div className="flex w-full ">
                                    <div className='w-3/5 flex justify-center pr-6 relative'>
                                        <div className={`absolute left-3 top-3 ${checkInCart(photoData.id)}`}>
                                            <button onClick={() => handleButtonFavorites(photoData.id)}
                                                className={`outline-none ring-0 focus:outline-none `}>
                                                <FaHeart size={30} />
                                            </button>
                                        </div>
                                        <img className='object-contain' src={photoData.largeImageURL} alt={photoData.user} />
                                    </div>
                                    <div className='w-2/5'>
                                        <h1 className="w-full text-2xl font-semibold text-blue-600 text-center mb-12">
                                            Photo by {photoData.user}</h1>
                                        <div className="flex border border-gray-600">
                                            <ul className="flex flex-wrap justify-start md:flex-row w-full">
                                                <li className='w-full md:w-1/4 pt-2 md:pb-2 px-6 md:border-r border-gray-600  bg-gray-200'><strong>Type: </strong>{photoData.type.charAt(0).toUpperCase() + photoData.type.slice(1)}</li>
                                                <li className='w-full md:w-1/4 pt-2 md:pb-2 px-6 md:border-r border-gray-600  bg-gray-200'><strong>Width: </strong>{photoData.imageWidth} px</li>
                                                <li className='w-full md:w-1/4 pt-2 md:pb-2 px-6 md:border-r border-gray-600  bg-gray-200'><strong>Height: </strong>{photoData.imageHeight} px</li>
                                                <li className='w-full md:w-1/4 pt-2 md:pb-2 px-6 md:border-r border-gray-600  bg-gray-200'><strong>Size: </strong>{photoData.imageSize}</li>
                                                <li className='w-full md:w-1/3 pt-2 px-6 md:border-r md:border-t border-gray-600  bg-gray-200'><strong>Views: </strong>{photoData.views}</li>
                                                <li className='w-full md:w-1/3 pt-2 px-6 md:border-r md:border-t border-gray-600  bg-gray-200'><strong>Downloads: </strong>{photoData.downloads}</li>
                                                <li className='w-full md:w-1/3 pt-2 pb-2 px-6 md:border-t border-gray-600  bg-gray-200'><strong>Likes: </strong>{photoData.likes}</li>
                                                <li className='flex justify-center w-full md:w-1/1 pt-2 md:pt-4 pb-2 px-6 md:border-t border-gray-600  bg-gray-200'>
                                                    {tags.map((tag, index) => (
                                                        <ImageCardTag key={index} tag={tag} />
                                                    ))}
                                                </li>
                                                <li className='flex justify-center w-full md:w-1/1 pt-2 md:pt-4 pb-4 px-6 md:border-t border-gray-600  bg-gray-200'>
                                                    <button onClick={() => handlePixayButton(photoData.pageURL)}
                                                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm font-semibold uppercase border-4 text-white py-2 px-4 rounded">
                                                        Página Pixabay
                                            </button>
                                                </li>

                                            </ul>
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
                            </>
                        )
                        :
                        <div className='flex justify-center w-full'>
                            <h1 className="w-full text-3xl font-semibold text-blue-600 text-center mt-4 mb-6">
                                Não encontramos essa foto.<br />Verifique os dados e tente novamente!!!! (:</h1>
                        </div>
                }
            </div>
        </>
    )
}

export default PagePhotoSingle;
