import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaRegUserCircle } from "react-icons/fa";
import image from "../assets/green-rice-fields-in-the-rainy-season-beautiful-natural-scenery-photo.jpg"
import {useDispatch, useSelector} from "react-redux";
import {UserModel} from "../model/UserModel.ts";
import {addUser} from "../slices/UserSlice.ts";

export function LoginPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const users = useSelector((state: { user: { users: UserModel[] } }) => state.userSlice.users);

    const dispatch=useDispatch();
    const [isSignup, setIsSignup] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {

        if (userName && password) {
            const foundUser = users.find(user => user.userEmail === userName && user.userPassword === password);
            if (foundUser) {
                navigate("/mainPage");
            } else {
                alert("Invalid username or password!");
            }
        } else {
            alert("Please enter both email and password");
        }

    };

    const handleSignup = () => {

        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else if (!userName|| !password || !role) {
            alert("Please fill in all fields");
        } else {
            const user=new UserModel(userName,password,role);
            dispatch(addUser(user));
            setIsSignup(false);
            alert("Account created successfully!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl max-w-lg w-full animate-slideUp">
                <h2 className="text-3xl font-semibold mb-5 text-center text-green-800">{isSignup ? "Create Your Account" : "Welcome Back!"}</h2>


                {!isSignup ? (
                    <>
                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="email" className="block text-green-700 text-sm font-semibold flex items-center">
                                <FaEnvelope className="w-5 h-5 mr-2 text-green-700" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="password" className="block text-green-700 text-sm font-semibold flex items-center">
                                <FaLock className="w-5 h-5 mr-2 text-green-700" />
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                            />
                        </div>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                        >
                            Login
                        </button>
                        <p className="mt-5 text-center text-green-700 text-sm">
                            Don't have an account?{" "}
                            <span
                                onClick={() => setIsSignup(true)}
                                className="cursor-pointer hover:text-green-800"
                            >
                                Sign Up
                            </span>
                        </p>
                    </>
                ) : (

                    <>
                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="name" className="block text-green-700 text-xs font-semibold flex items-center">
                                <FaUser className="w-5 h-5 mr-2 text-green-700" />
                                Full Name
                            </label>
                            <input

                                type="text"
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="email" className="block text-green-700 text-xs font-semibold flex items-center">
                                <FaEnvelope className="w-5 h-5 mr-2 text-green-700" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="password" className="block text-green-700 text-xs font-semibold flex items-center">
                                <FaLock className="w-5 h-5 mr-2 text-green-700" />
                                Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                                placeholder="Create a password"
                            />
                        </div>
                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="confirmPassword" className="block text-green-700 text-xs font-semibold flex items-center">
                                <FaLock className="w-5 h-5 mr-2 text-green-700" />
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                                placeholder="Confirm your password"
                            />
                        </div>


                        <div className="mb-5 animate-fadeInUp">
                            <label htmlFor="role" className="block text-green-700 text-xs font-semibold flex items-center">
                                <FaRegUserCircle className="w-5 h-5 mr-2 text-green-700" />
                                Select Role
                            </label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-6 py-3 mt-2 border-2 border-green-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <button
                            onClick={handleSignup}
                            className="w-full bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                        <p className="mt-5 text-center text-green-700 text-xs">
                            Already have an account?{" "}
                            <span
                                onClick={() => setIsSignup(false)}
                                className="cursor-pointer hover:text-green-800"
                            >
                                Log In
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
