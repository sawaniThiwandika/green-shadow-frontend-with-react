import React, {useEffect, useState} from "react";
import { FaPlus } from "react-icons/fa";
import { ModalComponent } from "../components/ModalComponent";
import { CropForm } from "../components/forms/CropForm";
import { CropCard } from "../components/cards/CropCard";
import {useDispatch, useSelector} from "react-redux";
import {CropModel} from "../model/CropModel.ts";
import {deleteExitingCrop, getCrops} from "../slices/CropSlice.ts";
import {SearchBarComponent} from "../components/SearchBarComponent.tsx";


export function CropPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cropList=useSelector((state:any) => state.cropSlice.crops);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");

    const filteredCrops = cropList.filter((crop: CropModel) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
            (crop.commonName?.toLowerCase().includes(lowercasedQuery) || false) ||
            (crop.scientificName?.toLowerCase().includes(lowercasedQuery) || false) ||
            (crop.category?.toLowerCase().includes(lowercasedQuery) || false)
        );
    });

    useEffect(() => {
        if (cropList.length === 0){
            dispatch(getCrops());
        }
        console.log("Crop List :"+ cropList);
    });


    const handleAddButton = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleUpdate = (crop: CropModel) => {
        console.log("Update Code: "+crop.cropCode);
        setSelectedCrop(crop);
        setIsModalOpen(true);

    };

    const handleDelete = (crop: CropModel) => {

        dispatch(deleteExitingCrop(crop.cropCode));
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

                <SearchBarComponent placeHolder={"Search crops..."} onSearch={setSearchQuery} />

                <button
                    type="button"
                    className="flex items-center px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-300"
                    onClick={handleAddButton}
                >
                    <FaPlus className="mr-2" /> Add New Crop
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" id="cropContainer">
                {filteredCrops.map((crop:CropModel) => (
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
