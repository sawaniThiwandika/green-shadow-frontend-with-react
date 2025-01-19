import React from "react";

export function TableComponent({ dataSource, columns, isLoading }) {
    if (isLoading) {
        return (
            <div className="text-center py-4">
                <span className="spinner-border text-gray-600">Loading...</span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse mt-6">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            className="px-4 py-2 text-left text-sm font-semibold text-gray-700 bg-green-100"
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dataSource.length > 0 ? (
                    dataSource.map((data, index) => {
                        const rowKey =
                            data.vehicleId || data.id || data.key || `row-${index}`;
                        return (
                            <tr
                                key={rowKey}
                                className="border-t even:bg-gray-50 hover:bg-green-50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        data-label={column.title}
                                        className="px-4 py-2 text-sm text-gray-600"
                                    >
                                        {column.render
                                            ? column.render(data)
                                            : data[column.dataIndex]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="px-4 py-4 text-center text-gray-500"
                        >
                            No data available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
