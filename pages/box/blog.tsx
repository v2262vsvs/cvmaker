import React from 'react';
import HeadMeta from "../../components/pageSections/HeadMeta";
import CVpdfStanford from "../../components/resumeComponents/pdfSamples/CVpdfStanford";

function blog() {
    return (
        <>
            <HeadMeta title={'CV - BLOG'} content={'add later some text'}/>
            <div className='mt-28 flex ml-40'>
                {/*<div className='ml-10 mr-24'>*/}
                {/*    <CVpdfStanford personal={{}} profileDescription={''} educationList={[]} experienceList={[]} skillsList={[]} languagesList={[]}/>*/}
                {/*</div>*/}
                {/*<div className='ml-10 mr-24'>*/}
                {/*    <CVpdfStanford personal={{}} profileDescription={''} educationList={[]} experienceList={[]} skillsList={[]} languagesList={[]}/>*/}
                {/*</div>*/}
                {/*<div className='ml-10'>*/}
                {/*    <CVpdfStanford personal={{}} profileDescription={''} educationList={[]} experienceList={[]} skillsList={[]} languagesList={[]}/>*/}
                {/*</div>*/}
                <CVpdfStanford
                    personal={{}}
                    profileDescription={''}
                    educationList={[]}
                    experienceList={[]}
                    skillsList={[]}
                    languagesList={[]}/>
                <CVpdfStanford personal={{}} profileDescription={''} educationList={[]} experienceList={[]} skillsList={[]} languagesList={[]}/>
                <CVpdfStanford personal={{}} profileDescription={''} educationList={[]} experienceList={[]} skillsList={[]} languagesList={[]}/>

            </div>
        </>
    );
}

export default blog;
