import React, {useEffect, useState} from "react";
import { StaffModel } from "../../model/StaffModel";
import {useDispatch, useSelector} from "react-redux";
import {addStaff, saveStaff, updateExitingStaff, updateStaff} from "../../slices/StaffSlice.ts";
import {Button, Input} from "antd";
import {LabelComponent} from "../LabelComponent.tsx";
import Swal from "sweetalert2";

export function StaffFormComponent({ onSubmit, initialData }) {
    const dispatch = useDispatch();

    const fieldList = useSelector((state: any) => state.fieldSlice.fields);
    const vehicleList=useSelector((state:any)=>state.vehicleSlice.vehicles);

    const [staffId, setStaffId] = useState(initialData?.staffId || "");
    const [firstName, setFirstName] = useState(initialData?.firstName || "");
    const [lastName, setLastName] = useState(initialData?.lastName || "");
    const [address, setAddress] = useState(initialData?.address || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [contact, setContact] = useState(initialData?.contact || "");
    const [designation, setDesignation] = useState(initialData?.designation || "");
    const [gender, setGender] = useState(initialData?.gender || "");
    const [assignedField, setAssignedField] = useState(initialData?.field || "");
    const [assignedVehicle,setAssignedVehicle] = useState(initialData?.vehicle || "");

    useEffect(() => {
        if (initialData) {
            setStaffId(initialData.staffId || "");
            setFirstName(initialData.firstName || "");
            setLastName(initialData.lastName || "");
            setAddress(initialData.address || "");
            setEmail(initialData.email || "");
            setContact(initialData.contact || "");
            setDesignation(initialData.designation || "");
            setGender(initialData.gender || "");
            setAssignedField(initialData.field || "");
            setAssignedVehicle(initialData.vehicle || "");
        }
    }, [initialData]);

    function handleSubmit() {

        if (!staffId || !firstName || !lastName || !address|| !designation || !gender || !contact || !email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Empty fields!",
                color:"green"

            });
            return;
        }

        const staffData = new StaffModel(
            staffId,
            firstName,
            lastName,
            address,
            designation,
            gender,
            contact,
            email,
            assignedField,
            assignedVehicle
        );

        if (staffId && staffId === initialData?.staffId) {

            dispatch(updateExitingStaff(staffData));
            console.log("Update staff: ", staffData);

        } else {

            dispatch(saveStaff(staffData));
            console.log("Add new:  ", staffData);
        }

        if (onSubmit) onSubmit(staffData);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            if (onSubmit) onSubmit(e);
        }}>
            <div className="mb-4">

                <LabelComponent htmlFor={"staffId"} text={"Staff ID"}/>
                <Input
                    type="text"
                    name="staffId"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <LabelComponent htmlFor={"fName"} text={"FirstName"}/>

                <Input
                    type="text"
                    name="fname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"lName"} text={"Last Name"}/>
                <Input
                    type="text"
                    name="lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"address"} text={"Address"}/>
                <Input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"designation"} text={"Designation"}/>
                <Input
                    type="text"
                    name="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"gender"} text={"Gender"}/>
                <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"contactNo"} text={"Contact No"}/>
                <Input
                    type="text"
                    name="contactNo"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"email"} text={"Email"}/>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"assignedField"} text={"Assigned Field"}/>
                <select
                    name="assignedField"
                    value={assignedField}
                    onChange={(e) => setAssignedField(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                >
                    <option value="">Select Field</option>
                    {fieldList.map((field) => (
                        <option key={field.fieldCode} value={field.fieldCode}>
                            {field.fieldName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">

                <LabelComponent htmlFor={"assignedVehicle"} text={"Assigned Vehicle"}/>
                <select
                    name="assignedVehicle"
                    value={assignedVehicle}
                    onChange={(e) => setAssignedVehicle(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                >
                    <option value="">Select Vehicle</option>
                    {vehicleList.map((vehicle) => (
                        <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                            {vehicle.vehicleId}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end">
                <Button
                    type="primary"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>


        </form>
    );
}
