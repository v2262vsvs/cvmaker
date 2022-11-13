import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router";
import {signIn, useSession} from 'next-auth/react'
import React, {useEffect, useState} from 'react'
import {debounce} from '../../utils/debounce';
import Dropdown from "../elementsUI/Dropdown";
import LanguageSwitcher from "../elementsUI/LanguageSwitcher";
import {useTranslation} from "react-i18next";
import MenuDropdown from "../elementsUI/MenuDropdown";


function Header() {
    const { t } = useTranslation();

    const {data: session} = useSession()
    console.log(session)

    const signin = async () => {
        await signIn()
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
                <nav  style={{width: '100%', transition: 'top 0.5s', top: visible ? '0' : '-80px'}}
                    className="bg-white shadow-violet-200 shadow-sm absolute top-0 right-0 left-0 z-50 sticky">
                    <div className=" mx-auto px-4">
                        <div className="flex justify-between">
                            <div className="flex space-x-7">
                                <div>
                                    <Link href="/" className="flex items-center py-2 px-2">
                                        <div className="flex items-center py-2 px-2 ">
                                            <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-2 animation-button rounded"/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-3 ">
                                <div className="hidden md:flex items-center space-x-1">
                                    <div
                                        className="py-4 px-2 text-gray-600 font-semibold hover:text-violet-700 hover:border-b-4 border-violet-700 ">
                                        <Link href={ `/box/personal`}>
                                            {t('Create CV')}
                                        </Link>
                                    </div>
                                    <div
                                        className="py-4 px-2 text-gray-600 font-semibold hover:text-violet-700 hover:border-b-4 border-violet-700 ">
                                        <Dropdown name={t('Resume')} firstLink={t('Templates')} secondLink={t('Create Resume')}
                                                  createLink='/box/personal' createLink2='/box/templates'/>
                                    </div>
                                    <div
                                        className="py-4 px-2 text-gray-600 font-semibold hover:text-violet-700 hover:border-b-4 border-violet-700 ">
                                        <Link href={`/box/blog`}>
                                            {t('Blog')}
                                        </Link>
                                    </div>
                                    <div
                                        className="py-4 px-2 text-gray-600 font-semibold hover:text-violet-700 hover:border-b-4 border-violet-700 ">
                                        <Link href={`/box/faq`}>
                                            {t('FAQ')}
                                        </Link>
                                    </div>
                                    <div
                                        className="py-4 px-2 text-gray-600 font-semibold hover:text-violet-700 hover:border-b-4 border-violet-700 ">
                                        <LanguageSwitcher/>
                                    </div>
                                </div>

                                {session ? (
                                    <div className='flex'>
                                        <div className='flex items-center space-x-2 p-2 cursor-pointer  '>
                                            <Dropdown name={session?.user?.name} firstLink={t('Your profile')} secondLink={t('Settings')} createLink2='/box/profile' createLink='/box/settings'
                                                      typeProfile='profile' imageProfile={`${session?.user?.image}`}/>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div onClick={() => signin()}
                                             className={"flex space-x-2 py-2 px-4 font-semibold text-white bg-violet-700 rounded animation-button"}
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
                            <div className="md:hidden flex items-center">
                                <MenuDropdown/>
                            </div>
                        </div>
                    </div>
                </nav>
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
                                {t('Go back home')}
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
