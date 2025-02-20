import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { FieldModel } from "../model/FieldModel";
import api from "../service/api-services.ts";
import Swal from "sweetalert2";

const initialState = {
    fields: [] as FieldModel[],
};


export const saveField = createAsyncThunk('fieldSlice/saveField',
    async (field: FieldModel) => {
    try {

        const formData = new FormData();
        formData.append("fieldCode", field.fieldCode);
        formData.append("fieldName", field.fieldName);
        formData.append("fieldLocation",field.fieldLocation);
        formData.append("fieldSize", field.fieldSize);
        formData.append("fieldImage1", field.fieldImage1);
        formData.append("crop",field.cropCode);
        formData.append("equipment",JSON.stringify( field.equipment));
        formData.append("staff", JSON.stringify(field.staff));

        const response = await api.post('/field/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        Swal.fire({
            icon: "success",
            title: "Field Saved",
            text: "The field has been successfully added!",
            confirmButtonText: "OK"
        });
        return response.data;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
        });
        console.error("Error saving field:", error);
        throw error;
    }
});

export const deleteExitingField=createAsyncThunk('fieldSlice/ deleteExitingField',
    async (fieldCode:string)=>{
        try{
            const response=await api.delete(`/field/delete/${fieldCode}`);
            return response.data;
        }
        catch(error){
            console.log(error);

        }

    });

export const updateExitingField = createAsyncThunk('fieldSlice/updateField',
    async (field: FieldModel) => {

    try {
        const formData = new FormData();
        formData.append("fieldCode", field.fieldCode);
        formData.append("fieldName", field.fieldName);
        formData.append("fieldLocation",field.fieldLocation);
        formData.append("fieldSize", field.fieldSize);
        formData.append("fieldImage1", field.fieldImage1);
        formData.append("crop",field.cropCode);
        formData.append("equipment",JSON.stringify( field.equipment));
        formData.append("staff", JSON.stringify(field.staff));

        const response = await api.put(`/field/update/${field.fieldCode}`,  formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error updating field:", error);
        throw error;
    }
});

export const getFields=createAsyncThunk('fieldSlice/getFields',
    async ()=>{
        const response=await api.get('/field/getAll');
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
        .addCase(updateExitingField.pending,(state, action) => {
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




    }
});

export const { addField, updateField, deleteField } = fieldSlice.actions;
export default fieldSlice.reducer;
