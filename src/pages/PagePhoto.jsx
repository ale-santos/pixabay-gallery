import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '../context/GlobaState';
import axios from 'axios';

import { ImageCard } from '../components/ImageCard';
import ImageSearch from '../components/ImageSearch';
import Loading from '../components/Loading';

import '../styles/pagination.css';
import ReactPaginate from "react-paginate";

export const PagePhoto = () => {
    const { search, setSearch, searchMobileOpen, setSearchMobileOpen } = useContext(GlobalContext);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    function handlePageClick(e) {
        const selectedPage = e.selected;
        setSearch({ ...search, currentPage: selectedPage + 1 });
        setSearchMobileOpen(false);
    };


    return (
        <section className="pt-8">
            <header className="max-w-7xl mx-auto pt-16 pb-4 lg:pb-8 lg:pt-0 px-3 lg:px-8">
                <h1 className="w-full text-center text-2xl">PixaBay Photo Search</h1>
            </header>
            <div className="max-w-7xl mx-auto pt-4 lg:pt-0 px-2 lg:px-8">
                {isLoading ?
                    <Loading />
                    :
                    <div className="">
                        <ImageSearch
                            searchForm={(search) => setSearch(search)}
                            search={search}
                            searchMobileOpen={searchMobileOpen}
                            setSearchMobileOpen={() => setSearchMobileOpen(!searchMobileOpen)}
                            />
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10">
                            {images && images.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </div>
                    </div>
                }
                {!isLoading &&
                    <div className="flex justify-center mt-12 pb-8">
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount / search.perPage}
                            marginPagesDisplayed={1 }
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            forcePage={search.currentPage - 1}
                        />
                    </div>
                }
            </div>
        </section>
    )
}


