import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {addCrop, updateCrop} from "../../slices/CropSlice.ts";
import {CropModel} from "../../model/CropModel.ts";
import {addField, updateField} from "../../slices/FieldSlice.ts";
import { Button ,Input,Form} from 'antd';
import {LabelComponent} from "../LabelComponent.tsx";
export function CropForm({onSubmit, initialData }): React.ReactElement {
    const dispatch = useDispatch();

    const [cropCode, setCropCode] = useState("");
    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [cropImage, setCropImage] =  useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [fieldDetailsCrop, setFieldDetailsCrop] = useState([]);

    useEffect(() => {
        if (initialData) {
            setCropCode(initialData.cropCode || "");
            setCommonName(initialData.commonName || "");
            setScientificName(initialData.scientificName || "");
            setCropImage(initialData.cropImage || null);
            setCategory(initialData.category || "");
            setSeason(initialData.season || "");
            setFieldDetailsCrop(initialData.fieldDetails || []);
        }
    }, [initialData]);
    function handleSubmit() {


        if (!cropCode || !commonName || !scientificName || !cropImage || !category || !season || !fieldDetailsCrop) {
            alert("All fields are required.");
            return;
        }

        const crop = new CropModel(cropCode,commonName,scientificName,cropImage,category,season,fieldDetailsCrop)

        if (initialData) {

            dispatch(updateCrop(crop));
            alert("Crop Updated Successfully!");
        } else {
            dispatch(addCrop(crop));
            alert("Crop Added Successfully!");
        }

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
        <form className="space-y-4" onSubmit={(e) => {e.preventDefault();handleSubmit();if (onSubmit) onSubmit(e);
        }} >
            <div>
                <LabelComponent htmlFor="cropCode" text="Crop Code"  />

                <Input
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

                <LabelComponent htmlFor="commonName" text={"Common Name"} />
                <Input
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
             {/*   <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700">
                    Scientific Name
                </label>*/}
                <LabelComponent htmlFor={"scientificName"} text={"Scientific Name"} />
                <Input
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
             {/*   <label htmlFor="cropImage" className="block text-sm font-medium text-gray-700">
                    Crop Image
                </label>*/}
                <LabelComponent htmlFor="cropImage"  text={"Crop Image"} />
                <Input
                    type="file"
                    id="cropImage"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
               {/* <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>*/}
                <LabelComponent htmlFor="category" text={"Category"} />
                <Input
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
               {/* <label htmlFor="season" className="block text-sm font-medium text-gray-700">
                    Season
                </label>*/}

                <LabelComponent htmlFor="season" text={"Season"}  />
                <Input
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
               {/* <label htmlFor="fieldDetailsCrop" className="block text-sm font-medium text-gray-700">
                    Field Details
                </label>*/}
                <LabelComponent htmlFor={"fieldDetailsCrop"} text={"Field Details"} />
                <Input
                    type="text"
                    id="fieldDetailsCrop"
                    value={fieldDetailsCrop.join(", ")}
                    onChange={(e) => setFieldDetailsCrop(e.target.value.split(',').map(item => item.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter field details"
                    required
                />
            </div>

            <Button
                type="primary"
                htmlType="submit"
                className="w-full py-2 mt-4"
            >
                Add Crop
            </Button>
        </form>
    );
}
