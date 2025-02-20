import React, {useEffect, useState} from 'react';
import { BiPlus } from 'react-icons/bi';
import { ModalComponent } from '../components/ModalComponent';
import { LogFormComponent } from '../components/forms/LogFormComponent';
import { TableComponent } from '../components/TableComponent';
import {useDispatch, useSelector} from "react-redux";
import {LogModel} from "../model/LogModel.ts";
import {deleteLog, getLogs} from "../slices/LogSlice.ts";
import {SearchBarComponent} from "../components/SearchBarComponent.tsx";

export function LogsPage(){
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedLog,setSelectedLog]=useState(null);
    const logList=useSelector((state: any) => state.logSlice.logs);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const dispatch=useDispatch();

    useEffect(() => {
        if (logList.length === 0){
            dispatch(getLogs());
        }

    });



    const dataSource = logList.map((log: LogModel, index: number) => ({

    key: index.toString(),
        logCode: log.logCode,
        date: log.logDate,
        activity: log.logDetails,
        image:log.observedImage,
      // responsibleStaff: log.relevantStaff.map((staff: any) => staff).join(', '),


    }));

    const filteredLogs = dataSource.filter((log: LogModel) => {
        return log.logCode.toLowerCase().includes(searchQuery.toLowerCase())

    });
    function handleUpdate(record: any) {
        const log = logList.find(log => log.logCode === record.logCode);
        setSelectedLog(log);
        setIsModalOpen(true);
    }

    function handleDelete(record: any) {
        console.log(record.logInfo);
        const log = logList.find(log => log.logCode === record.logCode);
        dispatch(deleteLog(log));
    }

    const columns = [
        { title: 'Log ID', dataIndex: 'logCode', key: 'logCode' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Activity', dataIndex: 'activity', key: 'activity' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => {
                console.log("Image: "+image);
                if (image) {
                    return <img src={image} alt="Log" style={{ width: '50px', height: '50px' }} />;
                }
                return <span>No Image</span>;
            },
        },
        { title: 'Responsible Staff', dataIndex: 'responsibleStaff', key: 'responsibleStaff' },
        {
            title: "Action",
            key: "update",
            render: (record:any) => (
                <button
                    onClick={()=>handleUpdate(record)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    UPDATE
                </button>
            ),
        },
        {
            title: "Action",
            key: "delete",
            render: (record:any) => (

                <button
                    onClick={()=>handleDelete(record)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    DELETE
                </button>
            ),
        },
    ];

    const handleAddButton = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-6"    style={{ maxHeight: "calc(100vh - 100px)" }}>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-3">Logs Management</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex-grow flex justify-center mb-4 sm:mb-0">

                    <SearchBarComponent placeHolder={"Search Log..."} onSearch={setSearchQuery}/>
                </div>

                <div className="ml-4 sm:ml-10">
                    <button
                        onClick={handleAddButton}
                        type="button"
                        className="flex items-center text-white bg-green-700 rounded-md px-4 py-2 hover:border-green-950 hover:bg-white hover:text-black"
                    >
                        Add New Log
                        <BiPlus className="ml-3" />
                    </button>
                </div>
            </div>

            <TableComponent dataSource={filteredLogs} columns={columns} />

            <ModalComponent
                title="Add New Log"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <LogFormComponent onSubmit={() => setIsModalOpen(false) } initialData={selectedLog} />
            </ModalComponent>
        </div>
    );
}
