import React, {useEffect, useState} from "react";
import Link from "next/link";
import HeadMeta from "../../components/pageSections/HeadMeta";
import StepProgressBar from "../../components/elementsUI/StepProgressBar";
import PersonalForm from "../../components/resumeComponents/PersonalForm";



function personal() {
    // for progress bar
    const [percent, setPercent] = useState<number>(0)

    // for progress bar animation
    useEffect(() => {
        setTimeout(() => {
            setPercent(percent + 25)
        }, 800)
    }, [])


    return (
        <>
            <HeadMeta title={'CV - Personal'} content={'add later some text'}/>
            <div className="h-full w-full bg-greenn-500 space-y-10">
                <div className="text-center text-white font-semibold text-4xl pt-10">
                    Personal data
                </div>

                <StepProgressBar percent={percent}/>

                <div className="bg-gray-100 rounded-t-md h-full shadow-t-xl space-y-10 pt-10 ">

                    <PersonalForm/>

                    <div className="items-center text-center pt-10">
                        <Link href="/box/experience">
                            <button className="bg-indigo-500 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto">
                                <div className="text-white text-lg font-semibold">
                                    The next step
                                </div>
                                <img src='/ChevronNext.svg' alt='next' className="h-6 w-6 text-center mt-auto mb-auto"/>
                            </button>
                        </Link>
                    </div>
                    <footer className="ml-auto   mr-auto text-center text-gray-500 text-xs max-w-[500px]">
                        By clicking "Next", you will start creating your resume and agree to
                        our general terms and conditions and privacy policy .
                    </footer>
                </div>
            </div>
        </>
    );
}

export default personal;
