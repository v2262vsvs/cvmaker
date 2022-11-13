import React, {useEffect, useState} from 'react'
import {Calendar} from 'react-date-range';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import MyModal from '../elementsUI/MyModal';


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function Experience() {

    const [visibleExperience, setVisibleExperience] = useState<number>(0);
    const [openExperience, setOpenExperience] = useState<boolean>(false);
    const [experienceList, setExperienceList] = useState<Experience[]>([]);
    const [togleRange, setTogleRange] = useState<boolean>(false);
    const [togleRange2, setTogleRange2] = useState<boolean>(false);


    const handleAddExperience = async (
        position: string,
        city: string,
        employer: string,
        description: string,
        startdate: Date,
        enddate: Date
    ) => {
        setVisibleExperience(experienceList.length)
        setExperienceList([
            ...experienceList,
            {position, city, employer, description, startdate, enddate},
        ]);
    };
    const handleChangeExperience = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number, name: string) => {
        const value = e.target.value
        const list = [...experienceList]
        switch (name) {
            case 'position':
                list[index].position = value
                setExperienceList(list)
                break;
            case 'city':
                list[index].city = value
                setExperienceList(list)
                break;
            case 'employer':
                list[index].employer = value
                setExperienceList(list)
                break;
            case 'description':
                list[index].description = value
                setExperienceList(list)
                break;
        }
    }

    const handleRemoveExperience = async (index: number) => {
        if(experienceList.length === 1) {
            window.localStorage.removeItem("EXPERIENCE_STATE")
        }

        const list = [...experienceList];
        list.splice(index, 1);
        setExperienceList(list);
    };

    const handleChangeExperienceDate = async (item: any, index: number, name: string) => {
        console.log(item);
        const list = [...experienceList]
        switch (name) {
            case 'startdate':
                list[index].startdate = item
                setExperienceList(list)
                setTogleRange(!togleRange)
                break;
            case 'enddate':
                list[index].enddate = item
                setExperienceList(list)
                setTogleRange2(!togleRange2)
                break;
        }
    };

    useEffect(() => {

        const data3 = window.localStorage.getItem("EXPERIENCE_STATE");
        console.log("from storage", data3);
        let formated3 = null;
        if (data3 !== null) {
            formated3 = JSON.parse(data3);
            setExperienceList(formated3);
            console.log("experience ", experienceList);
        }

    }, []);

    useEffect(() => {
        if (experienceList.length !== 0 || experienceList.length != 0) {
            console.log("data saved");
            window.localStorage.setItem(
                "EXPERIENCE_STATE",
                JSON.stringify(experienceList)
            );
            console.log("storage", window.localStorage.getItem("EXPERIENCE_STATE"));
        }
    }, [experienceList]);
    return (
        <div>
            <div className="bg-white max-w-[850px] shadow-xl rounded-md  mr-auto ml-auto ">
                <div
                    className="cursor-pointer"
                    onClick={() => setOpenExperience(!openExperience)}
                >
                    <div className="flex py-8 px-10 space-x-2">

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 font-medium text-neutral-700"
                             viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                  clipRule="evenodd"/>
                            <path
                                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                        </svg>
                        <div className="font-medium text-xl text-neutral-700">
                            Experience
                        </div>
                    </div>
                </div>

                {openExperience && (
                    <div className="mr-10 ml-10 pb-10 -mt-2 space-y-4">
                        {experienceList.map((experience, index) => (

                            <div key={index} className="  -mt-2 space-y-4">
                                {(visibleExperience == index) ? (<div className="  -mt-2 space-y-4">
                                    <div
                                        className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>

                                    <div className="flex space-x-7">
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Position</div>
                                            <input
                                                value={experience.position}
                                                onChange={(e) =>
                                                    handleChangeExperience(e, index, 'position')
                                                }
                                                placeholder="for example, hr-manager"
                                                name='work'
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">City</div>
                                            <input
                                                value={experience.city}
                                                onChange={(e) =>
                                                    handleChangeExperience(e, index, 'city')
                                                }
                                                name='city'
                                                placeholder="for example, London"
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="space-y-2 ">
                                            <div className="text-neutral-600 text-sm">Employer or company</div>
                                            <input
                                                value={experience.employer}
                                                onChange={(e) =>
                                                    handleChangeExperience(e, index, 'employer')
                                                }
                                                name='company'
                                                placeholder="for example, Microsoft Corporation..."
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-neutral-600 text-sm ">Description</div>
                                    <textarea
                                        value={experience.description}
                                        onChange={(e) =>
                                            handleChangeExperience(e, index, 'description')
                                        }
                                        placeholder="Tell about your experience..."
                                        className="block p-2.5 pb-10 outline-none w-full text-sm text-neutral-600  rounded-sm border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    ></textarea>

                                    <div className="flex space-x-7  justify-between">
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Start Date</div>
                                            <div
                                                onClick={() => setTogleRange(!togleRange)}
                                                className="space-y-2 grow"
                                            >
                                                <input
                                                    value={`${months[new Date(experience.startdate).getMonth()]}–${new Date(experience.startdate).getDate()} ${new Date(experience.startdate).getFullYear()}`}
                                                    placeholder="Start Date"
                                                    className="ring-2 ring-gray-200 text-neutral-600 px-4 py-3 rounded-sm w-full outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">End Date</div>
                                            <div
                                                onClick={() => setTogleRange2(!togleRange2)}
                                                className="space-y-2 grow"
                                            >
                                                <input

                                                    value={`${months[new Date(experience.enddate).getMonth()]}–${new Date(experience.enddate).getDate()} ${new Date(experience.enddate).getFullYear()}`}
                                                    placeholder="End Date"
                                                    className="ring-2 ring-gray-200 text-neutral-600 px-4 py-3 rounded-sm w-full outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        {togleRange && (
                                            <div className="ml-3 mr-16">
                                                <Calendar
                                                    onChange={item => handleChangeExperienceDate(item, index, 'startdate')}
                                                    date={new Date(experience?.startdate)}/>
                                            </div>
                                        )}
                                        {togleRange2 && (
                                            <div className="ml-3">
                                                <Calendar
                                                    onChange={item => handleChangeExperienceDate(item, index, 'enddate')}
                                                    date={new Date(experience?.enddate)}/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">
                                            <MyModal
                                                advice={"1 .Use the correct job title for the job you are applying for. For example, Salesperson should be replaced with Customer Relations Manager. \n2 .Describe your tasks, responsibilities and any acquired competencies as clearly as possible. \n3 .Look closely at what the company is looking for. Compose your text taking into account the needs of the company and supplement it with your own experience. \n4 .If you have work experience, indicate only those tasks and responsibilities that are relevant to the vacancy for which you want to apply. \n5 .Want to organize your points in chronological order? Click the gear icon in the upper right corner of the section and select Sort chronologically."}
                                            />
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                className="rounded-sm bg-white hover:text-red-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                <div onClick={() => handleRemoveExperience(index)}
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
                                                    <div

                                                        className="mt-auto mb-auto"
                                                    >
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
                                                    <div className="mt-auto mb-auto">Save</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>) : (
                                    <div onClick={() => setVisibleExperience(index)}>
                                        <div className="   space-y-4 mb-7">
                                            <div
                                                className=" border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>
                                            <div className="flex justify-between ">
                                                <div className="mt-auto mb-auto text-neutral-400 text-md">
                                                    <div className="font-medium">{experience.position}</div>
                                                    <div
                                                        className="text-xs">{months[new Date(experience.startdate).getMonth()]} {new Date(experience.startdate).getFullYear()}–{months[new Date(experience.enddate).getMonth()]} {new Date(experience.enddate).getFullYear()}</div>
                                                </div>
                                                <div className=" flex space-x-3 mt-auto mb-auto  text-neutral-600">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="cursor-pointer"
                                                         onClick={() => handleRemoveExperience(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={() =>
                                    handleAddExperience("", "", "", "", new Date(), new Date())
                                }
                                type="button"
                                className="flex py-3 w-full justify-center space-x-2 rounded-sm bg-neutral-200  text-center  text-md text-neutral-600 hover:bg-opacity-60 bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" h-5 w-5 text-neutral-600 mt-auto mb-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="mt-auto mb-auto">Add another Experience</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Experience
