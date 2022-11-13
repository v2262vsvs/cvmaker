import React, {Fragment, useState} from 'react';
import HeadMeta from "../../components/pageSections/HeadMeta";
import Footer from "../../components/pageSections/Footer";
import {toast} from "react-toastify";
import {signOut, useSession} from "next-auth/react";
import {useMutation, useQuery} from "@apollo/client";
import { GET_FULL_CVS_BY_EMAIL} from "../../graphql/queries";
import {DELETE_ACCOUNT_BY_EMAIL, DELETE_CV_BY_ID} from "../../graphql/mutations";
import { Dialog, Transition } from '@headlessui/react';
import {useTranslation} from "react-i18next";

const Settings = () => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false)
    const [delLoading, setDelLoading] = useState(false)

    function openLoading() {
        setDelLoading(true)
        handleDelete()
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const {data : session} = useSession()
    const [deleteAccount] = useMutation(DELETE_ACCOUNT_BY_EMAIL)
    const [deleteCv] = useMutation(DELETE_CV_BY_ID)

    const {data, error} = useQuery(GET_FULL_CVS_BY_EMAIL, {
        variables: {
            email: session?.user?.email
        }
    })
    if(error){
        return `Error! ${error}`
    }
    const DATA = data?.getCvsByAccountEmail

    const handleSave = async (e: any ) => {
        e.preventDefault()
        try {
            toast.success(t("Changes saved"));
        }catch(error){console.log("error",error)}
    }

    const handleDelete = async () => {
        const id = toast.loading(t("Deleting your account and resumes, please wait"))

        try {
            for (let i = 0; i < DATA.length; i ++) {
                try {
                    const {data: {}} = await deleteCv({
                        variables:{
                            cv_id: DATA[i].id
                        }
                    })
                } catch(error){
                    console.log("error",error)
                }
            }
            const {data:{}} = await deleteAccount({
                variables:{
                    email: session?.user?.email
                },
            })

            toast.update(id, { render: t("Account was deleted"), type: "success", isLoading: false, autoClose: 2000 });
        } catch(error){
            console.log("error",error)
            toast.error('error')
        }
        await signOut()
    }





    return (
        <>
            <HeadMeta title={'CV - Settings'} content={'Setting your profile'}/>

            <div className='flex flex-col  mx-auto lg:mt-16 absolute lg:left-28 z-20 left-6 mt-6 max-[758px]:h-[1000px]'>
                <div className="font-extrabold text-violet-700 text-4xl">
                    {t('Profile Settings')}
                </div>
                <div>
                    <div className={'my-7 text-gray-500 '}>{t('PERSONAL DATA IN CV')}</div>
                    <form className="bg-white w-[835px] p-8 rounded-xl shadow-violetShadow max-[886px]:w-11/12">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-first-name">
                                    {t('First Name')}
                                </label>
                                <input
                                    className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                    name={'name'}/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-last-name">
                                    {t('Last Name')}
                                </label>
                                <input
                                    className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                    name={'lastname'}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-password">
                                    {t('Email address')}
                                </label>
                                <input
                                    className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                    name={'email'}/>
                            </div>
                            <div className="w-full md:w-1/2 px-3 md:mt-12">
                                <button
                                    onClick={handleSave}
                                    className={'text-violet-700 font-bold'}>{t('SAVE')}</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div className={'my-7 text-gray-500 '}>{t('DANGER ZONE')}</div>
                    <div className={'flex flex-wrap bg-white w-[835px] p-8 rounded-xl justify-between shadow-violetShadow  max-[886px]:w-11/12'}>
                        <div>{t("IF YOU DELETE YOUR ACCOUNT, IT CANNOT BE RESTORED")}</div>
                        <button
                            className={'text-red-700 font-bold max-[710px]:mt-6'}
                            onClick={openModal}
                        >{t('DELETE')}</button>
                    </div>
                </div>

            </div>
            <svg
                className={'absolute bottom-0 right-0 z-10 pl-10 max-[768px]:hidden'}
                width="731" height="712" viewBox="0 0 731 712" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M376.058 83.2308C396.786 -1.07696 518.214 -1.07692 538.942 83.2309C552.332 137.693 615.522 163.538 663.991 134.377C739.021 89.2347 824.884 174.018 779.167 248.105C749.635 295.964 775.809 358.36 830.964 371.582C916.345 392.049 916.345 511.951 830.964 532.418C775.809 545.639 749.635 608.036 779.167 655.895C824.884 729.982 739.021 814.765 663.991 769.623C615.522 740.462 552.332 766.307 538.942 820.769C518.214 905.077 396.786 905.077 376.058 820.769C362.668 766.307 299.478 740.462 251.009 769.623C175.979 814.765 90.1162 729.982 135.833 655.895C165.365 608.036 139.191 545.639 84.0359 532.418C-1.34527 511.951 -1.34531 392.049 84.0358 371.582C139.191 358.36 165.365 295.964 135.833 248.105C90.1162 174.018 175.979 89.2347 251.009 134.377C299.478 163.538 362.668 137.693 376.058 83.2308Z" stroke="#8B5CF6" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M603.333 452C603.333 531.529 538.042 596 457.5 596C376.958 596 311.667 531.529 311.667 452C311.667 372.471 376.958 308 457.5 308C538.042 308 603.333 372.471 603.333 452Z" stroke="#8B5CF6" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="shadow-xl fixed bottom-0 z-30">
                <Footer />
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                                        {!delLoading ? t('Deleting Account') : t('Please wait...')}
                                    </Dialog.Title>
                                    {!delLoading ? (
                                        <div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {t('Are you sure you want to delete your account? If you delete your account, it cannot be restored.')}
                                                </p>
                                            </div>

                                            <div className="mt-4 flex justify-between">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                    onClick={openLoading}
                                                >
                                                    {t('Delete')}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    {t('Cancel')}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>{t('Deleting your account')}</div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Settings;
