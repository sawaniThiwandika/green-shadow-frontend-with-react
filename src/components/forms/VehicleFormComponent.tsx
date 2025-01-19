import React, { useEffect, useState } from "react";
import { VehicleModel } from "../../model/VehicleModel";
import { useDispatch } from "react-redux";
import { addVehicle, updateVehicle } from "../../slices/VehicleSlice.ts";

export function VehicleFormComponent({ onSubmit, initialData }) {
    const dispatch = useDispatch();

    const [vehicleId, setVehicleId] = useState(initialData?.vehicleId || "");
    const [type, setType] = useState(initialData?.type || "");
    const [model, setModel] = useState(initialData?.model || "");
    const [licensePlate, setLicensePlate] = useState(initialData?.licensePlate || "");
    const [assignedField, setAssignedField] = useState(initialData?.assignedField || "");

    useEffect(() => {
        if (initialData) {
            setVehicleId(initialData.vehicleId || "");
            setType(initialData.type || "");
            setModel(initialData.model || "");
            setLicensePlate(initialData.licensePlate || "");
            setAssignedField(initialData.assignedField || "");
        }
    }, [initialData]);

    function handleSubmit() {
        const vehicleData = new VehicleModel(
            vehicleId,
            type,
            model,
            licensePlate,
            assignedField
        );

        if (vehicleId && vehicleId === initialData?.vehicleId) {
            dispatch(updateVehicle(vehicleData));
            console.log("Update vehicle: ", vehicleData);
        } else {
            dispatch(addVehicle(vehicleData));
            console.log("Add new vehicle: ", vehicleData);
        }

        if (onSubmit) onSubmit(vehicleData);
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="p-4 bg-white rounded-lg shadow-md space-y-4"
        >
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Vehicle ID</label>
                <input
                    type="text"
                    name="vehicleId"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Type</label>
                <input
                    type="text"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Model</label>
                <input
                    type="text"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">License Plate</label>
                <input
                    type="text"
                    name="licensePlate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Assigned Field</label>
                <input
                    type="text"
                    name="assignedField"
                    value={assignedField}
                    onChange={(e) => setAssignedField(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
