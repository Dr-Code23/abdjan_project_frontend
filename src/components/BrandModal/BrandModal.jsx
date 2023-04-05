import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./BrandModal.css";
import IconButton from "@mui/material/IconButton";
import img from "../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { OneBrandThunk } from "../../RTK/Thunk/OneBrandThunk";
import { UpDateBrand } from "../../RTK/Thunk/UpDateBrand";
import { AllBrandThunk } from "../../RTK/Thunk/AllBrandThunk";

const BrandModal = ({ open, setOpen, nameBrand, setNameBrand }) => {
    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const [images, setImages] = React.useState([{ data_url: img }]);
    let dispatch = useDispatch();
    let { t, i18n } = useTranslation();
    let { brandImg, nameBrand_fr, nameBrand_ar, nameBrand_en, currentPage } =
        useSelector((state) => state.BrandReducer);

    const [value, setValue] = React.useState(0);
    const [inputValue, setInputValue] = React.useState({
        input_en: "",
        input_ar: "",
        input_fr: "",
    });

    const [code, setCode] = useState(0);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    //handle input language
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (i18n.language === "en") {
            setValue(0);
        }
        if (i18n.language === "ar") {
            setValue(1);
        }
        if (i18n.language === "fr") {
            setValue(2);
        }
    }, [i18n.language]);
    // handle api
    useEffect(() => {
        if (nameBrand?.type === "update") {
            dispatch(OneBrandThunk({ id: nameBrand?.id }));
        }
    }, [nameBrand, dispatch]);
    useEffect(() => {
        if (nameBrand?.type === "update") {
            setImages([{ data_url: brandImg }]);
        } else {
            setImages([{ data_url: img }]);
        }
    }, [brandImg, nameBrand?.type]);
    useEffect(() => {
        if (nameBrand?.type === "update") {
            setInputValue({
                input_en: nameBrand_en,
                input_ar: nameBrand_ar,
                input_fr: nameBrand_fr,
            });
        } else {
            setInputValue({ input_en: "", input_ar: "", input_fr: "" });
        }
    }, [nameBrand?.type, nameBrand_fr, nameBrand_ar, nameBrand_en]);
    let handleSubmit = (e) => {
        e.preventDefault();
        if (nameBrand?.type === "update") {
            console.log(inputValue);

            dispatch(
                UpDateBrand({
                    id: nameBrand?.id,
                    ar: inputValue?.input_ar,
                    en: inputValue?.input_en,
                    fr: inputValue?.input_fr,
                })
            )
                .unwrap()
                .then((data) => {
                    // console.log(data);
                    dispatch(AllBrandThunk({ page: currentPage }));
                    setOpen(false);
                    setCode(0);
                })
                .catch((error) => {
                    console.log(error);
                    setCode(error.code);

                    // handle error here
                });
        }
    };
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="brand-modal">
                    <form
                        action=""
                        dir=""
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="content-all">
                            <IconButton
                                aria-label=""
                                onClick={() => {
                                    setOpen(false);
                                    setCode(0);
                                }}
                                className="close-modal"
                            >
                                <CloseIcon />
                            </IconButton>
                            <h5>{t("pages.BrandModal.New_Brand_Name")}</h5>
                            <>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={"1"}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <>
                                            {imageList.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="image-item  w-full"
                                                >
                                                    <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                                        {t(
                                                            "pages.BrandModal.Images"
                                                        )}
                                                    </h6>
                                                    <img
                                                        src={image["data_url"]}
                                                        className=" w-[200px] max-h-[280px] mx-[auto] rounded-[6px] sm:w-full cursor-pointer object-cover"
                                                        alt=""
                                                        {...dragProps}
                                                        style={
                                                            isDragging
                                                                ? {
                                                                      border: "4px dashed #1da231",
                                                                  }
                                                                : undefined
                                                        }
                                                        width="100"
                                                        onClick={() =>
                                                            onImageUpdate(index)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </ImageUploading>
                            </>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                centered
                                sx={{ mb: "20px" }}
                            >
                                <Tab label={t("Language.English")} />
                                <Tab label={t("Language.Arabic")} />
                                <Tab label={t("Language.French")} />
                            </Tabs>
                            <div
                                className=" w-full"
                                style={{
                                    display: value === 0 ? "block" : "none",
                                }}
                            >
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                    {t("pages.BrandModal.Name")}
                                </h6>

                                <input
                                    type="text"
                                    placeholder={t(
                                        "pages.BrandModal.placeholder"
                                    )}
                                    value={inputValue?.input_en}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_en: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div
                                className=" w-full"
                                style={{
                                    display: value === 1 ? "block" : "none",
                                }}
                            >
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                    {t("pages.BrandModal.Name")}
                                </h6>

                                <input
                                    type="text"
                                    placeholder={t(
                                        "pages.BrandModal.placeholder"
                                    )}
                                    value={inputValue?.input_ar}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_ar: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div
                                className=" w-full"
                                style={{
                                    display: value === 2 ? "block" : "none",
                                }}
                            >
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                    {t("pages.BrandModal.Name")}
                                </h6>

                                <input
                                    type="text"
                                    placeholder={t(
                                        "pages.BrandModal.placeholder"
                                    )}
                                    value={inputValue?.input_fr}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_fr: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <Button
                                className="submit !bg-primaryBg"
                                variant="contained"
                                type="submit"
                            >
                                {t("pages.BrandModal.Submit")}
                            </Button>
                            <h2
                                style={{
                                    display: code === 422 ? "block" : "none",
                                }}
                                className=" capitalize text-red-500 "
                            >
                                {t("code_error.The_Main_value_Must_be_entered")}
                            </h2>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default React.memo(BrandModal);
