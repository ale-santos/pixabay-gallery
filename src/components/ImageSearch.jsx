import React, { useState } from 'react';


const ImageSearch = ({ search, searchForm }) => {
    const [text, setText] = useState(search.term);
    const [imageType, setImageType] = useState(search.imageType);
    const [category, setCategory] = useState(search.category);
    const [perPage, setPerPage] = useState(search.perPage);

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
    }

    const categories = "backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music";
    // generage select dropdown option list dynamically
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
        <div className='max-w-4xl rounded overflow-hidden mb-10 mx-auto'>
            <form onSubmit={handleOnSubmit} className="w-full max-w-4xl">
                <div className="flex justify-center items-end flex-wrap border-b-2 border-red-500 py-2">
                    <label className="w-1/3 mt-4">
                        <input onChange={e => setText(e.target.value)}
                            value={text}
                            className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="search"
                            placeholder="Search Image Term..." />
                    </label>
                    <div className="group w-2/3 flex justify-end items-end">
                        <label className="flex flex-col">
                            <label className="mx-2 text-sm text-gray-400">Type</label>
                            <select className="rounded-lg mx-2 mt-1"
                                onChange={e => handleChangeImageType(e.target.value)}
                                value={imageType}
                            >
                                <option value="all">All</option>
                                <option value="photo">Photo</option>
                                <option value="illustration">Illustration</option>
                                <option value="vector">Vector</option>
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <label className="mx-2 text-sm text-gray-400">Categories</label>
                            <select className="rounded-lg mx-2 mt-1 "
                                onChange={e => handleChangeCategories(e.target.value)}
                                value={category}
                            >
                                <option value="all">All</option>
                                <Options options={categories.split(',')} />
                            </select>
                        </label>
                        <label className="flex flex-col">
                            <label className="mx-2 text-sm text-gray-400">Qty</label>
                            <select className="rounded-lg mx-2 mt-1"
                                onChange={e => handleChangePerPage(e.target.value)}
                                value={perPage}
                            >
                                <option value="8">8</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="48">48</option>
                            </select>
                        </label>
                        <button className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-4 rounded" type="submit">
                            Search
                     </button>
                    </div>
                </div>


            </form>
        </div >
    )
}

export default ImageSearch
