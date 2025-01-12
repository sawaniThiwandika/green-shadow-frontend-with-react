import React, { useState } from "react";
import { Link } from "react-router-dom";
import {AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineBars, AiFillTool, AiOutlineClose} from "react-icons/ai";
import {GiField, GiHamburger} from "react-icons/gi";
import {BiLeaf, BiMenu, BiNote} from "react-icons/bi";
import { AiOutlineCar } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import logo from '../assets/logo.png';
import {BsPerson, BsTools} from "react-icons/bs";

export function Navigation() {
    const [collapsed] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex h-screen">

            {!isSidebarOpen && (
                <button
                    className="sm:hidden p-2 text-white bg-green-700 fixed top-4 left-4 z-50"
                    onClick={() => setSidebarOpen(true)}
                >
                    <BiMenu size={24} />
                </button>
            )}

            {isSidebarOpen && (
                <button
                    className="sm:hidden p-2 text-white bg-green-700 fixed top-4 left-4 z-50"
                    onClick={() => setSidebarOpen(false)}
                >
                    <AiOutlineClose size={24} />
                </button>
            )}

            <aside
                className={`fixed inset-y-0 left-0 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:relative sm:translate-x-0 bg-green-700 text-white ${
                    collapsed ? "w-20" : "w-64"
                } h-screen transition-transform duration-300`}>
                <div className="flex items-center justify-between p-4 bg-green-100">
                    <div className="flex justify-center w-full">
                        <img src={logo} alt="Logo" className={`w-20 mr-2 ${collapsed ? "hidden" : ""}`}/>
                    </div>
                </div>


                <nav className="mt-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/mainPage/dashboard"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <AiOutlineBars className="mr-3 text-xl"/>
                                {!collapsed && <span>Dashboard</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/cropPage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <BiLeaf className="mr-3 text-xl"/>
                                {!collapsed && <span>Crops</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/fieldPage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <GiField className="mr-3 text-xl"/>
                                {!collapsed && <span>Fields</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/staffPage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <BsPerson className="mr-3 text-xl"/>
                                {!collapsed && <span>Staff</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/logsPage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <BiNote className="mr-3 text-xl"/>
                                {!collapsed && <span>Logs</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/equipmentPage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <AiFillTool className="mr-3 text-xl"/>
                                {!collapsed && <span>Equipment</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/vehiclePage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <AiOutlineCar className="mr-3 text-xl"/>
                                {!collapsed && <span>Vehicles</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/mainPage/userPage"
                                  className="flex items-center px-4 py-2 hover:bg-green-100 hover:text-black rounded-md">
                                <AiOutlineUser className="mr-3 text-xl"/>
                                {!collapsed && <span>Users</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
