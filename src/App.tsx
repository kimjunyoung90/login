import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./css/style.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile"  element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
