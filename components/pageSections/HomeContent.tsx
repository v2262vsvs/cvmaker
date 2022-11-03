import React from 'react';
import Image from "next/image";
import Link from "next/link";
import CvCards from "../resumeComponents/CvCards";

import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/client";
import {GET_COUNT_OF_ACCOUNTS} from "../../graphql/queries";

const HomeContent: any = () => {

    const { t } = useTranslation();

    const {data, error} = useQuery(GET_COUNT_OF_ACCOUNTS)
    if(error){
        return `Error! ${error}`
    }

    const CountAccounts = data?.getCountOfAccounts

    return (
        <div className=''>
            <div className=" pb-5 pt-2 max-w-2xl max-h-96 container mx-auto rounded-b-xl">
                <div
                    className="ml-auto mr-auto mt-12 items-center text-center max-w-[500px] lg:max-w-[650px] space-y-4">
                    <p className="text-gray-500 text-sm font-medium text-center">
                        {t('ONLINE CV BUILDER')}
                    </p>
                    <div className="text-2xl text-gray-900 font-extrabold lg:text-5xl">
                        {t('MAKE YOUR')}<br/> <span className='text-violet-700'>{t('AWESOME RESUME')}</span> <br/>  {t('HERE')}
                    </div>
                    <p className="text-gray-500 text-md lg:text-lg">
                        {t('According to studies, on average, recrutiers spend more')} <br/> {t('than 10 seconds reviewing a resume! Increase your chances by')} <br/> {t('making an unforgettable resume in just a few minutes!')}
                    </p>
                    <Link href="/box/personal">
                        <button
                            className="bg-violet-700 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:shadow-lg">
                            {t('Create My Resume')}
                        </button>
                    </Link>
                </div>
            </div>

            <div className='bg-white container mx-auto mt-16'>
                <Image src='/Photo.svg' width='1528' height='412'/>
            </div>

            <div className='bg-white flex justify-center px-4 py-2'>
                <Image className='' src='/Chevrondown.svg' width='46' height='46'/>
            </div>

            <div className='bg-white container mx-auto mt-28 mb-28 '
                 style={{width: '1528px', height: '528px'}}
            >
                <div className='h-14'></div>

                <div className='felx place-items-center text-center items-center justify-center '>
                    <div className='space-y-3'>
                        <div className='text-md text-violet-700 lg:text-lg  '>{t('ADVICES')}</div>
                        <div className="text-xl text-black font-extrabold  lg:text-3xl">{t('Higher chance of getting a job')}</div>
                        <div className='text-gray-500 text-sm lg:text-md'>Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam <br/> voluptatum cupiditate veritatis in accusamus quisquam</div>
                    </div>
                </div>

                <div className='flex justify-center ml-10 mr-10 space-x-16 mt-12'>
                    <div className='flex space-x-4'>
                        <div className='bg-violet-700 rounded-md w-10 h-10'><img className='mx-auto mt-3' src='/dude1.svg' alt='dude1'/></div>
                        <div>
                            <div className="text-sm text-black  lg:text-md">{t('Higher chance')}</div>
                            <div className='text-gray-500 text-xs lg:text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores <br/>impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis <br/>ratione. </div>
                        </div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className='bg-violet-700 rounded-md w-10 h-10'><img className='mx-auto mt-3' src='/dude2.svg' alt='dude2'/></div>
                        <div>
                            <div className="text-sm text-black  lg:text-md">{t('Fast and easy')}</div>
                            <div className='text-gray-500 text-xs lg:text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores <br/>impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis <br/>ratione. </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center ml-10 mr-10 space-x-16 mt-16'>
                    <div className='flex space-x-4'>
                        <div className='bg-violet-700 rounded-md w-10 h-10'><img className='mx-auto mt-3' src='/dude3.svg' alt='dude3'/></div>
                        <div>
                            <div className="text-sm text-black  lg:text-md">{t('Approved templates')}</div>
                            <div className='text-gray-500 text-xs lg:text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores <br/>impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis <br/>ratione. </div>
                        </div>
                    </div>
                    <div className='flex space-x-4'>
                        <div className='bg-violet-700 rounded-md w-10 h-10'><img className='mx-auto mt-3' src='/dude4.svg' alt='dude4'/></div>
                        <div>
                            <div className="text-sm text-black  lg:text-md">{t('Data is safe')}</div>
                            <div className='text-gray-500 text-xs lg:text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores <br/>impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis <br/>ratione. </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-violet-700 flex-row'
                 style={{width: '100%', height: '1693px'}}
            >
                <div className='bg-violet-50' style={{height: 1}}></div>
                <div className='bg-white mt-28   place-items-center text-center items-center flex justify-center' style={{width: '100%', height: '268px'}}>
                        <div className=' space-y-3'>
                        <div className='text-md text-violet-700 lg:text-lg  '>{t('TEMPLATES')}</div>
                        <div className="text-xl text-black font-extrabold lg:text-3xl">{t('Try our constructor now!')}</div>
                        <p className="text-gray-500 text-sm lg:text-md mb-16">
                            {t('Win over employers and recruiters by using one of our 5')} <br />{t('professionally-designed cv templates.')} <br />{t('Download to PDF.')}
                        </p>
                        </div>
                </div>

                <Link href={'/box/personal'}>
                    <div className='ml-32 mr-10' >
                        <CvCards/>
                    </div>
                </Link>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="100%"  className='animation-svg animation -mt-0'>
                <defs>
                    <pattern id="blocks" patternUnits="userSpaceOnUse" width="200" height="196">
                        <rect width="100" height="100" className="topleft black"/>
                        <rect width="100" height="100" className="topright white" x="100"/>
                        <rect width="100" height="100" className="bottomleft white" y="100"/>
                        <rect width="100" height="100" x="100" y="100" className="bottomright black"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blocks)"/>
            </svg>

            <div className=" pb-5 pt-2 container mx-auto mb-16 mt-16" style={{marginTop: '2px'}}>
                <div
                    style={{width: '850px', height: '325px'}}
                    className="ml-auto mr-auto mt-12 items-center text-center max-w-[887px] lg:max-w-[887px] space-y-5"
                >
                    <div className="text-2xl text-black font-extrabold lg:text-4xl">{t('More than')} <span className='text-violet-700'>{CountAccounts ? CountAccounts[0].id : '1000'}</span> {t('users have')} <div> {t('already made their ')} <span className='text-violet-700'>CV</span></div>
                    </div>
                    <p className="text-gray-500 text-sm lg:text-md mb-16">
                        {t('Increase your chances of employment, make a cool resume in a short time')}
                    </p>
                    <div className=''>
                    <Link href="/box/personal">
                        <button
                            className="bg-violet-700 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:shadow-lg">
                            {t('Create My Resume')}
                        </button>
                    </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomeContent;
