import { createSlice } from "@reduxjs/toolkit";
import { StaffModel } from "../model/StaffModel.ts";

const initialState = {
    staff: [] as StaffModel[],
};

const staffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.staff.push(action.payload);
        },
          updateStaff: (state, action) => {
            const index = state.staff.findIndex(
                (staff) => staff.staffId === action.payload.staffId
            );
            if (index !== -1) {
                state.staff[index] = action.payload;
            }
        },
        deleteStaff: (state, action) => {
            state.staff = state.staff.filter(
                (staff) => staff.staffId !== action.payload.staffId
            );
        },
    },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;
