import React from "react";
import { useRoutes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import MainLayout from "./layout/MainLayout";
import AddPropinsiFormik from "./views/propinsi/AddPropinsiFormik";
import Propinsi from "./views/propinsi/Propinsi";

export default function Routes() {
    return useRoutes([
        { path: "/", element: <MainLayout /> },
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "propinsi", element: <Propinsi /> },
                { path: "propinsi/new", element: <AddPropinsiFormik /> },
            ],
        },
    ]);
}
