import {configureStore} from "@reduxjs/toolkit"
import StaffSlice from "../slices/StaffSlice.ts"
import FieldSlice from "../slices/FieldSlice.ts";
import CropSlice from "../slices/CropSlice.ts";
import VehicleSlice from "../slices/VehicleSlice.ts";
import LogSlice from "../slices/LogSlice.ts";
import EquipmentSlice from "../slices/EquipmentSlice.ts";

export const store=configureStore({
    reducer: {
        staffSlice: StaffSlice,
        fieldSlice: FieldSlice,
        cropSlice:CropSlice,
        vehicleSlice:VehicleSlice,
        logSlice:LogSlice,
        equipmentSlice:EquipmentSlice,
    }
})