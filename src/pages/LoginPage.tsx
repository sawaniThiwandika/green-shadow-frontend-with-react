import { useNavigate } from "react-router-dom";  // Import useNavigate hook to navigate

export function LoginPage() {
    const navigate = useNavigate();  // Hook to navigate to the next page

    const handleLogin = () => {

            navigate("/mainPage");

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-200 hover:text-black"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
