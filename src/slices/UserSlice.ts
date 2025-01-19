import { createSlice } from "@reduxjs/toolkit";
import {UserModel} from "../model/UserModel";

const initialState = {
    users: [] as UserModel[],
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
            //console.log(action.payload.observedImage);

        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(
                (user) => user.userEmail === action.payload.userEmail);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.userEmail !== action.payload.userEmail
            );
        },
    },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
