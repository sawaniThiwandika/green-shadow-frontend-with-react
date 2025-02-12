import React, {useEffect, useState} from "react";
import { TableComponent } from "../components/TableComponent";
import { FaSearch } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { ModalComponent } from "../components/ModalComponent";
import { StaffFormComponent } from "../components/forms/StaffFormComponent";
import {useDispatch, useSelector} from "react-redux";
import { StaffModel } from "../model/StaffModel.ts";
import {deleteExitingStaff, deleteStaff, getStaff} from "../slices/StaffSlice.ts";
import {SearchBarComponent} from "../components/SearchBarComponent.tsx";
import {getFields} from "../slices/FieldSlice.ts";

export function StaffPage() {
    const dispatch=useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaff, setSelectedStaff] = useState(null);

    const staffList = useSelector((state: any) => state.staffSlice.staff);

    useEffect(() => {
        if (staffList.length === 0){
            dispatch(getStaff());
        }

    });

    const dataSource = staffList.map((staff: StaffModel, index: number) => ({
        key: index.toString(),
        staffId: staff.staffId,
        name: `${staff.firstName} ${staff.lastName}`,
        contactNo: staff.contact,
        email: staff.email,
    }));

    const filteredDataSource = dataSource.filter((staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdate = (record) => {
        const staffMember = staffList.find(staffMem => staffMem.staffId === record.staffId);
        setSelectedStaff(staffMember);
        console.log("update "+record.staffId);
        setIsModalOpen(true);
    };
    const handleDelete = (record) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${record.name}?`);
        if (confirmed) {
            dispatch(deleteExitingStaff(record.staffId));
            console.log(`Deleting staff with ID: ${record.staffId}`);
        }
    };

    const columns = [
        { title: "Staff ID", dataIndex: "staffId", key: "staffId" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Contact No.", dataIndex: "contactNo", key: "contactNo" },
        { title: "Email", dataIndex: "email", key: "email" },
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

    const handleAddButton = () => {
        setSelectedStaff(null);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedStaff(null);
    };
    const handleFormSubmit = (e) => {
        handleModalClose();
    };

    return (
        <div className="container mx-auto p-6"    style={{ maxHeight: "calc(100vh - 100px)" }}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Staff Page</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex-grow flex justify-center mb-4 sm:mb-0">
                    {/*<div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
                        <FaSearch className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="outline-none px-2 py-1 w-full"
                        />
                    </div>*/}
                    <SearchBarComponent placeHolder={"Search Staff Member..."} onSearch={setSearchQuery}/>
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
            <TableComponent dataSource={filteredDataSource} columns={columns} />
            <ModalComponent
                title={selectedStaff ? "Update Staff" : "Add New Staff"}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            >
                <StaffFormComponent
                    onSubmit={handleFormSubmit}
                    initialData={selectedStaff}
                />
            </ModalComponent>
        </div>
    );
}
