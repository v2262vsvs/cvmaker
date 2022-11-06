import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from 'react'
import Link from "next/link";
import Confetti from 'react-confetti'

import { useSelector,useDispatch } from 'react-redux';
import {selectChoose, setChoose, setColor} from '../../slices/navSlice';
import client from "../../apolo-client"
import { toast } from 'react-toastify'

import {PDFExport} from "@progress/kendo-react-pdf";

import CVpdfBerkeley from './pdfSamples/CVpdfBerkeley';
import CVpdfOtago from './pdfSamples/CVpdfOtago'
import CVpdfStanford from './pdfSamples/CVpdfStanford';
import CVpdfErling from "./pdfSamples/CVpdfErling";
import CVpdfTwilight from "./pdfSamples/CVpdfTwilight";
import CVpdfSparkle from "./pdfSamples/CVpdfSparkle";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ACCOUNT, ADD_CV, ADD_EDUCATION, ADD_EXPERIENCE, ADD_LANGUAGE, ADD_PROFILE_DESCRIPTION, ADD_SKILL, ADD_USER } from '../../graphql/mutations';
import { RootState } from '../../store';
import { useSession } from 'next-auth/react';
import { GET_ACCOUNT_BY_EMAIL } from '../../graphql/queries';

function formatDate(date : Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

type Personal = {
    name?: string;
    surname?: string;
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
    startdate: Date;
    enddate: Date;
};
type Experience = {
    position: string;
    city: string;
    employer: string;
    description: string;
    startdate: Date;
    enddate: Date;
};
type Skills = {
    habit: string;
    level: string;
};
type Languages = {
    language: string;
    level: string;
};

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        const  handleResize = () => {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }



export default function CvSampleCards() {
    const sample = useSelector((state: RootState) => state.nav.choose);
    const color = useSelector((state: RootState) => state.nav.color);

    const [isConfetti, setIsConfetti] = useState<boolean>(false)

    const [isOpen, setIsOpen] = useState<number>(0)
    const dispatch = useDispatch();

    const [isChoose, setIsChoose] = useState<number>(1)
    const [isColor, setIsColor] = useState<string>('black')
    const size = useWindowSize();

    function closeModal() {
        setIsOpen(0)
    }
    function openModal(n:number) {
        if(size.height>940 && size.width>650){
            setIsOpen(n)
        }
        setIsChoose(n)
        dispatch(setChoose(n));
    }
    function changeCV(num : number) {
        setIsChoose(num)
        setIsOpen(0)
    }
    function changeColor(color: string) {
        setIsColor(color)
        dispatch(setColor(color))
    }

    const [isCongratulation, setIsCongratulation] = useState(false)

    function openCongratulation () {
        //setIsCongratulation(true)
        exportPDFWithComponent()
    }
    function closeCongratulation () {
        setIsCongratulation(false)
    }


    const pdfExportComponent = React.useRef<PDFExport>(null);


    const [addCv] = useMutation(ADD_CV)
    const [addUser] = useMutation(ADD_USER)
    const [addProfileDescription] = useMutation(ADD_PROFILE_DESCRIPTION)
    const [addEducation] = useMutation(ADD_EDUCATION)
    const [addExperience] = useMutation(ADD_EXPERIENCE)
    const [addSkill] = useMutation(ADD_SKILL)
    const [addLanguage] = useMutation(ADD_LANGUAGE)
    const {data:session} = useSession()
    const [addAccount] = useMutation(ADD_ACCOUNT)








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
                surname: formated.surname,
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
        }else {
            setEducationList([
                {
                    startdate: new Date(),
                    enddate: new Date(),
                    city: "",
                    description: "",
                    school: "",
                    degree: "",
                },
            ]);
        }

        const data4 = window.localStorage.getItem("EXPERIENCE_STATE");
        console.log("from storage", data4);
        let formated4 = null;
        if (data4 !== null) {
            formated4 = JSON.parse(data4);
            setExperienceList(formated4);
            console.log("experience ", experienceList);
        } else {
            setExperienceList([
                {
                    position: "",
                    city: "",
                    employer: "",
                    description: "",
                    startdate: new Date(),
                    enddate: new Date(),
                },
            ]);
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


    const exportPDFWithComponent = async () => {


        if (sample){
        setIsConfetti(true)
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
        try {
            const id = toast.loading("Saving your CV :3")

            const {data} = await client.query({
                query: GET_ACCOUNT_BY_EMAIL,
                variables:{
                    email: session?.user?.email
                }
            })
            let accountID
            console.log('getAccountByEmail',data?.getAccountByEmail?.email)
            console.log('session email',session?.user?.email)
            //let accountID = data?.getAccountByEmail?.id
            if (data?.getAccountByEmail?.email === session?.user?.email ){
                console.log('using existing account',data)
                accountID = data?.getAccountByEmail?.id
            } else {

                console.log('creating a new account')
                const {data} = await addAccount({
                    variables:{
                        email: session?.user?.email,
                        login: session?.user?.name,
                        image: session?.user?.image
                    },
                })
                console.log(data, 'new Account created')
                accountID = data?.insertAccount?.id
            }

                console.log('creating a new cv')
                const {data:{insertCv:newCv}}=await addCv({
                    variables:{
                        account_id:accountID,
                        sample:sample,
                        color:color,
                        description:profileDescription,
                    },
                })
                console.log(newCv, 'new cv added')

                const image = personal.image || ''
                const {data:{insertUser:newUser}}=await addUser({
                    variables:{
                        cv_id:newCv.id,
                        name:personal.name,
                        surname:personal.surname,
                        image:image,
                        phone:personal.phone,
                        city:personal.city,
                        email: personal.email,
                        postalcode:personal.postalcode,
                        address:personal.address,
                    },
                })
                console.log(newUser, 'user(personal data page) added')



                for (let i = 0; i<educationList.length;i++){

                    //let startdate = formatDate(educationList[i].startdate)
                    //let enddate = formatDate(educationList[i].enddate)
                    const {data:{insertEducation:newEducation}}=await addEducation({
                        variables:{
                            city:educationList[i].city,
                            enddate:educationList[i].enddate,
                            startdate: educationList[i].startdate,
                            description:educationList[i].description,
                            school:educationList[i].school,
                            cv_id:newCv.id,
                            degree:educationList[i].degree,
                        },
                    })
                    console.log(newEducation,'education #',i,' added')
                }
                for (let i = 0; i<experienceList.length;i++){

                    //let startdate = formatDate(experienceList[i].startdate)
                    //let enddate = formatDate(experienceList[i].enddate)
                    const {data:{insertExperience:newExperience}}=await addExperience({
                        variables:{
                            city:experienceList[i].city,
                            enddate:experienceList[i].enddate,
                            startdate: experienceList[i].startdate,
                            description:experienceList[i].description,
                            employer:experienceList[i].employer,
                            cv_id:newCv.id,
                            position:experienceList[i].position,
                        },
                    })
                    console.log(newExperience,'experience #',i,' added')
                }
                for (let i = 0; i<skillsList.length;i++){
                    const {data:{insertSkills:newSkill}}=await addSkill({
                        variables:{
                            level:skillsList[i].level,
                            habit:skillsList[i].habit,
                            cv_id:newCv.id,
                        },
                    })
                    console.log(newSkill,'skill #',i,' added')
                }
                for (let i = 0; i<languagesList.length;i++){
                    const {data:{insertLanguages:newLanguage}}=await addLanguage({
                        variables:{
                            level:languagesList[i].level,
                            language:languagesList[i].language,
                            cv_id:newCv.id,
                        },
                    })
                    console.log(newLanguage,'language #',i,' added')
                }
            toast.update(id, { render: "You CV was saved ^_^", type: "success", isLoading: false, autoClose: 2000 });
        }catch(error){console.log("error",error)}

            setIsCongratulation(true)
            setIsConfetti(false)
    } else {
        toast.error("Choose your sample!")
    }
    };


    return (
        <>

            <div className='flex items-center space-x-3 overflow-x-scroll overflow-y-hidden overflow-clip scrollbar-hide w-[1400px] py-5 px-3 ml-auto mr-auto'>
                {/*<div onClick={()=>openModal(1)} >*/}
                {/*    <CVpdfStanford personal={personal} profileDescription={profileDescription}*/}
                {/*                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}*/}
                {/*                   languagesList={languagesList} />*/}
                {/*</div>*/}
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
                    <CVpdfErling personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
                <div onClick={()=>openModal(5)} className="  flex items-center justify-center">
                    <CVpdfTwilight personal={personal} profileDescription={profileDescription}
                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                   languagesList={languagesList}/>
                </div>
                <div onClick={()=>openModal(6)} className="  flex items-center justify-center ">
                    <CVpdfSparkle personal={personal} profileDescription={profileDescription}
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
                                        {/*<CVpdfStanford personal={personal} profileDescription={profileDescription}*/}
                                        {/*               educationList={educationList} experienceList={experienceList}*/}
                                        {/*               skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>*/}
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
                                    <div className={'flex'}>
                                        <div className='w-10/12'>
                                            <CVpdfOtago personal={personal} profileDescription={profileDescription}
                                                           educationList={educationList} experienceList={experienceList}
                                                           skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                        </div>
                                        <div className='w-7/12 mt-7'>
                                            <div
                                                className={'rounded-full bg-gray-800'}
                                                onClick={()=>changeColor('black')}>{isColor}</div>
                                            <div
                                                onClick={()=>changeColor('violet')}
                                                className={'rounded-full bg-violet-800'}>violet</div>
                                            <div
                                                onClick={()=>changeColor('blue')}
                                                className={'rounded-full bg-blue-500'}>blue</div>
                                            <div
                                                onClick={()=>changeColor('green')}
                                                className={'rounded-full bg-green-500'}>green</div>
                                            <div
                                                onClick={()=>changeColor('yellow')}
                                                className={'rounded-full bg-yellow-400'}>yellow</div>
                                            <div
                                                onClick={()=>changeColor('red')}
                                                className={'rounded-full bg-red-700'}>red</div>
                                        </div>
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
                                    <div className={'flex'}>
                                        <div className='w-10/12'>
                                            <CVpdfBerkeley personal={personal} profileDescription={profileDescription}
                                                           educationList={educationList} experienceList={experienceList}
                                                           skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                        </div>
                                        <div className='w-7/12 mt-7'>
                                            <div
                                                className={'rounded-full bg-gray-800'}
                                                onClick={()=>changeColor('black')}>{isColor}</div>
                                            <div
                                                onClick={()=>changeColor('violet')}
                                                className={'rounded-full bg-violet-800'}>violet</div>
                                            <div
                                                onClick={()=>changeColor('blue')}
                                                className={'rounded-full bg-blue-500'}>blue</div>
                                            <div
                                                onClick={()=>changeColor('green')}
                                                className={'rounded-full bg-green-500'}>green</div>
                                            <div
                                                onClick={()=>changeColor('yellow')}
                                                className={'rounded-full bg-yellow-400'}>yellow</div>
                                            <div
                                                onClick={()=>changeColor('red')}
                                                className={'rounded-full bg-red-700'}>red</div>
                                        </div>
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
            <Transition appear show={isOpen == 4} as={Fragment}>
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
                                    <div className='flex'>
                                        <div className='w-10/12'>
                                            <CVpdfErling personal={personal} profileDescription={profileDescription}
                                                         educationList={educationList} experienceList={experienceList}
                                                         skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                        </div>
                                        <div className='w-7/12 mt-7'>
                                            <div
                                                className={'rounded-full bg-gray-800'}
                                                onClick={()=>changeColor('black')}>{isColor}</div>
                                            <div
                                                onClick={()=>changeColor('violet')}
                                                className={'rounded-full bg-violet-800'}>violet</div>
                                            <div
                                                onClick={()=>changeColor('blue')}
                                                className={'rounded-full bg-blue-500'}>blue</div>
                                            <div
                                                onClick={()=>changeColor('green')}
                                                className={'rounded-full bg-green-500'}>green</div>
                                            <div
                                                onClick={()=>changeColor('yellow')}
                                                className={'rounded-full bg-yellow-400'}>yellow</div>
                                            <div
                                                onClick={()=>changeColor('red')}
                                                className={'rounded-full bg-red-700'}>red</div>
                                        </div>
                                    </div>

                                    <div className="-mt-2 p-2 text-center ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            //onClick={closeModal}
                                            onClick={()=>changeCV(4)}
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
            <Transition appear show={isOpen == 5} as={Fragment}>
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
                                    <div className='flex'>
                                        <div className='w-10/12'>
                                            <CVpdfTwilight personal={personal} profileDescription={profileDescription}
                                                         educationList={educationList} experienceList={experienceList}
                                                         skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                        </div>
                                        <div className='w-7/12 mt-7'>
                                            <div
                                                className={'rounded-full bg-gray-800'}
                                                onClick={()=>changeColor('black')}>{isColor}</div>
                                            <div
                                                onClick={()=>changeColor('violet')}
                                                className={'rounded-full bg-violet-800'}>violet</div>
                                            <div
                                                onClick={()=>changeColor('blue')}
                                                className={'rounded-full bg-blue-500'}>blue</div>
                                            <div
                                                onClick={()=>changeColor('green')}
                                                className={'rounded-full bg-green-500'}>green</div>
                                            <div
                                                onClick={()=>changeColor('yellow')}
                                                className={'rounded-full bg-yellow-400'}>yellow</div>
                                            <div
                                                onClick={()=>changeColor('red')}
                                                className={'rounded-full bg-red-700'}>red</div>
                                        </div>
                                    </div>

                                    <div className="-mt-2 p-2 text-center ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            //onClick={closeModal}
                                            onClick={()=>changeCV(5)}
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
            <Transition appear show={isOpen == 6} as={Fragment}>
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
                                    <div className='flex'>
                                        <div className='w-10/12'>
                                            <CVpdfSparkle personal={personal} profileDescription={profileDescription}
                                                           educationList={educationList} experienceList={experienceList}
                                                           skillsList={skillsList} languagesList={languagesList} type={'modalSample'}/>
                                        </div>
                                        <div className='w-7/12 mt-7'>
                                            <div
                                                className={'rounded-full bg-gray-800'}
                                                onClick={()=>changeColor('black')}>{isColor}</div>
                                            <div
                                                onClick={()=>changeColor('violet')}
                                                className={'rounded-full bg-violet-800'}>violet</div>
                                            <div
                                                onClick={()=>changeColor('blue')}
                                                className={'rounded-full bg-blue-500'}>blue</div>
                                            <div
                                                onClick={()=>changeColor('green')}
                                                className={'rounded-full bg-green-500'}>green</div>
                                            <div
                                                onClick={()=>changeColor('yellow')}
                                                className={'rounded-full bg-yellow-400'}>yellow</div>
                                            <div
                                                onClick={()=>changeColor('red')}
                                                className={'rounded-full bg-red-700'}>red</div>
                                        </div>
                                    </div>

                                    <div className="-mt-2 p-2 text-center ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            //onClick={closeModal}
                                            onClick={()=>changeCV(6)}
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
                <button
                    onClick={openCongratulation}
                    //onClick={() => exportPDFWithComponent()}
                        className=" bg-violet-700 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto"
                >
                    <div className="text-white text-lg font-semibold ">
                        Download PDF
                    </div>
                    <img src='/ChevronNext.svg' alt='next' className="h-6 w-6 text-center mt-auto mb-auto"/>
                </button>
                <Link href="/box/experiencepage">
                    <button className="bg-violet-50 px-12 py-3 rounded-md mt-5 flex ml-auto mr-auto">
                        <img src='/ChevronPrevious.svg' alt='previous' className="h-6 w-6 mt-auto mb-auto"/>
                        <div className="text-gray-400 text-md hover:text-gray-500">
                            Previous step
                        </div>
                    </button>
                </Link>
            </div>
            <div className='flex justify-center' style={{ position: "absolute", left: "-4000px", top: 0 }}>
                <PDFExport ref={pdfExportComponent} paperSize="A4">
                    {isChoose === 1 ?
                        <div className=''>
                            {/*<CVpdfStanford personal={personal} profileDescription={profileDescription}*/}
                            {/*               educationList={educationList} experienceList={experienceList} skillsList={skillsList}*/}
                            {/*               languagesList={languagesList} type={'downloadSample'}/>*/}
                        </div>
                        : isChoose === 2 ?
                            <div className=''>
                                <CVpdfOtago personal={personal} profileDescription={profileDescription}
                                            educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                            languagesList={languagesList} type={'downloadSample'}/>
                            </div>
                            : isChoose === 3 ?
                                <div>
                                    <div className=''>
                                        <CVpdfBerkeley personal={personal} profileDescription={profileDescription}
                                                   educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                                   languagesList={languagesList} type={'downloadSample'}/>
                                    </div>
                                </div>
                                : isChoose === 4 ?
                                    <div>
                                        <div className=''>
                                            <CVpdfErling personal={personal} profileDescription={profileDescription}
                                                           educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                                           languagesList={languagesList} type={'downloadSample'}/>
                                        </div>
                                    </div>
                                : isChoose === 5 ?
                                    <div>
                                        <div className=''>
                                            <CVpdfTwilight personal={personal} profileDescription={profileDescription}
                                                               educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                                               languagesList={languagesList} type={'downloadSample'}/>
                                        </div>
                                    </div>
                                :
                                        <div>
                                            <div className=''>
                                                <CVpdfSparkle personal={personal} profileDescription={profileDescription}
                                                               educationList={educationList} experienceList={experienceList} skillsList={skillsList}
                                                               languagesList={languagesList} type={'downloadSample'}/>
                                            </div>
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

            <Transition appear show={isCongratulation} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeCongratulation}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-violet-300 bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-violetShadow transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {sample ? 'Congratulations!!!' : 'Please choose a resume :3'}
                                    </Dialog.Title>
                                    <div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {sample ? 'Good job, you are taking confident steps towards your goal. Then you can go to the profile where you can see and change or delete your resume. Or go to the main page.' : '-_-'}
                                            </p>
                                        </div>

                                        {sample &&
                                            <div className="mt-4 flex justify-between">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                    //onClick={''}
                                                >
                                                    <Link href={'/'}>
                                                        Home
                                                    </Link>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                    //onClick={''}
                                                >
                                                    <Link href={'/box/profile'}>
                                                        Profile
                                                    </Link>
                                                </button>
                                            </div>}
                                        {!sample &&
                                            <div className="mt-4 flex justify-between">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                    onClick={closeCongratulation}
                                                >
                                                    Close
                                                </button>
                                            </div>}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
