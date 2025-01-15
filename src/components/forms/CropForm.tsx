import React from "react";

export function CropForm():any {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Crop Added Successfully!");
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cropCode" className="block text-sm font-medium text-gray-700">
                    Crop Code
                </label>
                <input
                    type="text"
                    id="cropCode"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter unique crop code"
                    required
                />
            </div>
            <div>
                <label htmlFor="commonName" className="block text-sm font-medium text-gray-700">
                    Common Name
                </label>
                <input
                    type="text"
                    id="commonName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter common name of the crop"
                    required
                />
            </div>
            <div>
                <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700">
                    Scientific Name
                </label>
                <input
                    type="text"
                    id="scientificName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter scientific name of the crop"
                    required
                />
            </div>
            <div>
                <label htmlFor="cropImage" className="block text-sm font-medium text-gray-700">
                    Crop Image URL
                </label>
                <input
                    type="file"
                    id="cropImage"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter category (e.g., Cereal)"
                    required
                />
            </div>
            <div>
                <label htmlFor="season" className="block text-sm font-medium text-gray-700">
                    Season
                </label>
                <input
                    type="text"
                    id="season"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter season of the crop"
                    required
                />
            </div>
            <div>
                <label htmlFor="fieldDetailsCrop" className="block text-sm font-medium text-gray-700">
                    Field Details
                </label>
                <input
                    type="search"
                    id="fieldDetailsCrop"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter field details"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                Add Crop
            </button>
        </form>
    );
}
