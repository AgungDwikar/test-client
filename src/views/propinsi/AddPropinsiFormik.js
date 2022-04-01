import React, { useEffect, useState } from "react";
import Page from "../../components/commons/Page";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiPropinsi from "../../api/apiPropinsi";

function AddPropinsiFormik(props) {
    let navigate = useNavigate();
    const [uploaded, setUploaded] = useState(false);
    const [previewImg, setPreviewImg] = useState();

    const validationSchema = Yup.object().shape({
        prop_key: Yup.string("Enter propinsi name").required(
            "propinsi name is required"
        ),
        prop_value: Yup.string("Enter propinsi value").required(
            "propinsi value is required"
        ),
    });

    const uploadOnChange = (name) => (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            formik.setFieldValue("prop_images", file);
            setPreviewImg(reader.result);
        };

        reader.readAsDataURL(file);
        setUploaded(true);
    };

    const onClearImage = (event) => {
        event.preventDefault();
        setUploaded(false);
        setPreviewImg(undefined);
    };

    const formik = useFormik({
        initialValues: {
            prop_key: "",
            prop_value: "",
            prop_url_image: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let payload = new FormData();
            payload.append("prop_key", values.prop_key);
            payload.append("prop_value", values.prop_value);
            payload.append("prop_images", values.prop_images);

            // post with axios
            apiPropinsi.addPropinsi(payload).then((response) => {
                toast.success(response.message);
            });
            navigate("/dashboard/propinsi", { state: { refresh: true } });
        },
    });

    return (
        <>
            <Page
                title="Add Propinsi"
                titleButton="Back"
                onClick={() => navigate(-1)}
            >
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-10 py-5 bg-white sm:p-6 ">
                                <div className="sm:flex-1 lg:grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="prop_key"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Propinsi Key
                                        </label>
                                        <input
                                            type="text"
                                            name="prop_key"
                                            id="prop_key"
                                            value={formik.values.prop_key}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoComplete="prop_key"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                        {formik.touched.prop_key &&
                                        formik.errors.prop_key ? (
                                            <span className="mt-2 text-sm text-red-600">
                                                {formik.errors.prop_key}
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className="col-span-6 row-start-2 sm:col-span-3">
                                        <label
                                            htmlFor="propinsi value"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Propinsi Value
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="prop_value"
                                                name="prop_value"
                                                value={formik.values.prop_value}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                rows={3}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="product description"
                                                defaultValue={""}
                                            />
                                            {formik.touched.prop_value &&
                                            formik.errors.prop_value ? (
                                                <span className="mt-2 text-sm text-red-600">
                                                    {formik.errors.prop_value}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="col-span-6 col-start-4 row-span-2 sm:col-span-1 lg:col-span-3  ">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Cover brand
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                {uploaded === false ? (
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <img
                                                            src={previewImg}
                                                            alt="images"
                                                            className="mx-auto h-48 w-48"
                                                        />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                for="image"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span
                                                                    className="ml-4"
                                                                    onClick={
                                                                        onClearImage
                                                                    }
                                                                >
                                                                    Remove
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="prop_url_image"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="prop_url_image"
                                                            accept="image/*"
                                                            name="prop_url_image"
                                                            type="file"
                                                            onChange={uploadOnChange(
                                                                "file"
                                                            )}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                        {formik.touched.prop_url_image &&
                                        formik.errors.prop_url_image ? (
                                            <span className="mt-2 text-sm text-red-600">
                                                {formik.errors.prop_url_image}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/dashboard/propinsi", {
                                            state: { refresh: true },
                                        })
                                    }
                                    className="inline-flex ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Page>
            <ToastContainer autoClose={2000} />
        </>
    );
}

export default AddPropinsiFormik;
