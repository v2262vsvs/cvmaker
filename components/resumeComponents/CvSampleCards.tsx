import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from 'react'
import CVpdfBerkeley from './pdfSamples/CVpdfBerkeley';
import CVpdfOtago from './pdfSamples/CVpdfOtago'
import CVpdfStanford from './pdfSamples/CVpdfStanford';
import { useSelector,useDispatch } from 'react-redux';
import { selectChoose, setChoose } from '../../slices/navSlice';
import {PDFExport} from "@progress/kendo-react-pdf";
import Link from "next/link";
///import Image from "next/image";

import Confetti from 'react-confetti'


// function classNames(...classes: any) {
//     return classes.filter(Boolean).join(' ')
// }

type Personal = {
    name?: string;
    syrname?: string;
    image?: string | undefined;
    phone?: string;
    postalcode?: string;
    address?: string;
    city?: string;
    email?: string;
};
type Education = {
    degree: string;
    city: string;
    school: string;
    description: string;
    startDate: Date;
    endDate: Date;
};
type Experience = {
    degree: string;
    city: string;
    employer: string;
    description: string;
    startDate: Date;
    endDate: Date;
};
type Skills = {
    habit: string;
    level: string;
};
type Languages = {
    language: string;
    level: string;
};
// const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
// ];
// const mont = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
// ];
// type Props = {
//     open?: boolean
// }
export default function CvSampleCards() {
    // let [isOpen1, setIsOpen1] = useState<boolean>(false)
    // let [isOpen2, setIsOpen2] = useState<boolean>(false)
    // let [isOpen3, setIsOpen3] = useState<boolean>(false)
    // let [isOpen4, setIsOpen4] = useState<boolean>(false)
    // let [isOpen5, setIsOpen5] = useState<boolean>(false)
    // let [isOpen6, setIsOpen6] = useState<boolean>(false)
    //let [isOpen, setIsOpen] = useState<boolean>(false)

    const [isOpen, setIsOpen] = useState<number>(0)
    const dispatch = useDispatch();

    const [isChoose, setIsChoose] = useState<number>(1)

    function closeModal() {
        setIsOpen(0)
    }
    function openModal(n:number) {
        setIsOpen(n)
        setIsChoose(n)
        dispatch(setChoose(n));
    }




    const [personal, setPersonal] = useState<Personal>({});
    const [profileDescription, setProfileDescription] = useState<string>("");
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [experienceList, setExperienceList] = useState<Experience[]>([]);
    const [skillsList, setSkillsList] = useState<Skills[]>([]);
    const [languagesList, setLanguagesList] = useState<Languages[]>([]);

    useEffect(() => {
        const data = window.localStorage.getItem("PERSONAL_STATE");
        console.log("from storage", data);
        if (data !== null) {
            const formated: Personal = JSON.parse(data);
            console.log("name", formated.name);
            setPersonal((personal) => ({
                ...personal,
                name: formated.name,
                syrname: formated.syrname,
                image: formated.image,
                phone: formated.phone,
                postalcode: formated.postalcode,
                address: formated.address,
                city: formated.city,
                email: formated.email,
            }));
        }
        const data2 = window.localStorage.getItem("PROFILE_DESCRIPTION_STATE");
        let formated2 = null;
        if (data2 !== null) {
            formated2 = JSON.parse(data2);
            setProfileDescription(formated2);
            console.log("profileDescription ", profileDescription);
        }
        const data3 = window.localStorage.getItem("EDUCATION_STATE");
        console.log("from storage", data3);
        let formated3 = null;
        if (data3 !== null) {
            formated3 = JSON.parse(data3);
            setEducationList(formated3);
            console.log("education ", educationList);
        }

        const data4 = window.localStorage.getItem("EXPERIENCE_STATE");
        console.log("from storage", data4);
        let formated4 = null;
        if (data4 !== null) {
            formated4 = JSON.parse(data4);
            setExperienceList(formated4);
            console.log("experience ", experienceList);
        }
        const data5 = window.localStorage.getItem("SKILLS_STATE");
        console.log("from storage", data5);
        let formated5 = null;
        if (data5 !== null) {
            formated5 = JSON.parse(data5);
            setSkillsList(formated5);
            console.log("skills ", skillsList);
        } else {
            setSkillsList([
                {
                    habit: "",
                    level: "",
                },
            ]);
        }
        const data6 = window.localStorage.getItem("LANGUAGES_STATE");
        console.log("from storage", data6);
        let formated6 = null;
        if (data6 !== null) {
            formated6 = JSON.parse(data6);
            setLanguagesList(formated6);
            console.log("languages ", languagesList);
        } else {
            setLanguagesList([
                {
                    language: "",
                    level: "",
                },
            ]);
        }
    }, []);

    const pdfExportComponent = React.useRef<PDFExport>(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
        setIsConfetti(true)
    };


    function changeCV(num : number) {
        setIsChoose(num)
        setIsOpen(0)
    }

    // useEffect(()=> {
    //     console.log(isChoose)
    // }, [isChoose])

    const [isConfetti, setIsConfetti] = useState<boolean>(false)

    return (
        <>
            <div className='flex items-center space-x-3 overflow-x-scroll overflow-y-hidden overflow-clip scrollbar-hide w-[1400px] py-5 px-3 ml-auto mr-auto'>
                <div onClick={()=>openModal(1)} >
                    <CVpdfStanford personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList} />
                </div>
                <div onClick={()=>openModal(2)} className="  flex items-center justify-center">
                    <CVpdfOtago personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
                <div onClick={()=>openModal(3)} className="  flex items-center justify-center">
                    <CVpdfBerkeley personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
                <div onClick={()=>openModal(4)} className="  flex items-center justify-center">
                    <CVpdfStanford personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
                <div onClick={()=>openModal(5)} className="  flex items-center justify-center">
                    <CVpdfStanford personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
                <div onClick={()=>openModal(6)} className="  flex items-center justify-center">
                    <CVpdfStanford personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
            </div>


            <Transition appear show={isOpen == 1} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>

                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto mt-8">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-125"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                                    <div className=''>
                                        <CVpdfStanford personal={personal} profileDescription={profileDescription}
                                                       educationList={educationList} experienceList={experienceList}
                                                       skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                    </div>

                                    <div className="-mt-2 text-center p-2 ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            //onClick={closeModal }
                                            onClick={()=>changeCV(1)}
                                        >
                                            Select Sample
                                        </button>
                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>

                    </div>
                </Dialog>

            </Transition>
            <Transition appear show={isOpen == 2} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>

                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto mt-8">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-125"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                                    <div className=''>
                                        <CVpdfOtago personal={personal} profileDescription={profileDescription}
                                                       educationList={educationList} experienceList={experienceList}
                                                       skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                    </div>

                                    <div className="-mt-2 text-center p-2">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            onClick={()=>changeCV(2)}
                                        >
                                            Select Sample
                                        </button>
                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>

                    </div>
                </Dialog>

            </Transition>
            <Transition appear show={isOpen == 3} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>

                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto mt-8">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-125"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                                    <div className=''>
                                        <CVpdfBerkeley personal={personal} profileDescription={profileDescription}
                                                       educationList={educationList} experienceList={experienceList}
                                                       skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                    </div>

                                    <div className="-mt-2 p-2 text-center ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            //onClick={closeModal}
                                            onClick={()=>changeCV(3)}
                                        >
                                            Select Sample
                                        </button>
                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>

                    </div>
                </Dialog>
            </Transition>


            <div className="items-center text-center ">
                <button onClick={() => exportPDFWithComponent()}
                        className="bg-violet-700 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto"
                >
                    <div className="text-white text-lg font-semibold">
                        Download PDF
                    </div>
                    <img src='/ChevronNext.svg' alt='next' className="h-6 w-6 text-center mt-auto mb-auto"/>
                </button>
                <Link href="/box/experience">
                    <button className="bg-violet-50 px-12 py-3 rounded-md mt-5 flex ml-auto mr-auto">
                        <img src='/ChevronPrevious.svg' alt='previous' className="h-6 w-6 mt-auto mb-auto"/>
                        <div className="text-gray-400 text-md hover:text-gray-500">
                            Previous step
                        </div>
                    </button>
                </Link>
            </div>
            <div className='flex justify-center' style={{ position: "absolute", left: "-2000px", top: 0 }}>
                <PDFExport ref={pdfExportComponent} paperSize="A4">
                    {isChoose === 1 ?
                        <div className=''>
                            <CVpdfStanford personal={personal} profileDescription={profileDescription}
                                           educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                           languagesList={languagesList} type={'downloadSample'}/>
                        </div>
                        : isChoose === 2 ?
                            <div className=''>
                                <CVpdfOtago personal={personal} profileDescription={profileDescription}
                                            educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                            languagesList={languagesList} type={'downloadSample'}/>
                            </div>
                            : <div className=''>
                                <CVpdfBerkeley personal={personal} profileDescription={profileDescription}
                                               educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                               languagesList={languagesList} type={'downloadSample'}/>
                            </div>
                    }
                </PDFExport>
            </div>

            {isConfetti &&
                <Confetti
                    width={window.innerWidth - 50}
                    height={window.innerHeight + 50}
                    numberOfPieces={500}
                />}
        </>
    )
}
