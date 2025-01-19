import { createSlice } from "@reduxjs/toolkit";
import {EquipmentModel} from "../model/EquipmentModel";

const initialState = {
    equipments: [] as EquipmentModel[],
};

const EquipmentSlice = createSlice({
    name: "equipmentSlice",
    initialState,
    reducers: {
        addEquipment: (state, action) => {
            state.equipments.push(action.payload);
            console.log(action.payload.observedImage);

        },
        updateEquipment: (state, action) => {
            const index = state.equipments.findIndex(
                (equipment) => equipment.equipmentId === action.payload.equipmentId);
            if (index !== -1) {
                state.equipments[index] = action.payload;
            }
        },
        deleteEquipment: (state, action) => {
            state.equipments = state.equipments.filter(
                (equipment) => equipment.equipmentId!== action.payload.equipmentId
            );
        },
    },
});

export const { addEquipment, updateEquipment, deleteEquipment } = EquipmentSlice.actions;
export default EquipmentSlice.reducer;
