import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addCrop} from "../../slices/CropSlice.ts";
import {CropModel} from "../../model/CropModel.ts";

export function CropForm(): React.ReactElement {
    const dispatch = useDispatch();

    const [cropCode, setCropCode] = useState("");
    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [cropImage, setCropImage] =  useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [fieldDetailsCrop, setFieldDetailsCrop] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!cropCode || !commonName || !scientificName || !cropImage || !category || !season || !fieldDetailsCrop) {
            alert("All fields are required.");
            return;
        }

        const newCrop = new CropModel(cropCode,commonName,scientificName,cropImage,category,season,fieldDetailsCrop)

        dispatch(addCrop(newCrop));

        alert("Crop Added Successfully!");

        setCropCode("");
        setCommonName("");
        setScientificName("");
        setCropImage("");
        setCategory("");
        setSeason("");

    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCropImage(URL.createObjectURL(file));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cropCode" className="block text-sm font-medium text-gray-700">
                    Crop Code
                </label>
                <input
                    type="text"
                    id="cropCode"
                    value={cropCode}
                    onChange={(e) => setCropCode(e.target.value)}
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
                    value={commonName}
                    onChange={(e) => setCommonName(e.target.value)}
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
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter scientific name of the crop"
                    required
                />
            </div>
            <div>
                <label htmlFor="cropImage" className="block text-sm font-medium text-gray-700">
                    Crop Image
                </label>
                <input
                    type="file"
                    id="cropImage"
                    onChange={handleFileChange}
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
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
                    type="text"
                    id="fieldDetailsCrop"
                    value={fieldDetailsCrop}
                    onChange={(e) => setFieldDetailsCrop(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter field details"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
                Add Crop
            </button>
        </form>
    );
}
