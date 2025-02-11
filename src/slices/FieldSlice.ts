import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { FieldModel } from "../model/FieldModel";
import axios from "axios";

const initialState = {
    fields: [] as FieldModel[],
};
const api=axios.create({
    baseURL:'http://localhost:3000/field',
});
export const saveField = createAsyncThunk('fieldSlice/saveField', async (field: FieldModel) => {
    try {

        const formData = new FormData();
        formData.append("fieldCode", field.fieldCode);
        formData.append("fieldName", field.fieldName);
        formData.append("fieldLocation",field.fieldLocation);
        formData.append("fieldSize", field.fieldSize);
        formData.append("fieldImage1", field.fieldImage1);
        formData.append("crop",field.crop);
        formData.append("equipment",JSON.stringify( field.equipment));
        formData.append("staff", JSON.stringify(field.staff));

        const response = await api.post('/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error saving field:", error);
        throw error;
    }
});


export const getFields=createAsyncThunk('fieldSlice/getFields',
    async ()=>{
        const response=await api.get('/getAll');
        return response.data;

    }

);



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
    extraReducers:(builder) => {
        builder
            .addCase(saveField.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(saveField.fulfilled, (state, action) => {
                console.log("Fulfilled with data:", action.payload);
                state.fields.push(action.payload);
            })
            .addCase(saveField.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(getFields.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(getFields.fulfilled, (state, action) => {
                state.fields = action.payload;
            })
            .addCase(getFields.rejected, (state, action) => {
                console.log("Rejected");
            })
        /*.addCase(updateExitingField.pending,(state, action) => {
            console.log("Pending");
        })
        .addCase(updateExitingField.fulfilled, (state, action) => {
            console.log("fulfilled");
        })
        .addCase(updateExitingField.rejected, (state, action) => {
            console.log("Rejected");
        })


        .addCase(deleteExitingField.pending,(state, action) => {
            console.log("Pending");
        })
        .addCase(deleteExitingField.fulfilled, (state, action) => {
            console.log("fulfilled");
        })
        .addCase(deleteExitingField.rejected, (state, action) => {
            console.log("Rejected");
        })
        */





    }
});

export const { addField, updateField, deleteField } = fieldSlice.actions;
export default fieldSlice.reducer;
