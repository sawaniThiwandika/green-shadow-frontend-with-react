import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { CropPage } from "./CropPage";
import { FieldPage } from "./FieldPage";
import { VehiclePage } from "./VehiclePage";
import { UserPage } from "./UserPage";
import { Navigation } from "../components/Naviagtions.tsx";
import {EquipmentPage} from "./EquipmentPage.tsx";
import {LogsPage} from "./LogsPage.tsx";
import {StaffPage} from "./StaffPage.tsx";


export function MainPage() {
    return (
        <div className="flex h-screen">

            <div className="bg-gray-200 ">
                <Navigation />
            </div>

            <main className="flex-1 p-1 bg-white">
                <Routes>
                    <Route path="/" element={<Navigate to="dashboard" />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cropPage" element={<CropPage />} />
                    <Route path="/fieldPage" element={<FieldPage />} />
                    <Route path="/staffPage" element={<StaffPage />} />
                    <Route path="/logsPage" element={<LogsPage />} />
                    <Route path="/vehiclePage" element={<VehiclePage />} />
                    <Route path="/equipmentPage" element={<EquipmentPage />} />
                    <Route path="/userPage" element={<UserPage />} />

                </Routes>
            </main>
        </div>
    );
}
