import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export function SearchBarComponent({ onSearch ,placeHolder}) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchQuery("");
        onSearch("");
    };

    return (
        <div className="relative w-full md:w-1/3">
            <input
                type="text"
                placeholder={placeHolder}
                value={searchQuery}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            {searchQuery && (
                <FaTimes
                    className="absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
                    onClick={clearSearch}
                />
            )}
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
}
