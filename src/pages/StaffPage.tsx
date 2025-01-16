import React, { useState } from "react";
import { TableComponent } from "../components/TableComponent";
import { FaSearch } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { ModalComponent } from "../components/ModalComponent";
import { StaffFormComponent } from "../components/forms/StaffFormComponent";
import {useSelector} from "react-redux";
import {StaffModel} from "../model/StaffModel.ts";

export function StaffPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const staffList = useSelector((state: any) => state.staffSlice.staff);
    const dataSource = staffList.map((staff: StaffModel, index: number) => ({
        key: index.toString(),
        staffId: staff.staffId,
        name: `${staff.firstName} ${staff.lastName}`,
        contactNo: staff.contact,
        email: staff.email,
    }));
    /*const dataSource = [
        {
            key: "1",
            staffId: "S001",
            name: "Thiwandika",
            contactNo: "0716258026",
            email: "thiwandika.whs@gmail.com",
        },
        {
            key: "2",
            staffId: "S002",
            name: "Sawani",
            contactNo: "0763519008",
            email: "sawani.wh@gmail.com",
        },
    ];*/

    const columns = [
        { title: "Staff ID", dataIndex: "staffId", key: "staffId" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Contact No.", dataIndex: "contactNo", key: "contactNo" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Update", key: "update" },
        { title: "Delete", key: "delete" },
    ];

    const handleAddButton = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleFormSubmit = (e) => {
        handleModalClose();
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
                    <button
                        onClick={handleAddButton}
                        type="button"
                        className="flex items-center text-white bg-green-700 rounded-md px-4 py-2 hover:bg-green-800"
                    >
                        Add New
                        <BiPlus className="ml-2" />
                    </button>
                </div>
            </div>
            <TableComponent dataSource={dataSource} columns={columns} />
            <ModalComponent
                title="Add New Staff"
                isOpen={isModalOpen}
                onClose={handleModalClose}
            >
                <StaffFormComponent onSubmit={handleFormSubmit} />
            </ModalComponent>
        </div>
    );
}
