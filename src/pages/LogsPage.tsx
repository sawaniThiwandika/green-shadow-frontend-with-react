import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {BiPlus} from 'react-icons/bi';
import {ModalComponent} from "../components/ModalComponent.tsx";
import {TableComponent} from "../components/TableComponent.tsx";
import logo from '../assets/logo.png';

export function LogsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const logs = [
        {
            logId: 'L001',
            date: '2025-01-01',
            activity: 'Watering',
            image: logo,
            responsibleStaff: 'Thiwandika',
            details: 'Watering field 1.',
        },
        {
            logId: 'L002',
            date: '2025-01-02',
            activity: 'Plowing',
            image: logo,
            responsibleStaff: 'Sawani',
            details: 'Plowing field 2.',
        },
    ];

    const columns = [
        {
            title: 'Log ID',
            dataIndex: 'logId',
            key: 'logId',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Activity',
            dataIndex: 'activity',
            key: 'activity',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',

            image: <img src={logo} alt="log image" style={{width: '50px', height: '50px'}}/>

        },
        {
            title: 'Responsible Staff',
            dataIndex: 'responsibleStaff',
            key: 'responsibleStaff',
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
        },
        {
            title: 'Actions',
            key: 'actions',

        },
    ];

    const handleAddButton = () => {
        setIsModalOpen(true);
    };


    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Logs Management</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex-grow flex justify-center mb-4 sm:mb-0">
                    <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
                        <FaSearch className="text-gray-600 mr-2"/>
                        <input
                            type="text"
                            placeholder="Search Logs"
                            className="outline-none px-2 py-1 w-full"
                        />
                    </div>
                </div>

                <div className="ml-4 sm:ml-10">
                    <button onClick={handleAddButton}
                            type="button"
                            className="flex items-center text-white bg-green-700 rounded-md px-4 py-2 hover:border-green-950 hover:bg-white hover:text-black">
                        Add New Log
                        <BiPlus className="ml-3"/>
                    </button>
                </div>
            </div>

            <TableComponent dataSource={logs} columns={columns}/>

            <ModalComponent
                title="Add New Log"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Log ID</label>
                        <input
                            type="text"
                            name="logId"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Activity</label>
                        <input
                            type="text"
                            name="activity"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Responsible Staff</label>
                        <input
                            type="text"
                            name="responsibleStaff"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Details</label>
                        <textarea
                            name="details"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Observed Image (optional)</label>
                        <input
                            type="file"
                            name="image"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            accept="image/*"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success w-100 bg-green-600 text-white rounded-md py-2">
                        Add Log
                    </button>
                </form>
            </ModalComponent>
        </div>
    );
}
