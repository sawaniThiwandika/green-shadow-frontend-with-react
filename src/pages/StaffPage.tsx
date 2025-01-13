import React from 'react';
import { TableComponent } from '../components/TableComponent.tsx';
import { FaSearch} from 'react-icons/fa';
import {BiPlus} from "react-icons/bi";

export function StaffPage() {

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




    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Staff Page</h1>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex-grow flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
                        <FaSearch className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none px-2 py-1 w-full"
                        />
                    </div>
                </div>

                <div className="ml-4 mr-10">
                    <button
                        type="button"
                        className="flex items-center text-white bg-green-700 rounded-md px-4 py-2 hover:border-green-950 hover:bg-white hover:text-black">
                        Add New
                        <BiPlus className="ml-3" />
                    </button>
                </div>
            </div>

            <TableComponent dataSource={dataSource} columns={columns} />
        </div>
    );

}

