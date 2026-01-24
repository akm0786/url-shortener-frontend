import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const registerUser = createAsyncThunk("auth/registerUser", async (formData, { rejectWithValue }) => {

    try {
        const res = await api.post("/auth/signup", formData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data.message || "Register Failed");
    }
})

// Login

export const loginUser = createAsyncThunk("auth/loginUser", async (formData, { rejectWithValue }) => {

    try {
        const res = await api.post("/auth/login", formData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data.message || "Login Failed");
    }
})

// logout

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {

    try {
        const res = await api.get("/auth/logout");
        return true;
    } catch (err) {
        return rejectWithValue(err?.response?.data.message || "Logout Failed");
    }

})

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {

    try {
        const res = await api.get("/auth/me");
        return res.data.user;
    } catch (err) {
        return rejectWithValue(err?.response?.data.message || "Check Auth Failed");
    }
})


const initialState = {
    user: null,
    loading: true,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user || action.payload;
                localStorage.setItem("isAuthenticated", true);

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // login 
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;

                localStorage.setItem("isAuthenticated", true);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;

                localStorage.removeItem("isAuthenticated"); 
                console.log("logout done")
            })
            // check auth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload;

                localStorage.setItem("isAuthenticated", true);

            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                localStorage.removeItem("isAuthenticated");
            })
    }
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer