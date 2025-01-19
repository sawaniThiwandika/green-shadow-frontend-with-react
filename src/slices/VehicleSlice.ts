import { createSlice } from "@reduxjs/toolkit";
import { VehicleModel } from "../model/VehicleModel.ts";

const initialState = {
    vehicles: [] as VehicleModel[],
};

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
});

export const { addVehicle, updateVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
