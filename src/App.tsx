import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";  // Import LoginPage
import { MainPage } from "./pages/MainPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/mainPage/*" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default App;
