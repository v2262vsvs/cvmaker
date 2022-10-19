import Link from 'next/link';
import React from 'react';
import Footer from '../../components/pageSections/Footer';
import HeadMeta from "../../components/pageSections/HeadMeta";
import CvCards from '../../components/resumeComponents/CvCards';

const tamplate = () => {
    return (
        <>
            <HeadMeta title={'CV - FAQ'} content={'add later some text'}/>
            <div className='m-20 mb-20'>
                <div className='flex'>
                    <div className='w-10/12'>Resume templates</div>
                    <Link href="/box/personal">
                        <button
                            className="bg-violet-700 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:shadow-lg">
                            Create Resume
                        </button>
                    </Link>
                    
                </div>
                <div>
                        Resume
                        <hr/>
                </div>

                <div className='flex'>
                   <div className='w-10/12'> <CvCards/></div>
                    <div className='w-2/12 mt-14'>
                        <div>New resume</div>
                        <div>You can start by filling your resume with data and choose a template at the end</div>
                    </div>
                </div>
                
                
            </div>
            <div className=''>
                <Footer/>
            </div>
            
        </>
    );
};

export default tamplate;
