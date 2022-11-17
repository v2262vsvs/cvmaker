import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from "next/image";
import {signOut} from "next-auth/react";
import { useRouter } from 'next/router';
import {useTranslation} from "react-i18next";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props: any) {
    const { t } = useTranslation();

    const router = useRouter()

    const {firstLink, name, secondLink, typeProfile, imageProfile, createLink, createLink2} = props

    const singout = async (e:React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault()
        await signOut()
    }

    const handleRoute2 = async () => {
        await router.push(createLink2)
    }
    const handleRoute1 = async () => {
        await router.push(createLink)
    }

    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button
                    className={classNames(
                        typeProfile ? 'inline-flex  w-full justify-between rounded-lg border  bg-violet-700 px-4 py-2 text-sm font-semibold text-white focus:outline-none ' +
                            'animation-button'
                            : 'inline-flex justify-center hover:text-violet-700'
                    )}
                    >
                    {typeProfile &&
                        <div className='relative h-6 w-6 mr-2 '>
                            <Image objectFit='contain' src={imageProfile} layout="fill" className='rounded-full' alt='/'/>
                        </div>}
                    <div className={`${typeProfile ? 'py-0.5' : ''}`}>{name}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white  ring-1 ring-violet-500 ring-opacity-5 focus:outline-none font-semibold shadow-violetShadowMenu">
                    <div className="py-1">
                        <div onClick={()=>handleRoute2()} className=''>
                        <Menu.Item>
                            {({ active }) => (
                                <a

                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {firstLink}
                                </a>
                            )}
                        </Menu.Item>
                        </div>
                        <div onClick={()=>handleRoute1()}>
                        <Menu.Item>
                            {({ active }) => (
                                <a

                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {secondLink}
                                </a>
                            )}
                        </Menu.Item>
                        </div>
                        {typeProfile &&
                            <form onClick={(e) => singout(e)} method="POST" action="#">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button

                                            className={classNames(
                                                active ? 'bg-violet-200 text-violet-700' : 'text-violet-400',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            {t('Sign out')}
                                        </button>
                                    )}
                                </Menu.Item>
                            </form>}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
