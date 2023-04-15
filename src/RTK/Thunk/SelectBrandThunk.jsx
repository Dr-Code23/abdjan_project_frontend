import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let SelectBrandThunk = createAsyncThunk(
  "product/SelectBrandThunk",
  async (arg, ThunkApi) => {
    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API}/select_menu/brands`,
        Api()
      );
      // console.log(res.data);

      return res.data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
