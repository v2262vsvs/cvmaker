import React, {useEffect, useState} from "react";
import Link from "next/link";
import Skills from "../../components/Skills";
import Experience from "../../components/Experience";
import Profile from "../../components/Profile";
import Education from "../../components/Education";
import Languages from "../../components/Languages";
import HeadMeta from "../../components/HeadMeta";
import NewProgressBar from "../../components/NewProgressBar";
import ToTopButton from "../../components/ToTopButton";


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
            <div className="h-full w-full bg-greenn-500 space-y-10">
                <div className="pt-10">
                    <div className="text-center text-white font-semibold text-4xl ">
                        My experience
                    </div>
                </div>
                <NewProgressBar percent={percent}/>

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
                        </Link>
                        <Link href="/box/personal">
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
            <ToTopButton/>
        </>
    );
}

export default experience;
