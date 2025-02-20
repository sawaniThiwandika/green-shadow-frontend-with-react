import React from 'react';


export function ModalComponent({ title, isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500">
                        &times;
                    </button>

                </div>

                <div className="max-h-96 overflow-y-auto">
                    {children}
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}
