import React, {useEffect, useState} from "react";
import CvSampleCards from "../../components/resumeComponents/CvSampleCards";
import HeadMeta from "../../components/pageSections/HeadMeta";
import StepProgressBar from "../../components/elementsUI/StepProgressBar";

function Sample() {

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
            <div className="h-full w-full bg-violet-700 ">
                <div className="space-y-10">
                <div className="text-center text-white font-semibold text-4xl pt-10">
                    Choose a template
                </div>
                <StepProgressBar percent={percent}/>
                <div className="bg-violet-50 rounded-t-md h-screen  space-y-10 ">
                    <CvSampleCards/>
                </div>
                </div>
            </div>
        </>
    );
}

export default Sample;
