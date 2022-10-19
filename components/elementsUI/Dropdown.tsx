import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from "next/image";
import {signOut} from "next-auth/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props: any) {

    const {firstLink, name, secondLink, typeProfile, imageProfile, createLink, createLink2} = props

    const singout = async (e:React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault()
        signOut()
    }
//className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    className={classNames(
                        typeProfile ? 'inline-flex w-full justify-center rounded-lg border border-gray-300 bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-lg focus:outline-none '
                            //: 'inline-flex w-full justify-center  px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'
                            : 'inline-flex justify-center hover:text-violet-700'
                    )}
                    >
                    {typeProfile &&
                        <div className='relative h-6 w-6 mr-3'>
                            <Image objectFit='contain' src={imageProfile} layout="fill" className='rounded-full' alt='/'/>
                        </div>}
                    {name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href={createLink2}
                                    className={classNames(
                                        active ? 'bg-violet-200 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {firstLink}
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href={createLink}
                                    className={classNames(
                                        active ? 'bg-violet-200 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {secondLink}
                                </a>
                            )}
                        </Menu.Item>
                        {typeProfile &&
                            <form onClick={(e) => singout(e)} method="POST" action="#">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button

                                            className={classNames(
                                                active ? 'bg-violet-200 text-violet-800' : 'text-violet-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Sign out
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
