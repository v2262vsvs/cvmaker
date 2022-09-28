import Link from "next/link";
import React, {useEffect, useState} from "react";
import {PDFExport} from "@progress/kendo-react-pdf";
import CvSampleCards from "../../components/resumeComponents/CvSampleCards";
import HeadMeta from "../../components/pageSections/HeadMeta";
import StepProgressBar from "../../components/elementsUI/StepProgressBar";

function sample() {
    const pdfExportComponent = React.useRef<PDFExport>(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    //for progress bar animation
    const [percent, setPercent] = useState<number>(50)

    useEffect(() => {
        setTimeout(() => {
            setPercent(percent + 50)
        }, 800)
    }, [])


    return (
        <>
            <HeadMeta title={'CV - Template'} content={'add later some text'}/>
            <div className="h-full w-full bg-violet-700 space-y-10">
                <div className="text-center text-white font-semibold text-4xl pt-10">
                    Choose a template
                </div>

                <StepProgressBar percent={percent}/>

                <div className="bg-gray-100 rounded-t-md h-full shadow-2xl space-y-10 ">

                    <CvSampleCards/>

                    <PDFExport ref={pdfExportComponent} paperSize="A4">

                    </PDFExport>

                    <div className="items-center text-center pt-10">
                        <button onClick={() => exportPDFWithComponent()}
                                className="bg-indigo-500 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto"
                        >
                            <div className="text-white text-lg font-semibold">
                                Download PDF
                            </div>
                            <img src='/ChevronNext.svg' alt='next' className="h-6 w-6 text-center mt-auto mb-auto"/>
                        </button>
                        <Link href="/box/experience">
                            <button className="bg-gray-100 px-12 py-3 rounded-md mt-5 flex ml-auto mr-auto">
                                <img src='/ChevronPrevious.svg' alt='previous' className="h-6 w-6 mt-auto mb-auto"/>
                                <div className="text-gray-400 text-md hover:text-gray-500">
                                    Previous step
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default sample;
