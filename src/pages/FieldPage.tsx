import React from "react";
import FieldCard from "../components/cards/FieldCard";
import field from "../assets/field3.jpg";

const fields = [
    {
        fieldCode: "F003",
        fieldName: "Field C",
        fieldLocation: "West Region",
        fieldSize: 350,
        fieldImage1: field,
        crops: ["Corn", "Tomato"],
        staff: ["Alice", "Bob"],
        equipments: ["Sprayer", "Tractor"],
        logs: ["Planted corn", "Watered tomato plants"],
    },
    {
        fieldCode: "F004",
        fieldName: "Field D",
        fieldLocation: "East Region",
        fieldSize: 450,
        fieldImage1: field,
        crops: ["Corn", "Tomato"],
        staff: ["Charlie", "Dana"],
        equipments: ["Harvester", "Irrigator"],
        logs: ["Harvested corn", "Planted tomato seedlings"],
    }

];

export function FieldPage() {
    return (
        <div className="container mx-auto my-8">
            <h3 className="text-center text-xl font-semibold mb-6">Field Management</h3>
            <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto"
                id="fieldContainer"
                style={{ maxHeight: "calc(100vh - 100px)" }}
            >
                {fields.map((field) => (
                    <FieldCard
                        key={field.fieldCode}
                        fieldCode={field.fieldCode}
                        fieldName={field.fieldName}
                        fieldLocation={field.fieldLocation}
                        fieldSize={field.fieldSize}
                        fieldImage1={field.fieldImage1}
                        crops={field.crops}
                        staff={field.staff}
                        equipments={field.equipments}
                        logs={field.logs}
                    />
                ))}
            </div>
        </div>
    );
}

