import { createSlice } from "@reduxjs/toolkit";
import {LogModel} from "../model/LogModel";

const initialState = {
    logs: [] as LogModel[],
};

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
});

export const { addLog, updateLog, deleteLog } = logSlice.actions;
export default logSlice.reducer;
