// Slice file - only state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi } from "./authService";

// async thunk
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {

    try {
        return await loginUserApi(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response.data?.message || "Login Falied");
    }

})

const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        // pending login 
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
    }
})


export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer