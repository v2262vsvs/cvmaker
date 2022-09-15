"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
function personal() {
    return (react_1["default"].createElement("div", { className: 'h-full w-full bg-green-500 space-y-10' },
        react_1["default"].createElement("div", { className: 'pt-10' },
            react_1["default"].createElement("div", { className: 'text-center text-white font-semibold text-4xl ' }, "Personal data")),
        react_1["default"].createElement("div", { className: '' },
            react_1["default"].createElement("div", { className: "w-11/12 lg:w-2/6 mx-auto" },
                react_1["default"].createElement("div", { className: "bg-green-300 h-2 flex items-center justify-between" },
                    react_1["default"].createElement("div", { className: "w-1/2 flex justify-start" },
                        react_1["default"].createElement("div", { className: "bg-indigo-600 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative" },
                            react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white text-center", viewBox: "0 0 20 20", fill: "currentColor" },
                                react_1["default"].createElement("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" })))),
                    react_1["default"].createElement(link_1["default"], { href: "/box/experience", className: "w-1/2 flex justify-center" },
                        react_1["default"].createElement("div", { className: "bg-green-300 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative" },
                            react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-green-600 text-center", viewBox: "0 0 20 20", fill: "currentColor" },
                                react_1["default"].createElement("path", { fillRule: "evenodd", d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z", clipRule: "evenodd" })))),
                    react_1["default"].createElement("div", { className: "w-1/2 flex justify-end" },
                        react_1["default"].createElement("div", { className: "bg-green-300 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative" },
                            react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-green-600 text-center", viewBox: "0 0 20 20", fill: "currentColor" },
                                react_1["default"].createElement("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" }))))))),
        react_1["default"].createElement("div", { className: 'bg-gray-100 rounded-t-md h-full shadow-t-2xl space-y-10 pb-56' },
            react_1["default"].createElement("div", { className: 'bg-white max-w-[800px] shadow-xl rounded-md h-full mx-auto ml-auto ' },
                react_1["default"].createElement("div", { className: ' text-lg text-gray-900' }, "Personal data")),
            react_1["default"].createElement("div", { className: 'items-center text-center pt-10' },
                react_1["default"].createElement("button", { className: 'bg-indigo-500 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto' },
                    react_1["default"].createElement("div", { className: 'text-white text-lg font-semibold' }, "The next step"),
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white text-center mt-auto mb-auto font-semibold", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" }))),
                react_1["default"].createElement("button", { className: 'bg-gray-100 px-12 py-3 rounded-md mt-5 flex ml-auto mr-auto  ' },
                    react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5  text-gray-400 text-center mt-auto mb-auto font-semibold", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })),
                    react_1["default"].createElement("div", { className: 'text-gray-400 text-md hover:text-gray-500' }, "Previous step"))),
            react_1["default"].createElement("footer", { className: 'ml-auto   mr-auto text-center text-gray-500 text-xs max-w-[500px]' }, "By clicking \"Next\", you will start creating your resume and agree to our general terms and conditions and privacy policy ."))));
}
exports["default"] = personal;
