import {createSlice} from "@reduxjs/toolkit"
import {StaffModel} from "../model/StaffModel.ts";

const initialState = {
    staff: [] as StaffModel[],
};

const StaffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            console.log(action.payload);
            state.staff.push(action.payload);

        },
    },
});

export const { addStaff } = StaffSlice.actions;
export default StaffSlice.reducer;