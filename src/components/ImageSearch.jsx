import React, { useState } from 'react';


const ImageSearch = ({ search, searchForm, searchMobileOpen, setSearchMobileOpen }) => {
    const [text, setText] = useState(search.term);
    const [imageType, setImageType] = useState(search.imageType);
    const [category, setCategory] = useState(search.category);
    const [perPage, setPerPage] = useState(search.perPage);

    console.log(searchMobileOpen);
    const handleChangeImageType = (type) => {
        setImageType(type);
    }

    const handleChangePerPage = (total) => {
        setPerPage(total);
    }

    const handleChangeCategories = (category) => {
        setCategory(category);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        searchForm({
            term: text,
            imageType: imageType,
            category: category,
            perPage: perPage,
            currentPage: 1
        });
        setSearchMobileOpen(false);
    }

    const categories = "backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music";
    function Options({ options }) {
        return (
            options.map(option =>
                <option key={option.trim()} value={option.trim()}>
                    {option.trim().charAt(0).toUpperCase() + option.trim().slice(1)}
                </option>
            )
        );
    }

    return (
        <div className={`${!searchMobileOpen ? 'hidden' : 'block'} lg:block fixed top-16 -right-0 z-10 
            lg:top-0 lg:right-0 lg:relative w-full lg:max-w-4xl mx-auto bg-gray-100 rounded 
            overflow-hidden mb-10 pb-10 shadow-2xl lg:shadow-md`}>
            <form onSubmit={handleOnSubmit} className="w-full max-w-4xl px-16">
                <div className="flex flex-row flex-wrap justify-center items-end border-b-2 border-red-500 py-2">
                    <label className="w-full md:w-1/3 mt-4 mb-3 md:mb-0">
                        <input onChange={e => setText(e.target.value)}
                            value={text}
                            className="bg-indigo-100 md:bg-transparent border-none w-full text-gray-700 
                            mr-3 py-3 px-2 leading-tight focus:outline-none"
                            type="search"
                            placeholder="Search Image Term..." />
                    </label>
                    <div className="group w-full md:w-2/3 flex flex-wrap 
                            justify-center items-end md:justify-end">
                        <label className="flex flex-col mr-2 mb-2">
                            <label className="text-sm text-gray-400">Type</label>
                            <select className="rounded-lg mt-1"
                                onChange={e => handleChangeImageType(e.target.value)}
                                value={imageType}>
                                <option value="all">All</option>
                                <option value="photo">Photo</option>
                                <option value="illustration">Illustration</option>
                                <option value="vector">Vector</option>
                            </select>
                        </label>
                        <label className="flex flex-col mr-2 mb-2">
                            <label className="text-sm text-gray-400">Categories</label>
                            <select className="rounded-lg mt-1"
                                onChange={e => handleChangeCategories(e.target.value)}
                                value={category}>
                                <option value="all">All</option>
                                <Options options={categories.split(',')} />
                            </select>
                        </label>
                        <label className="flex flex-col mr-2 mb-2">
                            <label className="text-sm text-gray-400">Qty</label>
                            <select className="rounded-lg mt-1"
                                onChange={e => handleChangePerPage(e.target.value)}
                                value={perPage}>
                                <option value="8">8</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="48">48</option>
                            </select>
                        </label>
                        <div className="ml-2 mb-2">
                            <button className="mb-1 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700
                        text-sm border-4 text-white py-1 px-4 rounded" type="submit">
                                Search</button>
                        </div>
                    </div>
                </div>


            </form>
        </div >
    )
}

export default ImageSearch;