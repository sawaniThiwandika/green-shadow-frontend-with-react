import React, { useState } from 'react';
import { TableComponent } from '../components/TableComponent.tsx';
import { FaSearch } from 'react-icons/fa';
import { BiPlus } from "react-icons/bi";
import { ModalComponent } from "../components/ModalComponent.tsx";

export function VehiclePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    function handleAddButton() {
        setIsModalOpen(true);
    }

    const dataSource = [
        {
            key: '1',
            vehicleId: 'V001',
            type: 'Tractor',
            model: 'John Deere X9',
            licensePlate: 'ABC-1234',
            assignedField: 'Field 1',
        },
        {
            key: '2',
            vehicleId: 'V002',
            type: 'Truck',
            model: 'Ford F-150',
            licensePlate: 'XYZ-5678',
            assignedField: 'Field 3',
        },
    ];

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
            title: 'Assigned Field',
            dataIndex: 'assignedField',
            key: 'assignedField',
        },
        {
            title: 'Update',
            key: 'update',
        },
        {
            title: 'Delete',
            key: 'delete',
        },
    ];

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        console.log("Form Data:", formObject);
        closeModal();
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Vehicle Page</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex-grow flex justify-center mb-4 sm:mb-0">
                    <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
                        <FaSearch className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none px-2 py-1 w-full"
                        />
                    </div>
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

            <TableComponent dataSource={dataSource} columns={columns} />

            <ModalComponent
                title="Add New Vehicle"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Vehicle ID</label>
                        <input
                            type="text"
                            name="vehicleId"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Type</label>
                        <input
                            type="text"
                            name="type"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Model</label>
                        <input
                            type="text"
                            name="model"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">License Plate</label>
                        <input
                            type="text"
                            name="licensePlate"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Assigned Field</label>
                        <input
                            type="text"
                            name="assignedField"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                </form>
            </ModalComponent>
        </div>
    );
}
