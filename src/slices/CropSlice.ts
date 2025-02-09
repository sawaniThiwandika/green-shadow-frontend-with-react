import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CropModel} from "../model/CropModel";
import axios from "axios";

const initialState = {
    crops: [] as CropModel[],
};

const api=axios.create({
    baseURL:'http://localhost:3000/crop',
});
export const saveCrop = createAsyncThunk('cropSlice/saveCrop', async (crop: CropModel) => {
    try {

        const formData = new FormData();
        formData.append("cropCode", crop.cropCode);
        formData.append("commonName", crop.commonName);
        formData.append("scientificName",crop.scientificName);
        formData.append("cropImage", crop.image);
        formData.append("category", crop.category);
        formData.append("season", crop.season);
        formData.append("fieldDetails", JSON.stringify(crop.fieldDetails)); // Convert to JSON string

        const response = await api.post('/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error saving crop:", error);
        throw error;
    }
});

export const updateExitingCrop=createAsyncThunk('cropSlice/updateExitingCrop',
    async (crop:CropModel)=>{
        try{
            const response=await api.put(`/update/${crop.cropCode}`,crop);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }

    });

export const deleteExitingCrop=createAsyncThunk('cropSlice/ deleteExitingCrop',
    async (cropCode:string)=>{
        try{
            const response=await api.delete(`/delete/${cropCode}`);
            return response.data;
        }
        catch(error){
            console.log(error);

        }

    });

export const getCrops=createAsyncThunk('cropSlice/getCrops',
    async ()=>{
        const response=await api.get('/getAll');
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
