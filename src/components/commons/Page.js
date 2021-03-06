import React from "react";

export default function page(props) {
    // extract props, memakai rest parameters
    const { title, children, titleButton, ...others } = props;
    return (
        <>
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                        {title}
                    </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                    <button
                        onClick={() => others.onClick()}
                        type="button"
                        className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                    >
                        {titleButton}
                    </button>
                </div>
            </div>
            {/* content page */}
            <div className="px-4 mt-6 sm:px-6 lg:px-6 ">
                <div className=" hidden mt-8 sm:block ">
                    <div className=" border-b border-gray-200">{children}</div>
                </div>
            </div>
        </>
    );
}
