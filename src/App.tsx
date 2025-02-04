import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {CropPage} from "./pages/CropPage.tsx";
import {FieldPage} from "./pages/FieldPage.tsx";
import {LogsPage} from "./pages/LogsPage.tsx";
import {StaffPage} from "./pages/StaffPage.tsx";
import {VehiclePage} from "./pages/VehiclePage.tsx";
import {EquipmentPage} from "./pages/EquipmentPage.tsx";
import {UserPage} from "./pages/UserPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import LoginLayout from "./components/LoginLayout.tsx";

function App() {
    /*return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/mainPage/!*" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );*/
    const routes = createBrowserRouter([
        {
            path: "/", //Default
            element: <LoginLayout/>,
            children: [
                {path: "login", element: <LoginPage/>},
            ]
        },
        {
            path: "/app",
            element: <RootLayout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "cropPage", element: <CropPage /> },
                { path: "fieldPage", element: <FieldPage /> },
                { path: "logsPage", element: <LogsPage /> },
                { path: "staffPage", element: <StaffPage /> },
                { path: "vehiclePage", element: <VehiclePage /> },
                { path: "equipmentPage", element: <EquipmentPage /> },
                { path: "userPage", element: <UserPage /> },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={routes}/>
        </>
    )
}

export default App;
