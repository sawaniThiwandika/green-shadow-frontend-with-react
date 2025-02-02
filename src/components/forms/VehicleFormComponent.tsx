import React, { useEffect, useState } from "react";
import { VehicleModel } from "../../model/VehicleModel";
import {useDispatch, useSelector} from "react-redux";
import { saveVehicle, updateVehicle} from "../../slices/VehicleSlice.ts";
import {StaffModel} from "../../model/StaffModel.ts";

export function VehicleFormComponent({ onSubmit, initialData }) {
    const dispatch = useDispatch();
    const staffList = useSelector((state: any) => state.staffSlice.staff);
    //console.log("staff :",staffList);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredStaff = staffList.filter((staff: StaffModel) =>
        staff.staffId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [vehicleId, setVehicleId] = useState(initialData?.vehicleId || "");
    const [type, setType] = useState(initialData?.type || "");
    const [model, setModel] = useState(initialData?.model || "");
    const [licensePlate, setLicensePlate] = useState(initialData?.licensePlate || "");
    const [assignedStaff, setAssignedStaff] = useState(initialData?.assignedStaff || []);

    useEffect(() => {
        if (initialData) {
            setVehicleId(initialData.vehicleId || "");
            setType(initialData.type || "");
            setModel(initialData.model || "");
            setLicensePlate(initialData.licensePlate || "");
            setAssignedStaff(initialData.assignedStaff || []);
        }
    }, [initialData]);

    function handleSubmit() {
        const vehicleData = new VehicleModel(
            vehicleId,
            type,
            model,
            licensePlate,
            []
        );

        if (vehicleId && vehicleId === initialData?.vehicleId) {
            dispatch(updateVehicle(vehicleData));
            console.log("Update vehicle: ", vehicleData);
        } else {
            dispatch(saveVehicle(vehicleData));
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
            <div className="mb-4 relative">
                <label className="block text-gray-700 mb-1">Assigned Staff</label>
                <input
                    type="text"
                    name="assignedStaff"
                    value={assignedStaff.join(", ")}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setAssignedStaff(e.target.value.split(",").map((item) => item.trim()));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter relevant staff separated by commas"
                />
                {searchTerm && (
                    <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10">
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((staff: StaffModel, index) => (
                                <li
                                    key={index}
                                    className="px-2 py-1 cursor-pointer hover:bg-blue-100"
                                    onClick={() => {
                                        setAssignedStaff([
                                            ...assignedStaff,
                                            staff.staffId,
                                        ]);
                                        setSearchTerm("");
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
