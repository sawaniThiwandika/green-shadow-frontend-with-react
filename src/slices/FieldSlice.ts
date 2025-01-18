import { createSlice } from "@reduxjs/toolkit";
import { FieldModel } from "../model/FieldModel";

const initialState = {
    fields: [] as FieldModel[],
};

const fieldSlice = createSlice({
    name: "fieldSlice",
    initialState,
    reducers: {
        addField: (state, action) => {
            state.fields.push(action.payload);
            console.log("New Field  : "+action.payload.fieldImage1);
        },
        updateField: (state, action) => {
            const index = state.fields.findIndex(
                (field) => field.fieldCode === action.payload.fieldCode
            );
            if (index !== -1) {
                state.fields[index] = action.payload;
            }
        },
        deleteField: (state, action) => {
            state.fields = state.fields.filter(
                (field) => field.fieldCode !== action.payload.fieldCode
            );
        },
    },
});

export const { addField, updateField, deleteField } = fieldSlice.actions;
export default fieldSlice.reducer;
