import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { VehicleModel } from "../model/VehicleModel.ts";
import axios from "axios";

const initialState = {
    vehicles: [] as VehicleModel[],
};

const api=axios.create({
    baseURL:'http://localhost:3000/vehicle',
});
export const saveVehicle=createAsyncThunk('vehicleSlice/saveVehicle',
    async (vehicle:VehicleModel)=>{
        try{
            const response=await api.post('/add',vehicle);

            return response.data;


        }
        catch(error){
            console.log(error);

        }

    });

export const updateExitingVehicle=createAsyncThunk('vehicleSlice/updateExitingVehicle',
    async (vehicle:VehicleModel)=>{
    try{
        const response=await api.put(`/update/${vehicle.vehicleId}`,vehicle);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }

    });

export const getVehicles=createAsyncThunk('vehicleSlice/getVehicles',
    async ()=>{
        const response=await api.get('/getAll');
        //initialState.vehicles=response.data;
        return response.data;

    }

);
const vehicleSlice = createSlice({
    name: "vehicleSlice",
    initialState,
    reducers: {
        addVehicle: (state, action) => {
            state.vehicles.push(action.payload);
        },
        updateVehicle: (state, action) => {
            const index = state.vehicles.findIndex(
                (vehicle) => vehicle.vehicleId === action.payload.vehicleId
            );
            if (index !== -1) {
                state.vehicles[index] = action.payload;
            }
        },
        deleteVehicle: (state, action) => {
            state.vehicles = state.vehicles.filter(
                (vehicle) => vehicle.vehicleId !== action.payload.vehicleId
            );
        },

    },
    extraReducers:(builder) => {
        builder
            .addCase(saveVehicle.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(saveVehicle.fulfilled, (state, action) => {
                state.vehicles.push(action.payload);
            })
            .addCase(saveVehicle.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(getVehicles.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(getVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload;
            })
            .addCase(getVehicles.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(updateExitingVehicle.pending,(state, action) => {
                console.log("Pending");
            })
            .addCase(updateExitingVehicle.fulfilled, (state, action) => {
                console.log("fulfilled");
            })
            .addCase(updateExitingVehicle.rejected, (state, action) => {
                console.log("Rejected");
            })




    }


});

export const { addVehicle, updateVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
