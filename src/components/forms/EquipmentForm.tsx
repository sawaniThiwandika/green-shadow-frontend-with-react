import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EquipmentModel } from "../../model/EquipmentModel";
import { addEquipment, updateEquipment } from "../../slices/EquipmentSlice";

export function EquipmentForm({ onSubmit, initialData }) {
    const dispatch = useDispatch();

    const [equipmentId, setEquipmentId] = useState("");
    const [equipmentName, setEquipmentName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [equipmentStatus, setEquipmentStatus] = useState("");
    const [equipmentAssignedStaff, setEquipmentAssignedStaff] = useState([]);
    const [equipmentAssignedField, setEquipmentAssignedField] = useState("");

    useEffect(() => {
        if (initialData) {
            setEquipmentId(initialData.equipmentId || "");
            setEquipmentName(initialData.equipmentName || "");
            setEquipmentType(initialData.equipmentType || "");
            setEquipmentStatus(initialData.equipmentStatus || "");
            setEquipmentAssignedStaff(initialData.equipmentAssignedStaff || []);
            setEquipmentAssignedField(initialData.equipmentAssignedField || "");
        }
    }, [initialData]);

    const handleSubmit = () => {
        const equipment = new EquipmentModel(
            equipmentId,
            equipmentName,
            equipmentType,
            equipmentStatus,
            equipmentAssignedStaff,
            equipmentAssignedField
        );

        if (initialData) {
            dispatch(updateEquipment(equipment));
        } else {
            dispatch(addEquipment(equipment));
        }

        if (onSubmit) onSubmit();
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
                <label className="block text-sm font-medium text-gray-700">Equipment ID</label>
                <input
                    type="text"
                    value={equipmentId}
                    onChange={(e) => setEquipmentId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter equipment ID"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
                <input
                    type="text"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter equipment name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Equipment Type</label>
                <input
                    type="text"
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter equipment type"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Equipment Status</label>
                <input
                    type="text"
                    value={equipmentStatus}
                    onChange={(e) => setEquipmentStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter equipment status"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Assigned Staff</label>
                <input
                    type="text"
                    value={equipmentAssignedStaff.join(", ")}
                    onChange={(e) =>
                        setEquipmentAssignedStaff(e.target.value.split(",").map((item) => item.trim()))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter assigned staff separated by commas"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Assigned Field</label>
                <input
                    type="text"
                    value={equipmentAssignedField}
                    onChange={(e) =>
                        setEquipmentAssignedField(e.target.value.split(",").map((item) => item.trim()))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter assigned field"
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={() => {
                        setEquipmentId("");
                        setEquipmentName("");
                        setEquipmentType("");
                        setEquipmentStatus("");
                        setEquipmentAssignedStaff([]);
                        setEquipmentAssignedField("");
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
}
