import React, {useEffect, useState} from "react";
import {FieldModel} from "../../model/FieldModel.ts";
import {useDispatch} from "react-redux";
import {addField, updateField} from "../../slices/FieldSlice.ts";

export function FieldForm({onSubmit, initialData  }) {

    const dispatch=useDispatch();

    const [fieldCode,setFieldCode] = useState("");
    const [fieldName,setFieldName] = useState("");
    const [fieldLocation,setFieldLocation] = useState("");
    const [fieldSize,setFieldSize] = useState("");
    const [fieldImage1,setFieldImage1] = useState("");
    const [fieldCrops, setFieldCrops] = useState([]);
    const [fieldStaff, setFieldStaff] = useState([]);
    const [fieldEquipment, setFieldEquipment] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFieldCode(initialData.fieldCode || "");
            setFieldName(initialData.fieldName || "");
            setFieldLocation(initialData.fieldLocation || "");
            setFieldSize(initialData.fieldSize || "");
            setFieldImage1(initialData.fieldImage1 || "");
            setFieldCrops(initialData.crops|| []);
            setFieldStaff(initialData.staff || []);
            setFieldEquipment(initialData.equipments || []);
        }
    }, [initialData]);

    function handleSubmit() {

        const field=new FieldModel(fieldCode,fieldName,fieldLocation,fieldSize,fieldImage1,fieldCrops,fieldStaff,fieldEquipment);


        if (initialData) {

            dispatch(updateField(field ));
        } else {
            dispatch(addField(field));
        }


    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFieldImage1(URL.createObjectURL(file));
    };

    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            if (onSubmit) onSubmit(e);
        }} className="max-w-lg mx-auto p-3 bg-white rounded-lg shadow-md">

            <div className="mb-4">
                <label htmlFor="fieldCode" className="block text-sm font-medium text-gray-700">Field Code</label>
                <input
                    type="text"
                    name="fieldCode"
                    value={fieldCode}
                    onChange={(e) => setFieldCode(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter field code"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700">Field Name</label>
                <input
                    type="text"
                    name="fieldName"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter field name"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fieldLocation" className="block text-sm font-medium text-gray-700">Field
                    Location</label>
                <input
                    type="text"
                    name="fieldLocation"
                    value={fieldLocation}
                    onChange={(e) => setFieldLocation(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter field location"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fieldSize" className="block text-sm font-medium text-gray-700">Field Size (in
                    Acres)</label>
                <input
                    type="number"
                    name="fieldSize"
                    value={fieldSize}
                    onChange={(e) => setFieldSize(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter field size"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fieldImage1" className="block text-sm font-medium text-gray-700">Field Image 1</label>
                <input
                    type="file"
                    name="fieldImage1"
                    onChange={handleFileChange}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                />
            </div>


            <div className="mb-4">
                <label htmlFor="crops" className="block text-sm font-medium text-gray-700">Crops</label>
                <input
                    type="text"
                    name="crops"
                    value={fieldCrops.join(', ')}
                    onChange={(e) => setFieldCrops(e.target.value.split(',').map(item => item.trim()))}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter crops separated by commas"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="staff" className="block text-sm font-medium text-gray-700">Staff</label>
                <input
                    type="text"
                    name="staff"
                    value={fieldStaff.join(', ')}
                    onChange={(e) => setFieldStaff(e.target.value.split(',').map(item => item.trim()))}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter staff members separated by commas"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">Equipments</label>
                <input
                    type="text"
                    name="equipment"
                    value={fieldEquipment.join(', ')}
                    onChange={(e) => setFieldEquipment(e.target.value.split(',').map(item => item.trim()))}
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    placeholder="Enter staff members separated by commas"
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={() => {
                        setFieldCode("");
                        setFieldName("");
                        setFieldLocation("");
                        setFieldSize("");
                        setFieldImage1("");
                        setFieldCrops([]);
                        setFieldStaff([]);
                        setFieldEquipment([]);


                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </form>


    );
};

