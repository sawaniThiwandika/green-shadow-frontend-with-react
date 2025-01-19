import React, { useState } from "react";
import FieldCard from "../components/cards/FieldCard";
import { FieldForm } from "../components/forms/FieldForm";
import { ModalComponent } from "../components/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { FieldModel } from "../model/FieldModel.ts";
import { deleteField } from "../slices/FieldSlice.ts";
import { FaSearch } from "react-icons/fa";

export function FieldPage() {
    const fieldList = useSelector((state: any) => state.fieldSlice.fields);
    const dispatch = useDispatch();
    const [selectedField, setSelectedField] = useState<FieldModel | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const dataSource = fieldList
        .map((field: FieldModel, index: number) => ({
            key: index.toString(),
            fieldCode: field.fieldCode,
            fieldName: field.fieldName,
            fieldImage1: field.fieldImage1,
            fieldLocation: field.fieldLocation,
            fieldSize: field.fieldSize,
            crops: field.crops,
            staff: field.staff,
        }))
        .filter((field:FieldModel) =>
            field.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            field.fieldLocation.toLowerCase().includes(searchQuery.toLowerCase())

        );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddField = () => {
        setIsModalOpen(false);
        setSelectedField(null);
    };

    const handleUpdateField = (field: FieldModel) => {
        console.log("Update : " + field.fieldCode);
        setSelectedField(field);
        setIsModalOpen(true);
    };

    const handleDeleteField = (field: FieldModel) => {
        dispatch(deleteField(field));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="pl-8 text-center text-xl font-semibold">Field Management</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Field
                </button>
            </div>


            <div className="mb-4 pl-8 flex justify-between items-center">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by Name, Location, or Crops"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>

            {/* Fields Grid */}
            <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto"
                id="fieldContainer"
                style={{ maxHeight: "calc(100vh - 100px)" }}
            >
                {dataSource.map((field) => (
                    <FieldCard
                        key={field.fieldCode}
                        fieldCode={field.fieldCode}
                        fieldName={field.fieldName}
                        fieldLocation={field.fieldLocation}
                        fieldSize={field.fieldSize}
                        fieldImage1={field.fieldImage1}
                        crops={field.crops}
                        staff={field.staff}
                        onUpdate={() => handleUpdateField(field)}
                        onDelete={() => handleDeleteField(field)}
                    />
                ))}
            </div>

            {/* Modal */}
            <ModalComponent
                title="Add New Field"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <FieldForm onSubmit={handleAddField} initialData={selectedField} />
            </ModalComponent>
        </div>
    );
}
