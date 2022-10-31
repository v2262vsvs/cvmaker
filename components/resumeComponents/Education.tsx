import React, {useEffect, useState} from 'react'

import {Calendar} from 'react-date-range';
// import {DateRange , DateRangePicker} from "react-date-range";
//import {addDays} from 'date-fns';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import MyModal from './MyModal';

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
type Education = {
    degree: string;
    city: string;
    school: string;
    description: string;
    startdate: Date;
    enddate: Date;
};

function Education() {
    const [openEducation, setOpenEducation] = useState<boolean>(false);
    // const [startdate, setStartDate] = useState<Date>(new Date());
    // const [enddate, setEndDate] = useState<Date>(addDays(new Date(), 7));
    const [togleRange, setTogleRange] = useState<boolean>(false);
    const [togleRange2, setTogleRange2] = useState<boolean>(false);

    const [educationList, setEducationList] = useState<Education[]>([]);
    const [visibleEducation, setVisibleEducation] = useState<number>(0);

    const handleAddEducation = async (
        degree: string,
        city: string,
        school: string,
        description: string,
        startdate: Date,
        enddate: Date
    ) => {
        setVisibleEducation(educationList.length)
        setEducationList([
            ...educationList,
            {degree, city, school, description, startdate, enddate},
        ]);
    };

    const handleChangeEducation = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number, name: string) => {
        const value = e.target.value
        const list = [...educationList]
        switch (name) {
            case 'degree':
                list[index].degree = value
                setEducationList(list)
                break;
            case 'city':
                list[index].city = value
                setEducationList(list)
                break;
            case 'school':
                list[index].school = value
                setEducationList(list)
                break;
            case 'description':
                list[index].description = value
                setEducationList(list)
                break;
        }
    }

    const handleRemoveEducation = async (index: number) => {
        // if(educationList.length === 1) {
        //     const list = [...educationList];
        //     list.splice(index, 1);
        //     setEducationList(list);
        //     console.log(educationList)
        //     window.localStorage.removeItem("EDUCATION_STATE")
        // } else {
        //     const list = [...educationList];
        //     list.splice(index, 1);
        //     setEducationList(list);
        //     console.log(educationList)
        // }
        // const list = [...educationList];
        // list.splice(index, 1);
        // setEducationList(list);
        // console.log(educationList)
        if (educationList.length === 1) {
            window.localStorage.removeItem("EDUCATION_STATE")
        }
        const list = [...educationList];
        list.splice(index, 1);
        setEducationList(list);
    };
    const handleChangeEducationDate = async (item: any, index: number, name: string) => {
        console.log(item);
        const list = [...educationList]
        switch (name) {
            case 'startdate':
                list[index].startdate = item
                setEducationList(list)
                setTogleRange(!togleRange)
                break;
            case 'enddate':
                list[index].enddate = item
                setEducationList(list)
                setTogleRange2(!togleRange2)
                break;
        }
    };
    // const selectionRange = {
    //     startdate: startdate,
    //     enddate: enddate,
    //     key: "selection",
    // };

    useEffect(() => {
        const data = window.localStorage.getItem("EDUCATION_STATE");
        console.log("from storage", data);
        let formated = null;
        if (data !== null) {
            formated = JSON.parse(data);
            setEducationList(formated);
            console.log("education ", educationList);
        }

    }, []);

    useEffect(() => {
        if (educationList.length !== 0 || educationList.length != 0) {
            console.log("data saved");
            window.localStorage.setItem(
                "EDUCATION_STATE",
                JSON.stringify(educationList)
            );
            console.log("storage", window.localStorage.getItem("EDUCATION_STATE"));
        }
    }, [educationList]);
    //const [date, setDate] = useState<Date | undefined>();

    return (
        <div>


            <div className="bg-white max-w-[850px] shadow-xl rounded-md  mr-auto ml-auto ">
                <div
                    className="cursor-pointer"
                    onClick={() => setOpenEducation(!openEducation)}
                >
                    <div className="flex py-8 px-10 space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 font-medium text-neutral-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        <div className="font-medium text-xl text-neutral-700">
                            Education and qualifications
                        </div>
                    </div>
                </div>

                {openEducation && (
                    <div className="mr-10 ml-10 pb-10 -mt-2 space-y-4">
                        {educationList.map((education, index) => (

                            <div key={index} className="  -mt-2 space-y-4">
                                {(visibleEducation == index) ? (<div className="  -mt-2 space-y-4">
                                    <div
                                        className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>

                                    <div className="flex space-x-7">
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">
                                                Degree or certificate
                                            </div>
                                            <input
                                                value={education.degree}
                                                onChange={(e) =>
                                                    handleChangeEducation(e, index, 'degree')
                                                }
                                                placeholder="for example, Bachelor of Science"
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                                name='degree'
                                            />
                                        </div>
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">City</div>
                                            <input
                                                value={education.city}
                                                onChange={(e) =>
                                                    handleChangeEducation(e, index, 'city')
                                                }
                                                placeholder="for example, London"
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                                name='city'
                                            />
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="space-y-2 ">
                                            <div className="text-neutral-600 text-sm">
                                                Educational organization
                                            </div>
                                            <input
                                                value={education.school}
                                                onChange={(e) =>
                                                    handleChangeEducation(e, index, 'school')
                                                }
                                                placeholder="for example, the University of London"
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                                name='educational organization'
                                            />
                                        </div>
                                    </div>

                                    <div className="text-neutral-600 text-sm ">Description</div>
                                    <textarea
                                        value={education.description}
                                        onChange={(e) =>
                                            handleChangeEducation(e, index, 'description')
                                        }
                                        placeholder="Tell about your education..."
                                        className="block p-2.5 pb-10 outline-none w-full text-sm text-neutral-600  rounded-sm border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    ></textarea>

                                    <div className="flex space-x-7  justify-between">
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Start Date</div>
                                            <div
                                                onClick={() => setTogleRange(!togleRange)}
                                                className="space-y-2 grow"
                                            >
                                                {/*
                                                    value={`${
                                                    months[startdate.getMonth()]
                                                    }-${startdate.getDate()}  ${startdate.getFullYear()}`}
                                                 */}
                                                <input
                                                    value={`${months[new Date(education.startdate).getMonth()]}–${new Date(education.startdate).getDate()} ${new Date(education.startdate).getFullYear()}`}
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

                                                    value={`${months[new Date(education.enddate).getMonth()]}–${new Date(education.enddate).getDate()} ${new Date(education.enddate).getFullYear()}`}
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
                                                    onChange={item => handleChangeEducationDate(item, index, 'startdate')}
                                                    date={new Date(education?.startdate)}/>
                                            </div>
                                        )}
                                        {togleRange2 && (
                                            <div className="ml-3">
                                                <Calendar
                                                    onChange={item => handleChangeEducationDate(item, index, 'enddate')}
                                                    date={new Date(education?.enddate)}/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">
                                            <MyModal advice={"1 .Indicate only those courses that you actually attended. \n2 .Do not list primary or secondary schools unless they are your most recent education. \n3 .If you haven't completed the course in full, still list it - it can add value to your CV or at least explain a gap in your work experience. \n4 .Include a description of your course to explain to potential employers exactly what it included. \n5 .Want to organize your points in chronological order? Click the gear icon in the upper right corner of the section and select Sort chronologically."}/>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                className="rounded-sm bg-white hover:text-red-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                <div onClick={() => handleRemoveEducation(index)}
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
                                                    <div className="mt-auto mb-auto">Save</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>) : (
                                    <div onClick={() => setVisibleEducation(index)}>
                                        <div className="   space-y-4 mb-7">
                                            <div
                                                className=" border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>
                                            <div className="flex justify-between ">
                                                <div className="mt-auto mb-auto text-neutral-400 text-md">
                                                    <div className="font-medium">{education.degree}</div>
                                                    <div
                                                        className="text-xs">{months[new Date(education.startdate).getMonth()]} {new Date(education.startdate).getFullYear()}–{months[new Date(education.enddate).getMonth()]} {new Date(education.enddate).getFullYear()}</div>
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
                                                         onClick={() => handleRemoveEducation(index)}>
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
                                    handleAddEducation("", "", "", "", new Date(), new Date())
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
                                <div className="mt-auto mb-auto">Add another Education</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Education
