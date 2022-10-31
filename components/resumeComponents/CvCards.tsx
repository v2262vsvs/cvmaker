import React from 'react';
import CVpdfStanford from "./pdfSamples/CVpdfStanford";
import CVpdfOtago from "./pdfSamples/CVpdfOtago";
import CVpdfBerkeley from "./pdfSamples/CVpdfBerkeley";
import {useQuery} from "@apollo/client";
import {GET_CV} from "../../graphql/queries";
import CVpdfSparkle from "./pdfSamples/CVpdfSparkle";
import CVpdfErling from "./pdfSamples/CVpdfErling";
import CVpdfTwilight from "./pdfSamples/CVpdfTwilight";
import {useRouter} from "next/router";
import {PlusIcon} from "@heroicons/react/solid";
import Link from "next/link";
import dataCV from "./pdfSamples/dataCV";

const CvCards = () => {
    const router = useRouter()
    const {data, error} = useQuery(GET_CV,{
        variables:{
            num: 6
        }
    })
    if(error){
        return `Error! ${error}`
    }
    console.log('cv', data)

    const DATA = data?.getCvList

    const step1 = '/'
    const step2 = '/box/templates'

    return (
        <>
            <div className='mt-12 grid grid-cols-3 mx-auto my-auto container gap-y-8' >
                {router.pathname == step1 &&
                    DATA?.map((cv: any )=> (
                            <>
                                {cv.sample == 1 && (
                                    <CVpdfStanford
                                        personal={cv.userinfoList[0]}
                                        profileDescription={cv.description}
                                        educationList={cv.educationList}
                                        experienceList={cv.experienceList}
                                        skillsList={cv.skillsList}
                                        languagesList={cv.languagesList}
                                        key={cv.id}
                                        colorDB={cv.color}

                                    />
                                )}
                                {cv.sample == 2 && (
                                    <CVpdfOtago
                                        personal={cv.userinfoList[0]}
                                        profileDescription={cv.description}
                                        educationList={cv.educationList}
                                        experienceList={cv.experienceList}
                                        skillsList={cv.skillsList}
                                        languagesList={cv.languagesList}
                                        key={cv.id}
                                        colorDB={cv.color}
                                    />
                                )}
                                {cv.sample == 3 && (
                                    <CVpdfBerkeley
                                        personal={cv.userinfoList[0]}
                                        profileDescription={cv.description}
                                        educationList={cv.educationList}
                                        experienceList={cv.experienceList}
                                        skillsList={cv.skillsList}
                                        languagesList={cv.languagesList}
                                        key={cv.id}
                                        colorDB={cv.color}
                                    />
                                )}
                                {cv.sample == 4 && (
                                    <CVpdfErling
                                        personal={cv.userinfoList[0]}
                                        profileDescription={cv.description}
                                        educationList={cv.educationList}
                                        experienceList={cv.experienceList}
                                        skillsList={cv.skillsList}
                                        languagesList={cv.languagesList}
                                        key={cv.id}
                                        colorDB={cv.color}
                                    />
                                )}
                                {cv.sample == 5 && (
                                    <CVpdfTwilight
                                        personal={cv.userinfoList[0]}
                                        profileDescription={cv.description}
                                        educationList={cv.educationList}
                                        experienceList={cv.experienceList}
                                        skillsList={cv.skillsList}
                                        languagesList={cv.languagesList}
                                        key={cv.id}
                                        colorDB={cv.color}
                                    />
                                )}
                                {cv.sample == 6 && (
                                    <CVpdfSparkle
                                        personal={cv.userinfoList[0]}
                                        profileDescription={cv.description}
                                        educationList={cv.educationList}
                                        experienceList={cv.experienceList}
                                        skillsList={cv.skillsList}
                                        languagesList={cv.languagesList}
                                        key={cv.id}
                                        colorDB={cv.color}
                                    />
                                )}
                            </>
                        )


                    )}
            </div>
            {router.pathname == step2 &&
                <Link href="/box/personal">
                    <div className='-mt-8 grid grid-cols-3 mx-auto my-auto container gap-y-8'>
                        <CVpdfOtago
                            personal={dataCV.userinfoList[0]}
                            profileDescription={dataCV.description}
                            educationList={dataCV.educationList}
                            experienceList={dataCV.experienceList}
                            skillsList={dataCV.skillsList}
                            languagesList={dataCV.languagesList}
                            colorDB={dataCV.color}
                        />
                        <CVpdfBerkeley
                            personal={dataCV.userinfoList[0]}
                            profileDescription={dataCV.description}
                            educationList={dataCV.educationList}
                            experienceList={dataCV.experienceList}
                            skillsList={dataCV.skillsList}
                            languagesList={dataCV.languagesList}
                            colorDB={dataCV.color}
                        />
                        <div  className='bg-white w-[595px] h-[842px] scale-65 shadow-xl hover:shadow-2xl rounded-2xl -mt-32  -mb-32 -ml-20 -mr-10  overflow-hidden hover:ring-4 ring-offset-1 ring-violet-300 ring-rounded-lg ring-offset-violet-300'>
                            <div className="rounded-full bg-violet-300 hover:-scale-105 bg-opacity-25 w-48 h-48  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="h-24 w-24 text-violet-700  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <PlusIcon/>
                                </div>
                            </div>
                        </div>
                        <CVpdfSparkle
                            personal={dataCV.userinfoList[0]}
                            profileDescription={dataCV.description}
                            educationList={dataCV.educationList}
                            experienceList={dataCV.experienceList}
                            skillsList={dataCV.skillsList}
                            languagesList={dataCV.languagesList}
                            colorDB={dataCV.color}
                        />
                        <CVpdfErling
                            personal={dataCV.userinfoList[0]}
                            profileDescription={dataCV.description}
                            educationList={dataCV.educationList}
                            experienceList={dataCV.experienceList}
                            skillsList={dataCV.skillsList}
                            languagesList={dataCV.languagesList}
                            colorDB={dataCV.color}
                        />
                        <CVpdfTwilight
                            personal={dataCV.userinfoList[0]}
                            profileDescription={dataCV.description}
                            educationList={dataCV.educationList}
                            experienceList={dataCV.experienceList}
                            skillsList={dataCV.skillsList}
                            languagesList={dataCV.languagesList}
                            colorDB={dataCV.color}
                        />
                    </div>
                </Link>

            }

        </>
    );
};

export default CvCards;
