

export function CropCard({
                             cropCode,
                             commonName,
                             scientificName,
                             image,
                             category,
                             season,
                             fieldDetails,
                             onUpdate,
                             onDelete,
                         }: {
    cropCode: string;
    commonName: string;
    scientificName: string;
    image: string;
    category: string;
    season: string;
    fieldDetails: string[];
    onUpdate: (cropCode: string) => void;
    onDelete: (cropCode: string) => void;

}) {
    return (


        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl">

            <img
                src={`http://localhost:3000/uploads/crop/${image}`}
                alt={`${commonName} Image`}
                className="w-full h-32 object-cover rounded-lg mb-4"
            />


            <h4 className="text-lg font-semibold text-gray-800">{commonName}</h4>
            <p className="text-sm text-gray-500 italic">{scientificName}</p>
            <p className="text-sm text-gray-500">
                <strong>Category:</strong> {category}
            </p>
            <p className="text-sm text-gray-500">
                <strong>Season:</strong> {season}
            </p>
            <p className="text-sm text-gray-500">
                <strong>Field:</strong> {fieldDetails}
            </p>


            <div className="flex justify-between mt-4">
                <button
                    onClick={() => onUpdate(cropCode)}
                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ease-in-out duration-200"
                    aria-label={`Update ${commonName}`}
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(cropCode)}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition ease-in-out duration-200"
                    aria-label={`Delete ${commonName}`}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
