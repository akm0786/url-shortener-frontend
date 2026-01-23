import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// create short url
export const createShortUrl = createAsyncThunk("url/createShortUrl", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post("/api/urls", data);
        return res.data.data;
    }
    catch (err) {
        return rejectWithValue(err?.response?.data.message || "Create Short URL Operation Failed");
    }
})

// fetch user urls

export const fetchUrls = createAsyncThunk("urls/fetchUserUrls", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/api/urls");
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data.message || "Fetch User URLs Operation Failed");
    }
})

// delete url
export const deleteUrl = createAsyncThunk("url/delete", async (id, { rejectWithValue }) => {
    try {

        const res = await api.delete(`/api/urls/${id}`)
        return id;
    } catch (err) {
        return rejectWithValue(err?.response?.data.message || "Delete URL Operation Failed");
    }
})

const urlSlice = createSlice({
    name: "url",
    initialState: {
        loading: false,
        urls: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUrls.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUrls.fulfilled, (state, action) => {
                state.loading = false;
                state.urls = action.payload.data;
            })

            .addCase(createShortUrl.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(createShortUrl.fulfilled, (state, action) => {
                state.urls.unshift(action.payload);
            })

            .addCase(deleteUrl.fulfilled, (state, action) => {
                state.urls = state.urls.filter(url=> url._id !== action.payload)
            })

    }
})

export default urlSlice.reducer