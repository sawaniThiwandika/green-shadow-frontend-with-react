import {configureStore} from "@reduxjs/toolkit"
import StaffSlice from "../slices/StaffSlice.ts"

export const store=configureStore({
    reducer: {
        staffSlice: StaffSlice
    }
})