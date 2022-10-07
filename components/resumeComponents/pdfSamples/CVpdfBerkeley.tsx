import React from "react";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

type Personal = {
    name?: string;
    syrname?: string;
    image?: string | undefined;
    phone?: string;
    postalcode?: string;
    address?: string;
    city?: string;
    email?: string;
};
type Education = {
    degree: string;
    city: string;
    school: string;
    description: string;
    startDate: Date;
    endDate: Date;
};
type Experience = {
    degree: string;
    city: string;
    employer: string;
    description: string;
    startDate: Date;
    endDate: Date;
};
type Skills = {
    habit: string;
    level: string;
};
type Languages = {
    language: string;
    level: string;
};

const mont = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
type Props = {
    personal: Personal;
    profileDescription: string;
    educationList: Education[];
    experienceList: Experience[];
    skillsList: Skills[];
    languagesList: Languages[];
    type?: string
};

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

function CVpdfBerkeley({
                           personal,
                           profileDescription,
                           educationList,
                           experienceList,
                           skillsList,
                           languagesList,
                           type
                       }: Props) {
    //const [scale, setScale] = useState(true);

    let img = personal.image;
    if (img === undefined) {
        img =
            "https://cdn2.iconfinder.com/data/icons/badge-set-2/100/User_Profile-512.png";
    }

    const choose = useSelector((state: RootState) => state.nav.choose);
    const color = useSelector((state: RootState) => state.nav.color);

    const colorLogic = classNames(
        color === 'violet' ? 'text-violet-700'
            : color === 'blue' ? 'text-blue-700'
                : color === 'yellow' ? 'text-yellow-600'
                    : color === 'red' ? 'text-red-700'
                        : color === 'green' ? 'text-green-700'
                            : ''
    )

    const backgroundLogic = classNames(
        color === 'violet' ? 'bg-violet-100 rounded-md'
            : color === 'blue' ? 'bg-blue-100 rounded-md'
                : color === 'yellow' ? 'bg-yellow-50 rounded-md'
                    : color === 'red' ? 'bg-red-100 rounded-md'
                        : color === 'green' ? 'bg-green-100 rounded-md'
                            : 'bg-neutral-100 rounded-md'
    )


    return (
        <div>
            <div
                className={classNames(
                    type === 'downloadSample' ? ''
                        : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                            :  choose === 3 ? 'ring-2 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                                : 'sampleScale50 overflow-hidden'
                )}
            >
                <div className="mx-7 mb-2 space-y-2 mt-2">
                    <div className={backgroundLogic}>
                        <div className={'flex px-3 py-1   text-neutral-600 space-x-2 '}>
                            <div className="h-5 w-5 text-neutral-700 mt-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={colorLogic}
                                >
                                    <path
                                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                </svg>
                            </div>
                            <div className="font-semibold">
                                <div className={colorLogic}>Personal data</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-start space-x-12 ">
                            <div className="">
                                <Image
                                    className="rounded-md"
                                    height={30}
                                    width={30}
                                    src={img}
                                    alt=""
                                />
                            </div>
                            <div className="flex text-neutral-800 space-x-2  text-xl font-semibold">
                                <div>{personal.name}</div>
                                <div>{personal.syrname}</div>
                            </div>
                        </div>
                        <div className="flex  space-x-10 ">
                            <div className="text-neutral-600 text-xs w-10">Address</div>
                            <div className="text-neutral-800 text-xs font-bold">
                                {personal.address}{", "}{personal.city}{", "}{personal.postalcode}
                            </div>
                        </div>
                        <div className="flex  space-x-10">
                            <div className="text-neutral-600 text-xs w-10">Phone</div>
                            <div className="text-neutral-800 text-xs font-semibold">
                                {personal.phone}
                            </div>
                        </div>
                        <div className="flex  space-x-10">
                            <div className="text-neutral-600 text-xs w-10">Email</div>
                            <div className="text-neutral-800 text-xs font-semibold">
                                {personal.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-7 mb-2 space-y-2 ">
                    <div className={backgroundLogic} >
                        <div className={'flex px-3 py-1 text-neutral-600 space-x-2 font-semibold'}>
                            <div className="h-5 w-5 text-neutral-700 mt-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={colorLogic}
                                >
                                    <path
                                        d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                                </svg>
                            </div>
                            <div className="font-semibold">
                                <div className={colorLogic}>Profile</div>
                        </div>
                        </div>
                    </div>
                    <div className="text-neutral-600 text-xs text-justify">
                        <div>{profileDescription}</div>
                    </div>
                </div>
                <div className="mx-7 mb-2 space-y-2 ">
                    <div className={backgroundLogic}>
                        <div className="flex px-3 py-1  text-neutral-600 space-x-2 font-semibold">
                            <div className="h-5 w-5 text-neutral-700 mt-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={colorLogic}
                                >
                                    <path
                                        d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                </svg>
                            </div>
                            <div className="font-semibold">
                                <div className={colorLogic}>Education and qualifications</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {educationList.map((education) => (
                            <div className="">
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold text-neutral-800">
                                        {education.degree}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        {mont[new Date(education.startDate).getMonth()]}{" "}
                                        {new Date(education.startDate).getFullYear()}–
                                        {mont[new Date(education.endDate).getMonth()]}{" "}
                                        {new Date(education.endDate).getFullYear()}
                                    </div>
                                </div>
                                <div className="text-xs text-neutral-600 font-serif">
                                    {education.school}, {education.city}
                                </div>
                                <div className="text-neutral-600 text-xs text-justify">
                                    {education.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-7 mb-2 space-y-2 ">
                    <div className={backgroundLogic}>
                        <div className='flex px-3 py-1 text-neutral-600 space-x-2  font-semibold'>
                            <div className="h-5 w-5  text-neutral-700 mt-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={colorLogic}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                                </svg>
                            </div>
                            <div className="font-semibold">
                                <div className={colorLogic}>Experience</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {experienceList.map((experience) => (
                            <div className="">
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold text-neutral-800">
                                        {experience.degree}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        {mont[new Date(experience.startDate).getMonth()]}{" "}
                                        {new Date(experience.startDate).getFullYear()}–
                                        {mont[new Date(experience.endDate).getMonth()]}{" "}
                                        {new Date(experience.endDate).getFullYear()}
                                    </div>
                                </div>
                                <div className="text-xs text-neutral-700 opacity-90  font-serif">
                                    {experience.employer}, {experience.city}
                                </div>
                                <div className="text-neutral-600 text-xs text-justify">
                                    {experience.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-7 mb-2 space-y-1 ">
                    <div className={backgroundLogic}>
                        <div className={'flex px-3 py-1 text-neutral-600 space-x-2  font-semibold'}>
                            <div
                                className="h-5 w-5 text-neutral-700 mt-0.5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={colorLogic}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className={colorLogic}>Skills</div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className={'wrap2'}>
                            <ul>
                                {skillsList.map((language) => (
                                    <div className="">
                                        <div className="text-xs font-semibold text-neutral-800">
                                            {language.habit}
                                        </div>
                                        <div className="text-neutral-600 font-serif text-xs">
                                            {language.level}
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mx-7 mb-2 space-y-1 ">
                    <div className={backgroundLogic}>
                        <div className={'flex px-3 py-1 text-neutral-600 space-x-2  font-semibold'}>
                            <div className="h-5 w-5 text-neutral-700 mt-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={colorLogic}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className={colorLogic}>Languages</div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className={'wrap2'}>
                            <ul>
                                {languagesList.map((language) => (
                                    <div className="">
                                        <div className="text-xs font-semibold text-neutral-800">
                                            {language.language}
                                        </div>
                                        <div className="text-neutral-600 font-serif text-xs">
                                            {language.level}
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVpdfBerkeley;
