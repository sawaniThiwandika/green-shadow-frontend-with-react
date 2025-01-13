import React from 'react';

export function TableComponent({ dataSource, columns }) {
    return (
        <table className="min-w-full table-auto border-collapse shadow-md rounded-lg mt-10">
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
            {dataSource.map((data) => (
                <tr key={data.key} className="border-t hover:bg-green-50">
                    {columns.map((column) => (
                        <td
                            key={column.key}
                            className="px-4 py-2 text-sm text-gray-600"
                        >
                            {data[column.dataIndex]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
