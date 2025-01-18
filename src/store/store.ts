import {configureStore} from "@reduxjs/toolkit"
import StaffSlice from "../slices/StaffSlice.ts"
import FieldSlice from "../slices/FieldSlice.ts";

export const store=configureStore({
    reducer: {
        staffSlice: StaffSlice,
        fieldSlice: FieldSlice,
    }
})