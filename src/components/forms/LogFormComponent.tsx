import React, {useEffect, useState} from "react";
import {LogModel} from "../../model/LogModel.ts";
import {useDispatch} from "react-redux";
import {addLog, updateLog} from "../../slices/LogSlice.ts";

export function LogFormComponent({onSubmit, initialData}) {
    const dispatch = useDispatch();

    const [logCode, setLogCode] = useState("");
    const [logDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [observedImage, setObservedImage] = useState("");
    const [relevantField, setRelevantField] = useState("");
    const [relevantCrop, setRelevantCrop] = useState("");
    const [relevantStaff, setRelevantStaff] = useState([]);

    useEffect(() => {
        if (initialData) {
            setLogCode(initialData.logCode || "");
            setLogDate(initialData.logDate || "");
            setLogDetails(initialData.logDetails || "");
            setObservedImage(initialData.observedImage || "");
            setRelevantField(initialData.relevantFields || "");
            setRelevantCrop(initialData.relevantCrops || "");
            setRelevantStaff(initialData.relevantStaff || []);
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
            dispatch(addLog(log));
        }

        if (onSubmit) onSubmit();
    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            setObservedImage(URL.createObjectURL(file));
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
                <label className="block text-sm font-medium text-gray-700">Log Code</label>
                <input
                    type="text"
                    value={logCode}
                    onChange={(e) => setLogCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter log code"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Log Date</label>
                <input
                    type="date"
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Log Details</label>
                <textarea
                    value={logDetails}
                    onChange={(e) => setLogDetails(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter log details"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Observed Image</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Relevant Fields</label>
                <input
                    type="text"
                    value={relevantField}

                    onChange={(e) => setRelevantField(e.target.value)}

                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter relevant fields separated by commas"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Relevant Crops</label>
                <input
                    type="text"
                    value={relevantCrop}
                    onChange={(e) =>
                        setRelevantCrop(e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter relevant crops separated by commas"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Relevant Staff</label>
                <input
                    type="text"
                    value={relevantStaff.join(", ")}
                    onChange={(e) => setRelevantStaff(e.target.value.split(',').map(item => item.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter relevant staff separated by commas"
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
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
