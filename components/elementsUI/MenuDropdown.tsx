import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Dropdown from "./Dropdown";
import {signIn, useSession} from "next-auth/react";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";


function classNames(...classes :any) {
    return classes.filter(Boolean).join(' ')
}

export default function MenuDropdown() {
    const {data: session} = useSession()
    const { t } = useTranslation();
    const signin = async () => {
        await signIn()
    }


    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md   bg-white px-2 py-2 transition ease-in-out delay-150  hover:scale-110  duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-violet-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-md shadow-violetShadowMenu ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <Menu.Item>
                        {({ active }) => (
                            <div
                                className={classNames(
                                    active ? 'bg-white text-violet-700' : 'text-gray-600',
                                    'block text-sm px-0.5'
                                )}
                            >
                                <div className='flex items-center space-x-2 p-2 cursor-pointer  '>
                                    {session ? (
                                        <Dropdown name={session?.user?.name} firstLink={t('Your profile')} secondLink={t('Settings')} createLink2='/box/profile' createLink='/box/settings'
                                                  typeProfile='profile' imageProfile={`${session?.user?.image}`}/>
                                    ) : (
                                        <div>
                                            <div onClick={() => signin()}
                                                //className='flex items-center space-x-2  cursor-pointer border  bg-violet-700  rounded-md py-1 px-3 xl:py-3 xl:px-6 hover:bg-violet-500'
                                                 className={"flex space-x-2 py-2 px-4 font-semibold text-white bg-violet-700 rounded animation-button w-52 ml-1.5"}
                                            >
                                                <div className='relative h-5 w-5 flex-shrink-0 hover:scale-95'>
                                                    <Image objectFit='contain' src="/login.svg"
                                                           layout="fill" className='' alt=""/>
                                                </div>
                                                <p className='text-white '>{t("Login/Register")}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Menu.Item>
                    <div className="py-1 flex flex-col">

                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 font-semibold'
                                    )}
                                >
                                    <Link href={ `/box/personal`}>
                                        {t('Create CV')}
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 font-semibold '
                                    )}
                                >
                                    <Dropdown name={t('Resume')} firstLink={t('Templates')} secondLink={t('Create Resume')}
                                              createLink='/box/personal' createLink2='/box/templates'/>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 font-semibold '
                                    )}
                                >
                                    <Link href={`/box/blog`}>
                                        {t('Blog')}
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 font-semibold  '
                                    )}
                                >
                                    <Link href={`/box/faq`}>
                                        {t('FAQ')}
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active ? 'bg-violet-200 text-violet-700' : 'text-gray-600',
                                        'block px-4 py-2 font-semibold '
                                    )}
                                >
                                   <LanguageSwitcher/>
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
