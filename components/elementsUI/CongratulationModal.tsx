import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setCongratulation} from "../../slices/navSlice";

const CongratulationModal = () => {

    const sample = useSelector((state: RootState) => state.nav.choose);
    const congratulation = useSelector((state: RootState) => state.nav.congratulation);
    const dispatch = useDispatch();

    function closeCongratulation () {
        dispatch(setCongratulation(false))
    }

    return (
        <Transition appear show={congratulation} as={Fragment}>
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
                                            >
                                                <Link href={'/'}>
                                                    Home
                                                </Link>
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
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
    );
};

export default CongratulationModal;
