import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { ModalComponent } from "../components/ModalComponent.tsx";
import { CropForm } from "../components/forms/CropForm";

export interface Crop {
    cropCode: string;
    commonName: string;
    scientificName: string;
    image: string;
    category: string;
    season: string;
    fieldDetails: string;
}

export function CropPage(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const crops: Crop[] = [
        {
            cropCode: "C123",
            commonName: "Rice",
            scientificName: "Oryza sativa",
            image: logo,
            category: "Cereal",
            season: "Summer",
            fieldDetails: "Field 1",
        },
        {
            cropCode: "C124",
            commonName: "Wheat",
            scientificName: "Triticum aestivum",
            image: logo,
            category: "Cereal",
            season: "Winter",
            fieldDetails: "Field 2",
        },
        {
            cropCode: "C125",
            commonName: "Tomato",
            scientificName: "Solanum lycopersicum",
            image: logo,
            category: "Vegetable",
            season: "Spring",
            fieldDetails: "Field 3",
        },
    ];

    const handleAddButton = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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

            <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>
                <CropForm />
            </ModalComponent>
        </div>
    );
}
