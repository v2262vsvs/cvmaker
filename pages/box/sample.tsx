import Link from "next/link";
import React from "react";

import { useRef } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import CVpdfBerkeley from "../../components/CVpdfBerkeley";
import CVpdfOtago from "../../components/CVpdfOtago";

function sample() {
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  return (
    <div className="h-full w-full bg-greenn-500 space-y-10">
      <div className="pt-10">
        <div className="text-center text-white font-semibold text-4xl ">
          Choose a template
        </div>
      </div>
      <div className="">
        <div className="w-11/12 lg:w-2/6 mx-auto">
          <div className="bg-bluee-500  h-2 flex items-center justify-between">
            <div className="w-1/2 flex justify-start">
              <Link href="/box/personal">
                <div className="bg-bluee-500  h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white text-center"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            <Link href="/box/experience" className="w-1/2 flex justify-center">
              <div className="bg-bluee-500  h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white text-center"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
            <div className="w-1/2 flex justify-end">
              <div className="bg-bluee-500  h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white text-center"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-t-md h-full shadow-2xl space-y-10 ">
        <PDFExport ref={pdfExportComponent} paperSize="A4">
        <CVpdfOtago/>
        </PDFExport>
        <CVpdfBerkeley />

        <div className="items-center text-center pt-10">
          <button onClick={() => exportPDFWithComponent()} className="bg-indigo-500 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto">
            <div  className="text-white text-lg font-semibold">Download PDF</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white text-center mt-auto mb-auto font-semibold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <Link href="/box/experience">
            <button className="bg-gray-100 px-12 py-3 rounded-md mt-5 flex ml-auto mr-auto  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5  text-gray-400 text-center mt-auto mb-auto font-semibold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div className="text-gray-400 text-md hover:text-gray-500">
                Previous step
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default sample;
