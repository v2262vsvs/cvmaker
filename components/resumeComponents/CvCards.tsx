import React from 'react';
import CVpdfStanford from "./pdfSamples/CVpdfStanford";
import CVpdfOtago from "./pdfSamples/CVpdfOtago";
import CVpdfBerkeley from "./pdfSamples/CVpdfBerkeley";
import CVpdfSparkle from "./pdfSamples/CVpdfSparkle";
import CVpdfErling from "./pdfSamples/CVpdfErling";
import CVpdfTwilight from "./pdfSamples/CVpdfTwilight";

import {PlusIcon} from "@heroicons/react/solid";

import {useQuery} from "@apollo/client";
import {GET_CV} from "../../graphql/queries";
import dataCV from "./pdfSamples/dataCV";

import {useRouter} from "next/router";
import Link from "next/link";


const CvCards: any = () => {
    const router = useRouter()

    const {data, error} = useQuery(GET_CV, {
        variables: {
            num: 6
        }
    })
    if (error) {
        return `Error! ${error}`
    }
    console.log('cv', data)
    const DATA = data?.getCvList

    const step1 = '/'
    const step2 = '/box/templates'

    const ID = [1]
    //md:flex-row max-[1020px]:justify-center max-[1020px]:flex mb-10 max-[1020px]:ml-14
    return (
        <>
            <div className='mt-12 lg:grid lg:grid-cols-3 mx-auto my-auto container gap-y-8  max-[1020px]:mobile-view'>
                {router.pathname == step1 &&
                    DATA?.map((cv: any) => (
                        <div key={ID[0]++} className={' mb-12'}>
                            {cv.sample == 1 && (
                                <CVpdfStanford
                                    personal={cv.userinfoList[0]}
                                    profileDescription={cv.description}
                                    colorDB={cv.color}
                                    {...cv}
                                />
                            )}
                            {cv.sample == 2 && (
                                <CVpdfOtago
                                    personal={cv.userinfoList[0]}
                                    profileDescription={cv.description}
                                    colorDB={cv.color}
                                    {...cv}
                                />
                            )}
                            {cv.sample == 3 && (
                                <CVpdfBerkeley
                                    personal={cv.userinfoList[0]}
                                    profileDescription={cv.description}
                                    colorDB={cv.color}
                                    {...cv}
                                />
                            )}
                            {cv.sample == 4 && (
                                <CVpdfErling
                                    personal={cv.userinfoList[0]}
                                    profileDescription={cv.description}
                                    colorDB={cv.color}
                                    {...cv}
                                />
                            )}
                            {cv.sample == 5 && (
                                <CVpdfTwilight
                                    personal={cv.userinfoList[0]}
                                    profileDescription={cv.description}
                                    colorDB={cv.color}
                                    {...cv}
                                />
                            )}
                            {cv.sample == 6 && (
                                <CVpdfSparkle
                                    personal={cv.userinfoList[0]}
                                    profileDescription={cv.description}
                                    colorDB={cv.color}
                                    {...cv}
                                />
                            )}
                        </div>
                        )
                    )}
            </div>
            {router.pathname == step2 &&
                <Link href="/box/personal">
                    <div
                        className={'-mt-8 lg:grid lg:grid-cols-3 mx-auto my-auto container gap-y-8  max-[1020px]:mobile-view '}
                        //className='-mt-8 grid grid-cols-3 mx-auto my-auto container gap-y-8'
                    >
                        <div>
                            <CVpdfOtago
                                {...dataCV}
                            />
                        </div>
                        <div>
                            <CVpdfBerkeley
                                {...dataCV}
                            />
                        </div>
                        <div>
                            <div
                                className='bg-white w-[595px] h-[842px] scale-65 shadow-violetShadow  rounded-2xl -mt-32  -mb-32 -ml-20 -mr-10  overflow-hidden hover:ring-4 ring-offset-1 ring-violet-300 ring-rounded-lg ring-offset-violet-300'>
                                <div
                                    className="rounded-full bg-violet-300 hover:-scale-105 bg-opacity-25 w-48 h-48  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div
                                        className="h-24 w-24 text-violet-700  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <PlusIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <CVpdfSparkle
                            {...dataCV}
                             />
                        </div>
                        <div>
                            <CVpdfErling
                                {...dataCV}
                            />
                        </div>
                        <div>
                            <CVpdfTwilight
                                {...dataCV}
                            />
                        </div>
                    </div>
                </Link>
            }
        </>
    );
};

export default CvCards;
