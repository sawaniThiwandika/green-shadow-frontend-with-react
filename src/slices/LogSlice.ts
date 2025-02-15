import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LogModel} from "../model/LogModel";
import axios from "axios";

const initialState = {
    logs: [] as LogModel[],
};
const api=axios.create({
    baseURL:'http://localhost:3000/log',
});

export const saveLog = createAsyncThunk('logSlice/saveLog',
    async (log :LogModel) => {
        try {

            const formData = new FormData();
            formData.append("logCode", log.logCode);
            formData.append("logDate", log.logDate);
            formData.append("logDetails",log.logDetails);
            formData.append("relevantCrops", log.relevantCrops);
            formData.append("relevantFields", log.relevantFields);
            formData.append("observedImage",log.observedImage);
            formData.append("relevantStaff", JSON.stringify(log.relevantStaff));

            const response = await api.post('/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;

        } catch (error) {
            console.error("Error saving log:", error);
            throw error;
        }
    });



const logSlice = createSlice({
    name: "logSlice",
    initialState,
    reducers: {
        addLog: (state, action) => {
            state.logs.push(action.payload);
            console.log(action.payload.observedImage);

        },
        updateLog: (state, action) => {
            const index = state.logs.findIndex(
                (log) => log.logCode === action.payload.logCode);
            if (index !== -1) {
                state.logs[index] = action.payload;
            }
        },
        deleteLog: (state, action) => {
            state.logs = state.logs.filter(
                (log) => log.logCode !== action.payload.logCode
            );
        },
    },
    extraReducers:(builder) => {
        builder
            .addCase(saveLog.pending, (state, action) => {
                console.log("Pending");
            })

            .addCase(saveLog.fulfilled, (state, action) => {
                console.log("Fulfilled with data:", action.payload);
                state.logs.push(action.payload);
            })
            .addCase(saveLog.rejected, (state, action) => {
                console.log("Rejected");
            })

    }

});

export const { addLog, updateLog, deleteLog } = logSlice.actions;
export default logSlice.reducer;
