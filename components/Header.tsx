import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router";
import {signIn, useSession} from 'next-auth/react'

import React, {useEffect, useState} from 'react'

import {debounce} from '../utils/debounce';
import Dropdown from "./Dropdown";

//import { BeakerIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'


function Header() {
    const {data: session} = useSession()
    console.log(session)
    const [open, setOpen] = useState(false)
    const onMenu = async (state: boolean) => {
        setOpen(state)
        console.log(open)
    }


    const signin = async () => {
        signIn().then()
    }

    // const singout = async ()=>{
    //     signOut().then()
    // }

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

    // const navbarStyles = {
    //     position: 'fixed',
    //     // height: '60px',
    //     width: '100%',
    //     // top: '0',
    //     // backgroundColor: 'grey',
    //     // textAlign: 'center',
    //     transition: 'top 0.6s',
    // } style={{ ...navbarStyles, top: visible ? '0' : '-60px' }} ts подсвечивает это как ошибку


    //delete gray line - border-r-2 border-gray-300

    const router = useRouter()

    return (
        <>
            {router.pathname !== '/signin' ? (
                <div style={{width: '100%', transition: 'top 0.5s', top: visible ? '0' : '-80px'}}
                     className={'flex justify-between sticky top-0 z-50 bg-white px-4 py-2 shadow-sm items-center space-x-10'}
                >
                    <div className='relative h-10 w-10 flex-shrink-0 cursor-pointer hover:shadow-md '>
                        <Link href="/">
                            <Image objectFit="cover"
                                   src="/logo.png"
                                   layout="fill"/>
                        </Link>
                    </div>
                    <div className='flex'>
                        <div className='flex items-center mx-7 xl:min-w-[300px] space-x-5  mr-3 px-3'>
                            <Link href={`/box/personal`}
                                  className='flex hover:text-green-900 ring-1 ring-green-900 rounded-md p-1 shadow-sm hover:shadow-md'>
                                Create My Resume
                            </Link>
                            <div className='flex items-center hover:text-blue-900'>
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
                        {/*<form*/}
                        {/*    className='hidden lg:flex items-center space-x-2 rounded-l-md border border-gray-200  bg-gray-100 px-3 py-1'>*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20"*/}
                        {/*         fill="currentColor">*/}
                        {/*        <path fillRule="evenodd"*/}
                        {/*              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"*/}
                        {/*              clipRule="evenodd"/>*/}
                        {/*    </svg>*/}
                        {/*    /!*<input className='bg-transparent  outline-none flex-1' type="text" placeholder='Search Employee'/>*!/*/}
                        {/*    <button type="submit" hidden={true}/>*/}
                        {/*</form>*/}

                        {/* sing in btn */}
                        {session ? (
                            <div className='flex'>
                                {/*<div onClick={() => singout()}*/}
                                {/*     className='flex items-center space-x-2 p-2 cursor-pointer border border-gray-100'>*/}
                                {/*    <div className='relative h-7 w-7 flex-shrink-0 rounded-full'>*/}
                                {/*        <Image objectFit='contain' src={`${session?.user?.image}`} layout="fill" className=''*/}
                                {/*               alt=""/>*/}
                                {/*    </div>*/}
                                {/*    <div className='felx flex-1 text-sm'>*/}
                                {/*        <p className='truncate text-xs'>{session?.user?.name}</p>*/}
                                {/*    </div>*/}
                                {/*    <ChevronDownIcon className='w-5 h-5 flex-shrink-0  text-gray-400'/>*/}
                                {/*</div>*/}
                                <div className='flex items-center space-x-2 p-2 cursor-pointer border border-gray-100'>
                                    {/*<div className='relative h-7 w-7 flex-shrink-0 rounded-full'>*/}
                                    {/*    <Image objectFit='contain' src={`${session?.user?.image}`} layout="fill" className=''*/}
                                    {/*           alt=""/>*/}
                                    {/*</div>*/}
                                    <Dropdown name={session?.user?.name} firstLink='Your profile' secondLink='Settings'
                                              typeProfile='profile' imageProfile={`${session?.user?.image}`}/>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div onClick={() => signin()}
                                     className='flex items-center space-x-2 p-2 cursor-pointer border  bg-violet-700 font-medium rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:bg-violet-500'>
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
                                className="bg-violet-700 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:bg-violet-500">
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
