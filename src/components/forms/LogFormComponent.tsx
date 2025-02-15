import React, {useEffect, useState} from "react";
import {LogModel} from "../../model/LogModel.ts";
import {useDispatch, useSelector} from "react-redux";
import {addLog, saveLog, updateLog} from "../../slices/LogSlice.ts";
import {Button, Input, Select} from "antd";
import {LabelComponent} from "../LabelComponent.tsx";
import {StaffModel} from "../../model/StaffModel.ts";
import {FieldModel} from "../../model/FieldModel.ts";
import {CropModel} from "../../model/CropModel.ts";

export function LogFormComponent({onSubmit, initialData}) {
    const dispatch = useDispatch();

    const [logCode, setLogCode] = useState("");
    const [logDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [observedImage, setObservedImage] = useState("");
    const [relevantField, setRelevantField] = useState("");
    const [relevantCrop, setRelevantCrop] = useState("");
    const [relevantStaff, setRelevantStaff] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const staffList = useSelector((state: any) => state.staffSlice.staff);
    const fieldList = useSelector((state: any) => state.fieldSlice.fields);
    const cropList = useSelector((state: any) => state.cropSlice.crops);

    const filteredStaff = staffList.filter((staff: StaffModel) =>
        staff.staffId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        if (initialData) {
            setLogCode(initialData.logCode || "");
            setLogDate(initialData.logDate || "");
            setLogDetails(initialData.logDetails || "");
            setObservedImage(initialData.observedImage || "");
            setRelevantField(initialData.relevantFields || "");
            setRelevantCrop(initialData.relevantCrops || "");
            setRelevantStaff(Array.isArray(initialData.relevantStaff) ? initialData.relevantStaff : []);
        }
    }, [initialData]);

    const handleSubmit = () => {
        const log = new LogModel(
            logCode,
            logDate,
            logDetails,
            relevantField,
            relevantCrop,
            relevantStaff,
            observedImage
        );

        if (initialData) {
            dispatch(updateLog(log));
        } else {

            console.log("staff list of log :"+relevantStaff[0]);
            dispatch(saveLog(log));
        }

        if (onSubmit) onSubmit();
    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            setObservedImage(file);
        }
    };
    const handleStaffSelection = (staffId:string) => {
        if (!relevantStaff.includes(staffId)) {
            setRelevantStaff([...relevantStaff, staffId]);
        }
    };


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-md"
        >
            <div className="mb-4">
                <LabelComponent htmlFor={"logCode"} text={"Log Code"}/>
                <Input
                    type="text"
                    id="logCode"
                    value={logCode}
                    onChange={(e) => setLogCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter log code"
                />
            </div>

            <div className="mb-4">
                <LabelComponent htmlFor={"logDate"} text={"Log Date"}/>
                <Input
                    type="date"
                    id="logDate"
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <LabelComponent htmlFor={"logDetails"} text={"Log Details"}/>
                <textarea
                    value={logDetails}
                    id="logDetails"
                    onChange={(e) => setLogDetails(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter log details"
                />
            </div>

            <div className="mb-4">
                <LabelComponent htmlFor={"observedImage"} text={"Observed Image"}/>
                <Input
                    id='observedImage'
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <LabelComponent htmlFor={"relevantFields"} text={"Relevant Fields"}/>
                <select
                    name="relevantField"
                    value={relevantField}
                    id={"relevantFields"}
                    onChange={(e) => setRelevantField(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 required"

                >

                    <option value="">Select Field</option>
                    {fieldList.map((field: FieldModel) => (
                        <option key={field.fieldCode} value={field.fieldCode}>
                            {field.fieldName}
                        </option>
                    ))}

                </select>
            </div>


            <div className="mb-4">
                <LabelComponent htmlFor={"relevantCrops"} text={"Relevant Crops"}/>
                <select
                    id='relevantCrops'
                    value={relevantCrop}
                    onChange={(e) =>
                        setRelevantCrop(e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"

                >
                    <option value="">Select Crop</option>
                    {cropList.map((crop: CropModel) => (
                        <option key={crop.cropCode} value={crop.cropCode}>
                            {crop.commonName}
                        </option>
                    ))}

                </select>
            </div>

            <div className="mb-4">
                <LabelComponent htmlFor={"rStaff"} text={"Relevant Staff"}/>
                <Input
                    id='rStaff'
                    type="text"
                    value={relevantStaff.join(", ")}
                    /*onChange={
                    (e) => setRelevantStaff(e.target.value.split(',').map(item => item.trim()))}*/
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter relevant staff separated by commas"
                    name="rStaff"
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                       // setRelevantStaff(e.target.value.split(",").map((item) => item.trim()));
                    }}
                />

                {searchTerm && (
                    <ul className="bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10">
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((staff: StaffModel, index) => (
                                <li
                                    key={index}
                                    className="px-2 py-1 cursor-pointer hover:bg-blue-100"
                                    onClick={() => {
                                    handleStaffSelection(staff.staffId)
                                        // setSearchTerm("");
                                    }}
                                >
                                    {staff.staffId}
                                </li>
                            ))
                        ) : (
                            <li className="px-2 py-1 text-gray-500">No staff found</li>
                        )}
                    </ul>

                )}

            </div>

            <div className="flex justify-end mt-6">
                <Button
                    type="primary"
                    onClick={() => {
                        setLogCode("");
                        setLogDate("");
                        setLogDetails("");
                        setObservedImage("");
                        setRelevantField("");
                        setRelevantCrop("");
                        setRelevantStaff([]);
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Reset
                </Button>
                <Button
                    type="primary"
                    className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </form>
    );
};
