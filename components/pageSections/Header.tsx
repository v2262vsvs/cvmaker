import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router";
import {signIn, useSession} from 'next-auth/react'

import React, {useEffect, useState} from 'react'

import {debounce} from '../../utils/debounce';
import Dropdown from "../elementsUI/Dropdown";


function Header() {
    const {data: session} = useSession()
    console.log(session)
    const [open, setOpen] = useState(false)
    const onMenu = async (state: boolean) => {
        setOpen(state)
        console.log(open)
    }
    // проблема с логином , вылизазит 404


    const signin = async () => {
        signIn()
    }


    //add hidden bar

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);
    // hidden bar end


    const router = useRouter()

    return (
        <>
            {router.pathname !== '/auth/signin' ? (
                <div style={{width: '100%', transition: 'top 0.5s', top: visible ? '0' : '-80px'}}
                     className={'flex justify-between sticky top-0 z-50 bg-white px-4 py-2 shadow-sm items-center space-x-10'}
                >
                    <div className='relative h-10 w-10 flex-shrink-0 cursor-pointer hover:shadow-md '>
                        <Link href="/">
                            <img src='/logo.png' alt='logo'/>
                        </Link>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center mx-7 xl:min-w-[300px] space-x-5  mr-3 px-3'>
                            <div className='text-violet-700 hover:opacity-110  '>
                            <Link href={`/box/personal`} className='flex  hover:text-green-900 ring-1 ring-green-900 rounded-md p-1 shadow-sm hover:shadow-md'>
                                Create CV
                            </Link>
                            </div>
                            <div className='flex items-center  hover:text-blue-900'>
                                <Dropdown name='Resume' firstLink='Templates' secondLink='Create Resume'
                                          createLink='/box/personal'/>
                            </div>
                            <div className='flex items-center hover:text-blue-900'>
                                <Dropdown name='Cover Letter' firstLink='Templates' secondLink='Create Cover Letter'/>
                            </div>
                            <Link href={`/box/blog`}
                                  className='flex hover:text-green-900 ring-1 ring-green-900 rounded-md p-1 shadow-sm hover:shadow-md'>
                                Blog
                            </Link>
                            <Link href={`/box/faq`}
                                  className='flex hover:text-green-900 ring-1 ring-green-900 rounded-md p-1 shadow-sm hover:shadow-md'>
                                FAQ
                            </Link>
                        </div>

                        {session ? (
                            <div className='flex'>
                                <div className='flex items-center space-x-2 p-2 cursor-pointer '>
                                    <Dropdown name={session?.user?.name} firstLink='Your profile' secondLink='Settings'
                                              typeProfile='profile' imageProfile={`${session?.user?.image}`}/>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div onClick={() => signin()}
                                     className='flex items-center space-x-2  cursor-pointer border  bg-violet-700 font-medium rounded-md py-1 px-3 xl:py-3 xl:px-6 hover:bg-violet-500'>
                                    <div className='relative h-5 w-5 flex-shrink-0 hover:scale-95'>
                                        <Image objectFit='contain' src="/login.svg"
                                               layout="fill" className='' alt=""/>
                                    </div>
                                    <p className='text-white'>Login / Register</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className='flex justify-between sticky top-0 z-50 bg-white px-4 py-2 shadow-sm items-center space-x-10'>
                    <div className='relative h-10 w-10 flex-shrink-0 cursor-pointer hover:shadow-md '>
                        <Link href="/">
                            <Image objectFit="cover"
                                   src="/logo.png"
                                   layout="fill"/>
                        </Link>
                    </div>
                    <div className='flex'>
                        <Link href="/">
                            <button
                                className="bg-violet-700 text-white text-lg xl:text-lg font-medium rounded-md  py-1 px-3 xl:py-3 xl:px-6 hover:bg-violet-500">
                                Go back home
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
