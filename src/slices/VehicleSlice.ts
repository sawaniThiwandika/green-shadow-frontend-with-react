import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { VehicleModel } from "../model/VehicleModel.ts";
import api from "../service/api-services.ts";
import Swal from "sweetalert2";

const initialState = {
    vehicles: [] as VehicleModel[],
};


export const saveVehicle=createAsyncThunk('vehicleSlice/saveVehicle',
    async (vehicle:VehicleModel)=>{
        try{
            const response=await api.post('/vehicle/add',vehicle);
            Swal.fire({
                icon: "success",
                title: "Vehicle Saved",
                text: "The Vehicle has been successfully added!",
                confirmButtonText: "OK"
            });
            return response.data;

        }
        catch(error){

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
            console.log(error);

        }

    });

export const updateExitingVehicle=createAsyncThunk('vehicleSlice/updateExitingVehicle',
    async (vehicle:VehicleModel)=>{
    try{
        const response=await api.put(`/vehicle/update/${vehicle.vehicleId}`,vehicle);
        Swal.fire({
            icon: "success",
            title: "Vehicle updated",
            text: "The Vehicle has been successfully added!",
            confirmButtonText: "OK"
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }

    });

export const deleteExitingVehicle=createAsyncThunk('staffSlice/ deleteExitingVehicle',
    async (vehicleId:string)=>{
        try{
            const response=await api.delete(`/vehicle/delete/${vehicleId}`);
            Swal.fire({
                icon: "success",
                title: "Vehicle Deleted",
                text: "The Vehicle has been successfully deleted!",
                confirmButtonText: "OK"
            });
            return response.data;
        }
        catch(error){
            console.log(error);

        }

    });

export const getVehicles=createAsyncThunk('vehicleSlice/getVehicles',
    async ()=>{
        const response=await api.get('/vehicle/getAll');
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
            .addCase(deleteExitingVehicle.pending,(state, action) => {
                console.log("Pending");
            })
            .addCase(deleteExitingVehicle.fulfilled, (state, action) => {
                console.log("fulfilled");
            })
            .addCase(deleteExitingVehicle.rejected, (state, action) => {
                console.log("Rejected");
            })

    }


});

export const { addVehicle, updateVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
