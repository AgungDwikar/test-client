import React from "react";
import { Link } from "react-router-dom";

function MainLayout() {
    return (
        <section className=" bg-slate-400 dark:text-coolGray-100">
            <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leading-none sm:text-5xl">
                    Test Calon Karyawan
                    <span className="dark:text-cyan-400 mt-4">
                        Membuat Crud fULLSTACK
                    </span>
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">
                    Crud Ini di buat dengan PostgreSql, Exspress, Reactjs,
                    NodeJs(PERN)
                </p>
                <div className="flex flex-wrap justify-center">
                    <Link to="dashboard">
                        <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-blue-500 dark:text-coolGray-900 text-white animate-bounce">
                            Dashboard
                        </button>
                    </Link>
                    <Link to="flexbox">
                        <button className="px-8 py-3 m-2 text-lg border rounded dark:text-coolGray-50 border-white">
                            About Me
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default MainLayout;
