import React, {useEffect, useState} from "react";
import Link from "next/link";
import Skills from "../../components/resumeComponents/Skills";
import Experience from "../../components/resumeComponents/Experience";
import Profile from "../../components/resumeComponents/Profile";
import Education from "../../components/resumeComponents/Education";
import Languages from "../../components/resumeComponents/Languages";
import HeadMeta from "../../components/pageSections/HeadMeta";
import StepProgressBar from "../../components/elementsUI/StepProgressBar";
import ToTopButton from "../../components/elementsUI/ToTopButton";
import MyModal from "../../components/resumeComponents/MyModal";


function experience() {

    //for progress bar animation
    const [percent, setPercent] = useState<number>(25)

    useEffect(() => {
        setTimeout(() => {
            setPercent(percent + 25)
        }, 800)
    }, [])


    return (
        <>
            <HeadMeta title={'CV - Experience'} content={'add later some text'}/>
            <div className="h-full w-full bg-violet-700 space-y-10">
                <div className="text-center text-white font-semibold text-4xl pt-10">
                    My experience
                </div>

                <StepProgressBar percent={percent}/>

                <div className="bg-gray-100 rounded-t-md h-full shadow-t-xl space-y-10 pt-10 ">

                    <Profile/>
                    <Education/>
                    <Experience/>
                    <Skills/>
                    <Languages/>

                    <div className="items-center text-center pt-10">
                        <Link href="/box/sample">
                            <button
                                className="bg-bluee-500  px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto">
                                <div className="text-white text-lg font-semibold">
                                    The next step
                                </div>
                                <img src='/ChevronNext.svg' alt='next' className="h-6 w-6 text-center mt-auto mb-auto"/>
                            </button>
                        </Link>
                        <Link href="/box/personal">
                            <button className="bg-gray-100 px-12 py-3 rounded-md mt-5 flex ml-auto mr-auto  ">
                                <img src='/ChevronPrevious.svg' alt='previous' className="h-6 w-6 mt-auto mb-auto"/>
                                <div className="text-gray-400 text-md hover:text-gray-500">
                                    Previous step
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
                <div
                    className='shadow-2xl shadow-violet-500'
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '180px',
                        height: 80,
                        width: 80,
                        background: 'white',
                        display: "flex",
                        justifyContent: 'center',
                        borderRadius: 40
                    }}>
                    <MyModal
                        type='hint'
                        advice={'Что думаешь по поводу тут подсказок общих???'}
                    />
                </div>
            </div>
            <ToTopButton/>
        </>
    );
}

export default experience;
