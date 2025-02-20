import React, {useEffect, useState} from 'react';
import { TableComponent } from '../components/TableComponent.tsx';
import { FaSearch } from 'react-icons/fa';
import { BiPlus } from "react-icons/bi";
import { ModalComponent } from "../components/ModalComponent.tsx";
import {VehicleFormComponent} from "../components/forms/VehicleFormComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteExitingVehicle, deleteVehicle, getVehicles} from "../slices/VehicleSlice.ts";
import {SearchBarComponent} from "../components/SearchBarComponent.tsx";
import {EquipmentModel} from "../model/EquipmentModel.ts";
import {VehicleModel} from "../model/VehicleModel.ts";

export function VehiclePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState();
    const dispatch=useDispatch();

    const vehicleList = useSelector((state: any) => state.vehicleSlice.vehicles) || [];

    const [searchQuery, setSearchQuery] = useState("");

    const filteredVehicles = vehicleList.filter((v: VehicleModel) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
            v.vehicleId.toLowerCase().includes(lowercasedQuery) ||
            v.licensePlate.toLowerCase().includes(lowercasedQuery)||
            v.model.toLowerCase().includes(lowercasedQuery)||
            v.type.toLowerCase().includes(lowercasedQuery)
        );
    });


    useEffect(() => {
        //console.log("Vehicle List :"+vehicleList);
        if (vehicleList.length === 0){
            dispatch(getVehicles());
        }
        console.log("Vehicle List :"+vehicleList);
    });
    // dispatch(getVehicles());


    function handleAddButton() {
        setIsModalOpen(true);
    }


    function handleUpdate(record) {
        const selectv = vehicleList.find(vehicle => vehicle.vehicleId === record.vehicleId);
        setIsModalOpen(true);
        setSelectedVehicle(selectv);

    }

    function handleDelete(record) {
        const selectv = vehicleList.find(vehicle => vehicle.vehicleId === record.vehicleId);
        dispatch(deleteExitingVehicle(selectv.vehicleId));

    }

    const columns = [
        {
            title: 'Vehicle ID',
            dataIndex: 'vehicleId',
            key: 'vehicleId',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'License Plate',
            dataIndex: 'licensePlate',
            key: 'licensePlate',
        },
        {
            title: 'Assigned Staff',
            dataIndex: 'assignedStaff',
            key: 'assignedStaff',
        },
        {
            title: "Action",
            key: "update",
            render: (record:any) => (
                <button
                    onClick={()=>handleUpdate(record)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    UPDATE
                </button>
            ),
        },
        {
            title: "Action",
            key: "delete",
            render: (record:any) => (

                <button
                    onClick={()=>handleDelete(record)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    DELETE
                </button>
            ),
        },
    ];

    const closeModal = () => setIsModalOpen(false);

    const handleFormSubmit = (e) => {

        closeModal();

    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Vehicle Page</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex-grow flex justify-center mb-4 sm:mb-0">
                    <SearchBarComponent placeHolder={"Search Vehicle..."} onSearch={setSearchQuery}/>
                </div>

                <div className="ml-4 sm:ml-10">
                    <button onClick={handleAddButton}
                            type="button"
                            className="flex items-center text-white bg-green-700 rounded-md px-4 py-2 hover:border-green-950 hover:bg-white hover:text-black">
                        Add New
                        <BiPlus className="ml-3" />
                    </button>
                </div>
            </div>

            <TableComponent dataSource={filteredVehicles} columns={columns}/>
            <ModalComponent
                title="Add New Vehicle"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <VehicleFormComponent
                    onSubmit={handleFormSubmit}
                    initialData={selectedVehicle}
                />

            </ModalComponent>
        </div>
    );
}
