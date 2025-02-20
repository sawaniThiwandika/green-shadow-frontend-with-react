import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserModel} from "../model/UserModel";
import {api} from "../service/api-services.ts";


const initialState = {
    users: [] as UserModel[],
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
}


export const register = createAsyncThunk(
    "userSlice/register",
    async (user: UserModel) => {
        try {
            const response = await api.post("/auth/register",
                { user}, { withCredentials: true }
            )
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const login = createAsyncThunk(
    "userSlice/login",
    async (user: UserModel, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", { user }, { withCredentials: true });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed";
            return rejectWithValue(errorMessage);
        }
    }
);


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);

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
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state, action) => {

            })
            .addCase(register.fulfilled, (state, action) => {
                console.log("User Registered Successfully")
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string
            })
        builder
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string
                state.isAuthenticated = false
            })
            .addCase(login.fulfilled, (state, action: any) => {
                state.jwt_token = action.payload.accessToken
                state.refresh_token = action.payload.refreshToken
                state.isAuthenticated = true
                localStorage.setItem("jwt_token", action.payload.accessToken)
                localStorage.setItem("refresh_token", action.payload.refreshToken)
            })
            .addCase(login.pending, (state, action) => {
                state.isAuthenticated = false
            })
    }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
