import React, { useState } from 'react';
import { TableComponent } from '../components/TableComponent.tsx';
import { FaSearch } from 'react-icons/fa';
import { BiPlus } from "react-icons/bi";
import { ModalComponent } from "../components/ModalComponent.tsx";

export function StaffPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    function handleAddButton() {
        setIsModalOpen(true);
    }

    const dataSource = [
        {
            key: '1',
            staffId: 'S001',
            name: 'Thiwandika',
            contactNo: '0716258026',
            email: 'thiwandika.whs@gmail.com',
        },
        {
            key: '2',
            staffId: 'S002',
            name: 'sawani',
            contactNo: '0763519008',
            email: 'sawani.wh@gmail.com',
        },
    ];

    const columns = [
        {
            title: 'Staff ID',
            dataIndex: 'staffId',
            key: 'staffId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contact No.',
            dataIndex: 'contactNo',
            key: 'contactNo',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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

    const showModal = () => setIsModalOpen(true);
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
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Staff Page</h1>
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
                title="Add New Staff"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Staff ID</label>
                        <input
                            type="text"
                            name="staffId"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="fname"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Contact No.</label>
                        <input
                            type="text"
                            name="contactNo"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Joined Date</label>
                        <input
                            type="date"
                            name="joinedDate"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            required
                        >
                            <option value="">Select role</option>
                            <option value="Manager">Manager</option>
                            <option value="Worker">Worker</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="fields">Allocated Fields</label>
                        <input
                            type="text"
                            id="fields"
                            name="fields"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            placeholder="Enter fields or N/A"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="vehicle">Vehicle</label>
                        <input
                            type="text"
                            id="vehicle"
                            name="vehicle"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            placeholder="Enter vehicle details"
                            required
                        />
                    </div>

                </form>
            </ModalComponent>
        </div>
    );
}
