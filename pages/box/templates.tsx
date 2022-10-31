import Link from 'next/link';
import React from 'react';
import Footer from '../../components/pageSections/Footer';
import HeadMeta from "../../components/pageSections/HeadMeta";
import CvCards from '../../components/resumeComponents/CvCards';

const Templates = () => {
    return (
        <>
            <HeadMeta title={'CV - Templates'} content={'add later some text'}/>
            <div className='m-20 mb-20'>
                <div className="mt-5 mx-20">
                    <div className="flex justify-between">
                        <div className="font-extrabold text-violet-700 text-xl xl:text-2xl 2xl:text-4xl">
                            Resumes Templates
                        </div>
                        <div className="flex mt-5 px-8 space-x-2 py-4 bg-violet-700 rounded-lg hover:shadow-lg shadow-md cursor-pointer">
                            <Link href="/box/personal">
                                <button
                                    className="text-white font-medium text-xl">
                                    Create Resume
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-start space-x-10 border-1 border-gray-500 border-b">
                        <div className="   border-violet-700 border-b-2">Resumes</div>
                    </div>
                </div>

                <div className='flex'>
                   <div className='w-10/12 ml-14'>
                       {/*@ts-ignore*/}
                       <CvCards/>
                   </div>
                    <div className='w-2/12 mt-8 space-y-2 -ml-6 mr-20'>
                        <div className="mb-1 font-medium text-lg text-gray-500">New Resume</div>
                        <div  className="flex text-gray-500 text-sm font-light cursor-pointer">
                            <div>You can start by filling your resume with data and choose a template at the end</div>
                        </div>
                    </div>
                </div>


            </div>
            <div className=''>
                <Footer/>
            </div>

        </>
    );
};

export default Templates;
