import React, {useEffect, useState} from "react";
import { StaffModel } from "../../model/StaffModel";
import { useDispatch } from "react-redux";
import {addStaff, updateStaff} from "../../slices/StaffSlice.ts";

export function StaffFormComponent({ onSubmit, initialData }) {
    const dispatch = useDispatch();

    const [staffId, setStaffId] = useState(initialData?.staffId || "");
    const [firstName, setFirstName] = useState(initialData?.firstName || "");
    const [lastName, setLastName] = useState(initialData?.lastName || "");
    const [address, setAddress] = useState(initialData?.address || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [contact, setContact] = useState(initialData?.contact || "");
    const [designation, setDesignation] = useState(initialData?.designation || "");
    const [gender, setGender] = useState(initialData?.gender || "");

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
        }
    }, [initialData]);

    function handleSubmit() {

        const staffData = new StaffModel(
            staffId,
            firstName,
            lastName,
            address,
            designation,
            gender,
            contact,
            email
        );

        if (staffId && staffId === initialData?.staffId) {

            dispatch(updateStaff(staffData));
            console.log("Update staff: ", staffData);

        } else {

            dispatch(addStaff(staffData));
            console.log("Add new:  ", staffData);
        }

        if (onSubmit) onSubmit(staffData);
    }

    return (
        <form onSubmit={(e) => {e.preventDefault();handleSubmit();if (onSubmit) onSubmit(e);
        }}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Staff ID</label>
                <input
                    type="text"
                    name="staffId"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                    type="text"
                    name="fname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                    type="text"
                    name="lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Designation</label>
                <input
                    type="text"
                    name="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Gender</label>
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
                <label className="block text-gray-700 mb-1">Contact No.</label>
                <input
                    type="text"
                    name="contactNo"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
