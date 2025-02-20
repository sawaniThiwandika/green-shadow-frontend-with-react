import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CropModel} from "../model/CropModel";
import api from "../service/api-services.ts";
import Swal from "sweetalert2";

const initialState = {
    crops: [] as CropModel[],
};


export const saveCrop = createAsyncThunk('cropSlice/saveCrop', async (crop: CropModel) => {
    try {

        const formData = new FormData();
        formData.append("cropCode", crop.cropCode);
        formData.append("commonName", crop.commonName);
        formData.append("scientificName",crop.scientificName);
        formData.append("cropImage", crop.image);
        formData.append("category", crop.category);
        formData.append("season", crop.season);
        formData.append("fieldDetails", JSON.stringify(crop.fieldDetails));
        const response = await api.post('/crop/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        Swal.fire({
            icon: "success",
            title: "Crop Saved",
            text: "The Crop has been successfully added!",
            confirmButtonText: "OK"
        });
        return response.data;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
        });
        console.error("Error saving crop:", error);
        throw error;
    }
});

export const updateExitingCrop=createAsyncThunk('cropSlice/updateExitingCrop',
    async (crop:CropModel)=>{
        try{
            const formData = new FormData();
            formData.append("cropCode", crop.cropCode);
            formData.append("commonName", crop.commonName);
            formData.append("scientificName",crop.scientificName);
            formData.append("cropImage", crop.image);
            formData.append("category", crop.category);
            formData.append("season", crop.season);
            formData.append("fieldDetails", JSON.stringify(crop.fieldDetails));

            const response = await api.put(`/crop/update/${crop.cropCode}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                icon: "success",
                title: "Crop Updated",
                text: "The Crop has been successfully updated!",
                confirmButtonText: "OK"
            });
            return response.data;


        }
        catch (error) {
            console.log(error);
        }

    });

export const deleteExitingCrop=createAsyncThunk('cropSlice/ deleteExitingCrop',
    async (cropCode:string)=>{
        try{
            const response=await api.delete(`/crop/delete/${cropCode}`);
            Swal.fire({
                icon: "success",
                title: "Crop Deleted",
                text: "The Crop has been successfully deleted!",
                confirmButtonText: "OK"
            });
            return response.data;
        }
        catch(error){
            console.log(error);

        }

    });

export const getCrops=createAsyncThunk('cropSlice/getCrops',
    async ()=>{
        const response=await api.get('/crop/getAll',);
        return response.data;

    }

);





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
    extraReducers:(builder) => {
        builder
            .addCase(saveCrop.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(saveCrop.fulfilled, (state, action) => {
                console.log("Fulfilled with data:", action.payload);
                state.crops.push(action.payload);
            })
            .addCase(saveCrop.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(getCrops.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(getCrops.fulfilled, (state, action) => {
                state.crops = action.payload;
            })
            .addCase(getCrops.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(updateExitingCrop.pending,(state, action) => {
                console.log("Pending");
            })
            .addCase(updateExitingCrop.fulfilled, (state, action) => {
                console.log("fulfilled");
            })
            .addCase(updateExitingCrop.rejected, (state, action) => {
                console.log("Rejected");
            })
            .addCase(deleteExitingCrop.pending,(state, action) => {
                console.log("Pending");
            })
            .addCase(deleteExitingCrop.fulfilled, (state, action) => {
                console.log("fulfilled");
            })
            .addCase(deleteExitingCrop.rejected, (state, action) => {
                console.log("Rejected");
            })




    }

});

export const { addCrop, updateCrop, deleteCrop } = cropSlice.actions;
export default cropSlice.reducer;
