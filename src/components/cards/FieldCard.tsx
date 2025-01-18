import React from "react";

export function FieldCard({
                              fieldCode,
                              fieldName,
                              fieldLocation,
                              fieldSize,
                              fieldImage1,
                              crops,
                              staff,
                              onUpdate,
                              onDelete,
                          }: {
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: number;
    fieldImage1: string;
    crops: string[];
    staff: string[];
    onUpdate: (fieldCode: string) => void;
    onDelete: (fieldCode: string) => void;
}) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl">
            <img
                src={fieldImage1}
                alt={`${fieldName} Image`}
                className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold text-gray-800">{fieldName}</h4>
            <p className="text-sm text-gray-500">
                <strong>Location:</strong> {fieldLocation}
            </p>
            <p className="text-sm text-gray-500">
                <strong>Size:</strong> {fieldSize} sq.m
            </p>

            <div className="mt-2">
                <strong>Crops:</strong>
                <p className="text-sm text-gray-500">{crops.join(", ")}</p>
            </div>

            <div className="mt-2">
                <strong>Staff:</strong>
                <p className="text-sm text-gray-500">{staff.join(", ")}</p>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => onUpdate(fieldCode)}
                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(fieldCode)}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default FieldCard;
