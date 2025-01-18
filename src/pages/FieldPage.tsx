import React, { useState } from "react";
import FieldCard from "../components/cards/FieldCard";
import { FieldForm } from "../components/forms/FieldForm";
import { ModalComponent } from "../components/ModalComponent";
import {useDispatch, useSelector} from "react-redux";
import {FieldModel} from "../model/FieldModel.ts";
import {deleteField} from "../slices/FieldSlice.ts";

export function FieldPage() {


    const fieldList = useSelector((state: any) => state.fieldSlice.fields);
    const dispatch=useDispatch();
    const [selectedField, setSelectedField] = useState(null);

    const dataSource = fieldList.map((field: FieldModel, index: number) => ({
        key: index.toString(),
        fieldCode: field.fieldCode,
        fieldName: field.fieldName,
        fieldImage1:field.fieldImage1,
        fieldLocation: field.fieldLocation,
        fieldSize: field.fieldSize,
        crops: field.crops,
        staff: field.staff
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddField = () => {
        setIsModalOpen(false);
        setSelectedField(null);
    };
    const handleUpdateField = (field: FieldModel) => {
        console.log("Update : "+field.fieldCode);
        setSelectedField(field);
        setIsModalOpen(true);

    };

    const handleDeleteField = (field: FieldModel) => {
       dispatch(deleteField(field));

    };
    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-center text-xl font-semibold">Field Management</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Field
                </button>
            </div>
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
