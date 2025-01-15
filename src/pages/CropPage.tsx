import React, { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png';

export function CropPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const crops = [
        {
            cropCode: 'C123',
            commonName: 'Rice',
            scientificName: 'Oryza sativa',
            image: logo,
            category: 'Cereal',
            season: 'Summer',
            fieldDetails: 'Field 1',
        },
        {
            cropCode: 'C124',
            commonName: 'Wheat',
            scientificName: 'Triticum aestivum',
            image: logo,
            category: 'Cereal',
            season: 'Winter',
            fieldDetails: 'Field 2',
        },
        {
            cropCode: 'C125',
            commonName: 'Tomato',
            scientificName: 'Solanum lycopersicum',
            image: logo,
            category: 'Vegetable',
            season: 'Spring',
            fieldDetails: 'Field 3',
        },
    ];



    const handleAddButton = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto my-5 px-4">
            <h3 className="text-center text-2xl font-semibold mb-5" id="cropsHeader">
                Crops Management
            </h3>

            <div className="flex justify-between items-center mb-5">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search crops..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                </div>

                <button
                    type="button"
                    className="flex items-center px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-300"
                    onClick={handleAddButton}
                >
                    <FaPlus className="mr-2" /> Add New Crop
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" id="cropContainer">
                {crops.map((crop) => (
                    <div
                        key={crop.cropCode}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl"
                    >
                        <img
                            src={crop.image}
                            alt={crop.commonName}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">{crop.commonName}</h4>
                        <p className="text-sm text-gray-500">Scientific Name: {crop.scientificName}</p>
                        <p className="text-sm text-gray-500">Category: {crop.category}</p>
                        <p className="text-sm text-gray-500">Season: {crop.season}</p>
                        <p className="text-sm text-gray-500">Field: {crop.fieldDetails}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    id="addCropModal"
                >
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full md:w-1/2 lg:w-1/3">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-semibold">Add New Crop</h5>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </button>
                        </div>

                        <form className="space-y-4 mt-4">
                            <div>
                                <label htmlFor="cropCode" className="block text-sm font-medium text-gray-700">
                                    Crop Code
                                </label>
                                <input
                                    type="text"
                                    id="cropCode"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter unique crop code"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="commonName" className="block text-sm font-medium text-gray-700">
                                    Common Name
                                </label>
                                <input
                                    type="text"
                                    id="commonName"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter common name of the crop"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700">
                                    Scientific Name
                                </label>
                                <input
                                    type="text"
                                    id="scientificName"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter scientific name of the crop"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cropImage" className="block text-sm font-medium text-gray-700">
                                    Crop Image URL
                                </label>
                                <input
                                    type="file"
                                    id="cropImage"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter category (e.g., Cereal)"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="season" className="block text-sm font-medium text-gray-700">
                                    Season
                                </label>
                                <input
                                    type="text"
                                    id="season"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter season of the crop"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="fieldDetailsCrop" className="block text-sm font-medium text-gray-700">
                                    Field Details
                                </label>
                                <input
                                    type="search"
                                    id="fieldDetailsCrop"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter field details"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                                Add Crop
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
