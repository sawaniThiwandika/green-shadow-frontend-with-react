import { createSlice } from "@reduxjs/toolkit";
import {CropModel} from "../model/CropModel";

const initialState = {
    crops: [] as CropModel[],
};

const cropSlice = createSlice({
    name: "cropSlice",
    initialState,
    reducers: {
        addCrop: (state, action) => {
            state.crops.push(action.payload);
            console.log("New crop  : "+action.payload.image);
        },
        updateCrop: (state, action) => {
            const index = state.crops.findIndex(
                (crop) => crop.cropCode === action.payload.cropCode
            );
            if (index !== -1) {
                state.crops[index] = action.payload;
            }
        },
        deleteCrop: (state, action) => {
            state.crops = state.crops.filter(
                (crop) => crop.cropCode !== action.payload.cropCode
            );
        },
    },
});

export const { addCrop, updateCrop, deleteCrop } = cropSlice.actions;
export default cropSlice.reducer;
