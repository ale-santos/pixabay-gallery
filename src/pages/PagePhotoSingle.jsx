import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { ImageCardTag } from '../components/ImageCardTag';


const PagePhotoSingle = () => {
    const [photoData, setPhototData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    // console.log(history);

    useEffect(() => {
        const fetchPhoto = async () => {
            setIsLoading(true);
            await axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${id}`)
                .then((res) => {
                    // console.log(res);
                    setPhototData(res.data.hits[0]);
                })
                .catch((error) => {
                    setPhototData(0);
                    // console.log(error.response.status);
                })

            setIsLoading(false);
        };
        fetchPhoto();
        // eslint-disable-next-line
    }, []);
    console.log(photoData);

    const tags = photoData ? (photoData && photoData.tags.split(',')) : [];

    const goBack = () => {
        history.goBack()
    };

    const handlePixayButton = (urlPixaBay) => {
        const win = window.open(urlPixaBay, '_blank');
        win.focus();
    };

    // console.log(photoData.length);
    // console.log(isLoading);
    return (
        <>
            <div className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-0 px-6 lg:px-8">
                {isLoading ? <Loading /> :
                    photoData ?
                        <div >
                            <div className='flex justify-center w-full'>
                                <img className='' src={photoData.largeImageURL} alt={photoData.user} />
                            </div>
                            <h1 className="w-full text-3xl font-semibold text-blue-600 text-center mt-6 mb-6">
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
                                            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm font-semibold uppercase border-4 text-white py-3 px-6 rounded">
                                            Página Pixabay
                                            </button>
                                    </li>

                                </ul>
                            </div>

                            <div className="flex justify-center mt-8">
                                <button onClick={goBack}
                                    className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm font-semibold border-4 text-white py-2 px-4 rounded" type="button">
                                    Voltar
                                </button>
                            </div>
                        </div>
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
