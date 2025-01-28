import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { ModalComponent } from "../components/ModalComponent";
import { EquipmentForm } from "../components/forms/EquipmentForm";
import { TableComponent } from "../components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { EquipmentModel } from "../model/EquipmentModel";
import { deleteEquipment } from "../slices/EquipmentSlice";

export function EquipmentPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null);

    const equipmentList = useSelector((state: any) => state.equipmentSlice.equipments);

    const dataSource = equipmentList.map((equipment: EquipmentModel, index: number) => ({
        key: index.toString(),
        equipmentId: equipment.equipmentId,
        equipmentName: equipment.equipmentName,
        equipmentType: equipment.equipmentType,
        equipmentStatus: equipment.equipmentStatus,
        //assignedStaff: equipment.equipmentAssignedStaff.join(", "),
        assignedField: equipment.equipmentAssignedField,
    }));

    const dispatch = useDispatch();

    const handleUpdate = (record: any) => {
        const equipment=equipmentList.find(eq => eq.equipmentId === record.equipmentId);
        setSelectedEquipment(equipment);
        setIsModalOpen(true);
    };

    const handleDelete = (record: any) => {
        const equipment=equipmentList.find(eq => eq.equipmentId === record.equipmentId);
        dispatch(deleteEquipment(equipment));
    };

    const columns = [
        { title: "Equipment ID", dataIndex: "equipmentId", key: "equipmentId" },
        { title: "Equipment Name", dataIndex: "equipmentName", key: "equipmentName" },
        { title: "Type", dataIndex: "equipmentType", key: "equipmentType" },
        { title: "Status", dataIndex: "equipmentStatus", key: "equipmentStatus" },
        { title: "Assigned Field", dataIndex: "assignedField", key: "assignedField" },
        {
            title: "Action",
            key: "update",
            render: (record: any) => (
                <button
                    onClick={() => handleUpdate(record)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    UPDATE
                </button>
            ),
        },
        {
            title: "Action",
            key: "delete",
            render: (record: any) => (
                <button
                    onClick={() => handleDelete(record)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    DELETE
                </button>
            ),
        },
    ];

    const handleAddButton = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-6" style={{ maxHeight: "calc(100vh - 100px)" }}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Equipment Management</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex-grow flex justify-center mb-4 sm:mb-0">
                    <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
                        <FaSearch className="text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search Equipment"
                            className="outline-none px-2 py-1 w-full"
                        />
                    </div>
                </div>

                <div className="ml-4 sm:ml-10">
                    <button
                        onClick={handleAddButton}
                        type="button"
                        className="flex items-center text-white bg-green-700 rounded-md px-4 py-2 hover:border-green-950 hover:bg-white hover:text-black"
                    >
                        Add New Equipment
                        <BiPlus className="ml-3" />
                    </button>
                </div>
            </div>

            <TableComponent dataSource={dataSource} columns={columns} />

            <ModalComponent
                title="Add/Edit Equipment"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <EquipmentForm
                    onSubmit={() => setIsModalOpen(false)}
                    initialData={selectedEquipment}
                />
            </ModalComponent>
        </div>
    );
}
