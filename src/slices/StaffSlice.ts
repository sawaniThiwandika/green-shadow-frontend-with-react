import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { StaffModel } from "../model/StaffModel.ts";
import axios from "axios";
import {getVehicles} from "./VehicleSlice.ts";

const initialState = {
    staff: [] as StaffModel[],
};

const api=axios.create({
    baseURL:'http://localhost:3000/staff',
});

export const saveStaff=createAsyncThunk('staffSlice/saveStaff',
    async (staff:StaffModel)=>{
        try{
            const response=await api.post('/add',staff);
            return response.data;

        }
        catch(error){
            console.log(error);

        }

    });

export const getStaff=createAsyncThunk('staffSlice/getStaff',
    async ()=>{
        const response=await api.get('/getAll');
        return response.data;

    }

);
const staffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.staff.push(action.payload);
        },
          updateStaff: (state, action) => {
            const index = state.staff.findIndex(
                (staff) => staff.staffId === action.payload.staffId
            );
            if (index !== -1) {
                state.staff[index] = action.payload;
            }
        },
        deleteStaff: (state, action) => {
            state.staff = state.staff.filter(
                (staff) => staff.staffId !== action.payload.staffId
            );
        },
    },

    extraReducers:(builder) => {
        builder
            .addCase(saveStaff.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(saveStaff.fulfilled, (state, action) => {
                state.staff.push(action.payload);
            })
            .addCase(saveStaff.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(getStaff.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(getStaff.fulfilled, (state, action) => {
                state.staff = action.payload;
            })
            .addCase(getStaff.rejected, (state, action) => {
                console.log("Rejected");
            })


    }
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;
