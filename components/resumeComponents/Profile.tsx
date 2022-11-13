import { useSession } from 'next-auth/react';
import React, {useEffect, useRef, useState} from 'react'
import MyModal from '../elementsUI/MyModal';

function Profile() {
    const dataFetchedRef = useRef(false);

    const [openProfile, setOpenProfile] = useState<boolean>(false);
    const [profileDescription, setProfileDescription] = useState<string>('')
    const {data: session} = useSession()

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        const data2 = window.localStorage.getItem("PROFILE_DESCRIPTION_STATE");
        console.log("storage for profile  ", data2);
        if (data2 !== null) {
            const formated2 = JSON.parse(data2);
            setProfileDescription(formated2);
            console.log("profileDescription ", profileDescription);
        } else {
            setProfileDescription('');
        }
    }, []);


    useEffect(() => {
        if (session) {
            window.localStorage.setItem(
                "PROFILE_DESCRIPTION_STATE",
                JSON.stringify(profileDescription)
            );
            console.log("storage", window.localStorage.getItem("PROFILE_DESCRIPTION_STATE"));
        }
    }, [profileDescription]);

    function handleRemoveEducation() {
        setProfileDescription('')
        window.localStorage.removeItem("PROFILE_DESCRIPTION_STATE")
    }

    return (
        <div>
            <div className="bg-white max-w-[850px] shadow-violetShadow rounded-xl  mr-auto ml-auto max-md:w-11/12 max-md:mx-auto ">
                <div
                    className="cursor-pointer"
                    onClick={() => setOpenProfile(!openProfile)}
                >
                    <div className="flex py-8 px-10 space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 font-medium text-violet-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div className="font-medium text-xl text-violet-700">
                            Profile
                        </div>
                    </div>
                </div>

                {openProfile && (
                    <div className="mr-10 ml-10 pb-10 -mt-2 space-y-4 max-md:w-11/12 max-md:mx-auto">
                        <div className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>
                        <div className="text-neutral-600 text-sm ">
                            Description
                        </div>
                        <textarea
                            value={profileDescription}
                            onChange={(e) => setProfileDescription(e.target.value)}
                            placeholder="Tell about yourself..."
                            className="block p-2.5 pb-10 outline-none w-full text-sm text-neutral-600  rounded-sm border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        ></textarea>
                        <div className="flex justify-between">
                            <div className="">
                                <MyModal
                                    advice={"1 .Your profile is always at the top of your resume. \n2 .Describe yourself in a short and convincing way, taking into account both the vacancy and the position. Do not use monosyllabic phrases, but try to be as concise as possible. \n3 .Write a good profile, mentioning at least the following points: achievements, qualities, ambitions, goals and what you are looking for."}/>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    className="rounded-sm bg-white hover:text-red-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    <div
                                         onClick={() => handleRemoveEducation()}
                                         className="flex sapce-x-2 ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 hover:text-red-500 text-neutral-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <div className="mt-auto mb-auto">
                                            Remove
                                        </div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className="rounded-sm bg-white hover:text-bluee-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 mt-auto mb-auto py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    <div className="flex sapce-x-2 items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="hover:text-bluee-500 h-5 w-5 text-neutral-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                                        </svg>
                                        <div className="mt-auto mb-auto">
                                            Save
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
