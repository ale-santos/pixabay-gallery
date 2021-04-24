import React, { useState, useEffect } from "react";
import axios from 'axios';

import { ImageCard } from '../components/ImageCard';
import ImageSearch from '../components/ImageSearch';
import Loading from '../components/Loading';
import ReactPaginate from 'react-paginate';

import '../styles/pagination.css';

export const PagePhoto = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({
        term: '',
        imageType: 'all',
        category: '',
        perPage: 12,
        currentPage: 1
    });
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const fetchPhotos = async () => {
            setIsLoading(true);
            const { data } = await axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${search.term}&image_type=${search.imageType}&category=${search.category}&pretty=true&page=${search.currentPage}&per_page=${search.perPage}`);
            setImages(data.hits);
            setPageCount(data.totalHits);
            setIsLoading(false);
            // console.log(res.data);
        };
        fetchPhotos();
    }, [search]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setSearch({ ...search, currentPage: selectedPage + 1 })
    };

    return (
        <section className="pt-8">
            <header className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-0 px-6 lg:px-8">
                <h1 className="w-full text-center text-2xl">PixaBay Photo Search {search.currentPage}</h1>
            </header>
            <div className="max-w-7xl mx-auto lg:pt-0 px-6 lg:px-8">
                {isLoading ?
                    <Loading />
                    :
                    <div>
                        <ImageSearch
                            searchForm={(search) => setSearch(search)}
                            search={search} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {images && images.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </div>

                    </div>
                }
                <div className="flex justify-center mt-12">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount / search.perPage}
                        marginPagesDisplayed={4}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </div>
        </section>
    )
}


