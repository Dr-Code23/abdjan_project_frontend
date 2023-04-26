import { createSlice } from "@reduxjs/toolkit";

import { OneSettingThunk } from "../Thunk/OneSettingThunk";
import { UpdateSettingThunk } from "../Thunk/UpdateSettingThunk";

let initState = {
    code: null,
    settingData: {},
    settingImg: "",
    nameError: null,
    emailError: null,
    passwordError: null,
    role_idError: null,
    error_phones: null,
    error_facebook: null,
    error_instagram: null,
    error_youtube: null,
    error_whatsapp: null,
    error_address: null,
    error_email: null,
    avatarError: null,
};

let SettingReducer = createSlice({
    name: "setting",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            if (action.payload.type === "ph") {
                state.error_phones = null;
            }
            if (action.payload.type === "fa") {
                state.error_facebook = null;
            }
            if (action.payload.type === "in") {
                state.error_instagram = null;
            }
            if (action.payload.type === "yo") {
                state.error_youtube = null;
            }
            if (action.payload.type === "wh") {
                state.error_whatsapp = null;
            }
            if (action.payload.type === "ad") {
                state.error_address = null;
            }
            if (action.payload.type === "em") {
                state.error_email = null;
            }
            if (action.payload.type === "img") {
                state.avatarError = null;
            }

            if (action.payload.type === "all") {
                state.settingData = {};
                state.error_address = null;
                state.settingImg = "";
                state.error_whatsapp = null;
                state.error_youtube = null;
                state.error_instagram = null;
                state.error_facebook = null;
                state.error_phones = null;
                state.error_email = null;
                state.avatarError = null;
            }
        },
    },

    extraReducers: (builder) => {
        builder

            // =======OneUserThunk===========
            .addCase(OneSettingThunk.fulfilled, (state, action) => {
                state.settingData = action.payload?.data;
                state.settingImg = action.payload?.data?.logo;
            })
            .addCase(OneSettingThunk.rejected, (state, action) => {})

            // =======UpdateSettingThunk===========
            .addCase(UpdateSettingThunk.fulfilled, (state, action) => {})
            .addCase(UpdateSettingThunk.rejected, (state, action) => {
                state.error_phones = action.payload?.data?.phones;
                state.error_facebook = action.payload?.data?.facebook;
                state.error_instagram = action.payload?.data?.instagram;
                state.error_youtube = action.payload?.data?.youtube;
                state.error_whatsapp = action.payload?.data?.whatsapp;
                state.error_address = action.payload?.data?.address;
                state.error_email = action.payload?.data?.email;
                state.avatarError = action.payload?.data?.logo;
            });
    },
});

export default SettingReducer.reducer;

export let { closeModal, closeError } = SettingReducer.actions;
