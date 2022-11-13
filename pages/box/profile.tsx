import {useMutation, useQuery} from "@apollo/client";
import {useSession} from "next-auth/react";
import React, {Fragment, useEffect, useState} from 'react'
import HeadMeta from "../../components/pageSections/HeadMeta";
import Footer from "../../components/pageSections/Footer";
import CVpdfBerkeley from "../../components/resumeComponents/pdfSamples/CVpdfBerkeley";
import CVpdfErling from "../../components/resumeComponents/pdfSamples/CVpdfErling";
import CVpdfOtago from "../../components/resumeComponents/pdfSamples/CVpdfOtago";
import CVpdfSparkle from "../../components/resumeComponents/pdfSamples/CVpdfSparkle";
import CVpdfTwilight from "../../components/resumeComponents/pdfSamples/CVpdfTwilight";
import { GET_FULL_CVS_BY_ACCOUNT_EMAIL} from "../../graphql/queries";
import {Dialog, Transition} from '@headlessui/react'
import Link from "next/link";
import {useRouter} from 'next/router'
import Confetti from 'react-confetti'
import {PDFExport} from "@progress/kendo-react-pdf";
import {DELETE_CV_BY_ID} from "../../graphql/mutations";
import {toast} from 'react-toastify'
import {PlusIcon} from '@heroicons/react/solid'
import {PencilIcon, DownloadIcon, TrashIcon} from '@heroicons/react/outline'
import {useTranslation} from "react-i18next";



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
            const handleResize = () => {
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




function Profile() {

    const {t} = useTranslation();
    const [isConfetti, setIsConfetti] = useState<boolean>(false)
    const {data: session} = useSession()
    const router = useRouter()
    const [deleteCv] = useMutation(DELETE_CV_BY_ID)
    const pdfExportComponent = React.useRef<PDFExport>(null);
    const [isOpen, setIsOpen] = useState<number>(0)
    const size = useWindowSize();



    const {data,refetch} = useQuery(GET_FULL_CVS_BY_ACCOUNT_EMAIL, {
        variables: {
            email: session?.user?.email
        }
    })
    const DATA = data?.getCvsByAccountEmail[0]
    const CV = {...DATA}

    const dynamicRoute = useRouter().asPath;
    useEffect(() => {

        refetch({ email: session?.user?.email })
    }, [dynamicRoute])



    function openModal(n: number) {
        if (size.height > 940 && size.width > 650) {
            setIsOpen(n)
        }
        // setIsOpen(n)
    }

    function closeModal() {
        setIsOpen(0)
    }

    const handleEdit = async () => {
        const arr = [CV.userinfoList[0], CV.educationList ,CV.experienceList, CV.languagesList, CV.skillsList, CV.description]
        const arr2 = ["PERSONAL_STATE" ,"EDUCATION_STATE", "EXPERIENCE_STATE", "LANGUAGES_STATE", "SKILLS_STATE", "PROFILE_DESCRIPTION_STATE"]
        for (let i = 0; i < arr.length; i++) {
            window.localStorage.setItem(arr2[i], JSON.stringify(arr[i]));
            console.log(`${arr2[i]} storage`, window.localStorage.getItem(arr2[i]))
        }
        await router.push('/box/personal')
    }
    const handleDelete = async () => {
        try {
            const {data: {deleteUserByCvId: {}}} = await deleteCv({
                variables: {
                    cv_id: CV.id
                },
            })

            toast.success(t("Your last CV deleted!"))
            location.reload();
        } catch (error) {
            console.log("error", error)
        }
    }

    const exportPDFWithComponent = async () => {
        setIsConfetti(true)
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
        setTimeout(() => {
            setIsConfetti(false)
        }, 6000)
        toast.success(t('You download your CV'))
    };

    const CVS: any = () => {
        switch (CV.sample) {
        case 2:
            return (
                <CVpdfOtago
                    personal={CV.userinfoList[0]}
                    profileDescription={CV.description}
                    colorDB={CV.color}
                    {...CV}
                    type={'downloadSample'}/>)
        case 3:
            return (
                <CVpdfBerkeley
                    personal={CV.userinfoList[0]}
                    profileDescription={CV.description}
                    colorDB={CV.color}
                    {...CV}
                    type={'downloadSample'}/>)
        case 4:
            return (
                <CVpdfErling
                    personal={CV.userinfoList[0]}
                    profileDescription={CV.description}
                    colorDB={CV.color}
                    type={'downloadSample'}
                    {...CV}/>)
        case 5:
            return (
                <CVpdfTwilight
                    personal={CV.userinfoList[0]}
                    profileDescription={CV.description}
                    colorDB={CV.color}
                    {...CV}
                    type={'downloadSample'}/>)
        case 6:
            return (
                <CVpdfSparkle
                    personal={CV.userinfoList[0]}
                    profileDescription={CV.description}
                    colorDB={CV.color}
                    {...CV}
                    type={'downloadSample'}/>)
    }}

    return (
        <>
            <div className="bg-violet-50 h-full overflow-y-hidden">
                <div className=" h-full w-full bg-violet-50 relative">
                    <HeadMeta title={'Your Profile'} content={'add later some text'}/>
                    <div className="mt-5 sm:mx-20 max-sm:mx-5">
                        <div className="flex justify-between">
                            <div className="font-extrabold text-violet-700 text-xl xl:text-2xl 2xl:text-4xl  max-[500px]:w-1/3 max-[500px]:mb-2">
                                {t('Resumes')}
                            </div>
                            <div
                                className="flex px-8 space-x-2 py-4 bg-violet-700 rounded-lg hover:shadow-lg shadow-md cursor-pointer max-[418px]:p-3 animation-button">
                                <Link href="/box/personal">
                                    <button
                                        className="text-white font-medium text-xl max-[347px]:text-sm ">
                                        {t('Create New')}
                                    </button>
                                </Link>
                                <div className="h-7 w-7 text-white ">
                                    <PlusIcon/>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start space-x-10 border-1 border-gray-500 border-b">
                            <div className="   border-violet-700 border-b-2">{t('Resumes')}</div>
                        </div>
                    </div>

                    <div className="flex ">
                        {data?.getCvsByAccountEmail.length > 0 ? (
                            <div className="flex   max-[600px]:flex-col-reverse max-[600px]:mx-auto max-[600px]:-mt-24 max-[460px]:-ml-14 max-[600px]:scale-75">
                                <div className="md:mx-14 mt-3 mb-32" onClick={()=> openModal(2)}>
                                    <div className={'sampleScale50 overflow-hidden  rounded-xl shadow-violetShadow'}>
                                        <CVS/>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-2 lg:-ml-20  max-[767px]:p-2 max-[600px]:flex max-[600px]:space-x-10 max-[460px]:-ml-1">
                                    <div className="mb-1 font-medium text-lg max-[615px]:hidden">{t('Your last CV')}</div>
                                    <div onClick={() => handleEdit()}
                                         className="flex space-x-1 hover:border-b hover:border-violet-700 w-fit cursor-pointer">
                                        <div className="h-5 w-5 text-violet-600 ">
                                            <PencilIcon/>
                                        </div>
                                        <div>{t('Edit')}</div>
                                    </div>
                                    <div onClick={() => exportPDFWithComponent()}
                                         className="flex space-x-1 hover:border-b  hover:border-violet-700 w-fit cursor-pointer">
                                        <div className="h-5 w-5 text-violet-600">
                                            <DownloadIcon/>
                                        </div>
                                        <div>{t('Download PDF')}</div>
                                    </div>
                                    <div onClick={() => handleDelete()}
                                         className="flex space-x-1 hover:border-b hover:border-violet-700 w-fit cursor-pointer">
                                        <div className="h-5 w-5 text-violet-600">
                                            <TrashIcon/>
                                        </div>
                                        <div>{t('Delete')}</div>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            // <div className="ml-16 2xl:-ml-2 mt-3 mb-32"></div>
                            <div className="mt-3 md:ml-28 min-[1237px]:hidden max-[600px]:mx-auto max-[460px]:-mt-16 max-[600px]:scale-75 mb-4 ">
                                <Link href="/box/personal">
                                    <div
                                        className='bg-white w-[595px] h-[842px] scale-65  hover:opacity-80 rounded-2xl -mt-32  -mb-32 -ml-32 -mr-10  overflow-hidden  rounded-xl shadow-violetShadow'>
                                        <div
                                            className="rounded-full bg-violet-300 hover:-scale-105 bg-opacity-25 w-48 h-48  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div
                                                className="h-24 w-24 text-violet-700  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <PlusIcon/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}


                        <div className="mt-3 ml-10 2xl:ml-28 max-[1237px]:hidden ">
                            <Link href="/box/personal">
                                <div
                                    className='bg-white w-[595px] h-[842px] scale-65  hover:opacity-80 rounded-2xl -mt-32  -mb-32 -ml-32 -mr-10  overflow-hidden  rounded-xl shadow-violetShadow'>
                                    <div
                                        className="rounded-full bg-violet-300 hover:-scale-105 bg-opacity-25 w-48 h-48  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div
                                            className="h-24 w-24 text-violet-700  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <PlusIcon/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="mt-8 space-y-2 -ml-6 mr-20 max-[1237px]:hidden">
                            <div className="mb-1 font-medium text-lg text-gray-500">{t('New Resume')}</div>
                            <div className="flex text-gray-500 text-sm font-light cursor-pointer">
                                <div>{t('Create a tailored resume for each job')}
                                    <div>{t('application. Double your chances of')}
                                        <div>{t('getting hired!')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                            <div className={'sampleScale50 overflow-hidden'}>
                                                <CVS/>
                                            </div>
                                            <div className="-mt-4 text-center p-2 ">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-500 px-8 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                                    onClick={closeModal}
                                                >
                                                    {t('Close')}
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    <div className='flex justify-center' style={{position: "absolute", left: "-4000px", top: 0}}>
                        <PDFExport ref={pdfExportComponent} paperSize="A4">
                            <CVS/>
                        </PDFExport>
                    </div>

                    {isConfetti &&
                        <Confetti
                            width={window.innerWidth - 50}
                            height={window.innerHeight + 50}
                            numberOfPieces={500}
                            className={'-mt-20'}
                        />}

                    <div className="shadow-xl fixed bottom-0  ">
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
}



export default Profile;


