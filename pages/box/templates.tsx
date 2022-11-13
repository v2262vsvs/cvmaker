import Link from 'next/link';
import React from 'react';
import Footer from '../../components/pageSections/Footer';
import HeadMeta from "../../components/pageSections/HeadMeta";
import CvCards from '../../components/resumeComponents/CvCards';
import {useTranslation} from "react-i18next";

const Templates = () => {
    const { t } = useTranslation();

    return (
        <div className={'overflow-x-hidden'}>
            <HeadMeta title={'CV - Templates'} content={'add later some text'}/>
            <div className='m-6 mb-20'>
                <div className="mt-5 md:mx-20">
                    <div className="flex justify-between">
                        <div className="font-extrabold text-violet-700 text-xl xl:text-2xl 2xl:text-4xl max-[500px]:w-1/3 max-[500px]:mb-2">
                            {t('Resume Templates')}
                        </div>
                        <div className="flex  px-8 space-x-2 py-4 bg-violet-700 rounded-lg hover:shadow-lg shadow-md cursor-pointer animation-button">
                            <Link href="/box/personal">
                                <button
                                    className="text-white font-medium text-xl max-[353px]:text-sm ">
                                    {t('Create Resume')}
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-start space-x-10 border-1 border-gray-500 border-b">
                        <div className="   border-violet-700 border-b-2">{t('Resumes')}</div>
                    </div>
                </div>

                <div className='flex'>
                   <div className='md:w-10/12 md:ml-14 w-screen -ml-4 '>
                       <CvCards/>
                   </div>
                    <div className='w-2/12 mt-8 space-y-2 ml-2 mr-20'>
                        <div className="mb-1 font-medium text-lg text-gray-500">{t('New Resume')}</div>
                        <div  className="flex text-gray-500 text-sm font-light cursor-pointer">
                            <div>{t('You can start by filling your resume with data and choose a template at the end')}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Templates;
