import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { ModalComponent } from "../components/ModalComponent";
import { CropForm } from "../components/forms/CropForm";
import { CropCard } from "../components/cards/CropCard";
import {useDispatch, useSelector} from "react-redux";
import {CropModel} from "../model/CropModel.ts";
import {deleteCrop} from "../slices/CropSlice.ts";

export interface Crop {
    cropCode: string;
    commonName: string;
    scientificName: string;
    image: string;
    category: string;
    season: string;
    fieldDetails: string;
}

export function CropPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cropList=useSelector((state:any) => state.cropSlice.crops);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const dispatch = useDispatch();

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

    const handleUpdate = (crop: CropModel) => {
        console.log("Update Code: "+crop.cropCode);
        setSelectedCrop(crop);
        setIsModalOpen(true);

    };

    const handleDelete = (crop: CropModel) => {

        dispatch((deleteCrop(crop)));
        alert("Delete crop with code: "+crop.cropCode);
        console.log("Delete crop: "+crop.cropCode);

    };
    const handleFormSubmit = (e) => {
        handleCloseModal();
        setSelectedCrop(null);
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
                {cropList.map((crop:CropModel) => (
                    <CropCard
                        key={crop.cropCode}
                        cropCode={crop.cropCode}
                        commonName={crop.commonName}
                        scientificName={crop.scientificName}
                        image={crop.image}
                        category={crop.category}
                        season={crop.season}
                        fieldDetails={crop.fieldDetails}
                        onUpdate={() => handleUpdate(crop)}
                        onDelete={()=>handleDelete(crop)}
                    />
                ))}
            </div>

            <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>
                <CropForm  onSubmit={handleFormSubmit} initialData={selectedCrop} />
            </ModalComponent>
        </div>
    );
}
