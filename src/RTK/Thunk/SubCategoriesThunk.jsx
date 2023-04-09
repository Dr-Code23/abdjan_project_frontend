import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let SubCategoriesThunk = createAsyncThunk(
    "sub/SubCategoriesThunk",
    async (arg, ThunkApi) => {
        console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API}/sub_categories/${arg.id}?per_page=5&page=${arg.page}`,
                // `${process.env.REACT_APP_API}/sub_categories/${arg.id}?per_page=5&page=`,
                Api()
            );
            console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
