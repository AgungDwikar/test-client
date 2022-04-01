import React, { useEffect, useState, Fragment } from "react";
import Page from "../../components/commons/Page";
import { useNavigate, NavLink, Link, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
//theming toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config/config";
import {
    DotsVerticalIcon,
    DuplicateIcon,
    PhotographIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
    SearchIcon,
} from "@heroicons/react/solid";
import apiPropinsi from "../../api/apiPropinsi";

const columns = [
    { name: "Propinsi Image" },
    { name: "Propnsi Key" },
    { name: "Propnsi Value" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Propinsi() {
    let navigate = useNavigate();
    const { state } = useLocation();
    const [propinsi, setPropinsi] = useState([]);
    let [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        apiPropinsi
            .list()
            .then((data) => {
                setPropinsi(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    useEffect(() => {
        apiPropinsi
            .list()
            .then((data) => {
                setPropinsi(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
        setRefresh(false);
    }, [refresh || (state ? state.refresh : null)]);

    const onDelete = async (id) => {
        apiPropinsi
            .deleteRow(id)
            .then(() => {
                setRefresh(true);
                toast.success("Data has been deleted.");
            })
            .catch((error) => {
                toast.success(error.message);
            });
    };

    return (
        <div className=" ml-3 mt-5">
            <Page
                title="Propinsi"
                titleButton="create"
                onClick={() => navigate("/dashboard/propinsi/new")}
            >
                <div className="flex items-baseline font-light justify-center">
                    <p className=" m-4 text-gray-500 font-light  ">
                        Search Propinsi
                    </p>
                    <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 ">
                        <SearchIcon className="w-5 h-4 mb-3 absolute ml-3 items-center  " />
                        <input
                            type="text"
                            placeholder="Popinsi Key, Propinsi Value..."
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                            className="pr-3 pl-10 py-1 placeholder-gray-500 text-black font-light rounded-lg mb-4 w-80 ring-gray-300 focus:ring-gray-500"
                        />
                    </div>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="border-t border-gray-200">
                            {(columns || []).map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <span>{col.name}</span>
                                </th>
                            ))}
                            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {propinsi &&
                            propinsi
                                .filter((data) => {
                                    if (search === "") {
                                        return data;
                                    } else if (
                                        data.prop_key
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    ) {
                                        return data;
                                    }
                                    if (search === "") {
                                        return data;
                                    } else if (
                                        data.prop_value
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    ) {
                                        return data;
                                    }
                                })
                                .map((prop) => (
                                    <tr key={prop.prop_id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={`${config.urlImage}/${prop.prop_url_image}`}
                                                    alt={`${prop.prop_id}`}
                                                />
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {prop.prop_key}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {prop.prop_value}
                                        </td>
                                        <td className="pr-6">
                                            <Menu
                                                as="div"
                                                className="relative flex justify-center items-center"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                                            <span className="sr-only">
                                                                Open options
                                                            </span>
                                                            <DotsVerticalIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                        </Menu.Button>
                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items
                                                                static
                                                                className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                            >
                                                                <div className="py-1">
                                                                    <Menu.Item>
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <Link
                                                                                to="#"
                                                                                className={classNames(
                                                                                    active
                                                                                        ? "bg-gray-100 text-gray-900"
                                                                                        : "text-gray-700",
                                                                                    "group flex items-center px-4 py-2 text-sm"
                                                                                )}
                                                                            >
                                                                                <PencilAltIcon
                                                                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                Edit
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                                <div className="py-1">
                                                                    <Menu.Item>
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <Link
                                                                                to="#"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        window.confirm(
                                                                                            "Delete this record ?"
                                                                                        )
                                                                                    )
                                                                                        onDelete(
                                                                                            prop.prop_id
                                                                                        );
                                                                                }}
                                                                                className={classNames(
                                                                                    active
                                                                                        ? "bg-gray-100 text-gray-900"
                                                                                        : "text-gray-700",
                                                                                    "group flex items-center px-4 py-2 text-sm"
                                                                                )}
                                                                            >
                                                                                <TrashIcon
                                                                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                Delete
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </Page>
            <ToastContainer autoClose={2000} />
        </div>
    );
}

export default Propinsi;
