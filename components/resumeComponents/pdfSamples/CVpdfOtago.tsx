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
    personal: Personal,
    profileDescription: string,
    educationList: Education[],
    experienceList: Experience[],
    skillsList: Skills[],
    languagesList: Languages[],
    type?: string
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


function CVpdfOtago({personal, profileDescription, educationList, experienceList, skillsList, languagesList , type}: Props) {
    //const [scale, setScale] = useState(true);

    let img = personal.image
    if (img === undefined) {
        img = 'https://cdn2.iconfinder.com/data/icons/badge-set-2/100/User_Profile-512.png'
    }


    const choose = useSelector((state: RootState) => state.nav.choose);
    const color = useSelector((state: RootState) => state.nav.color)

    const colorLogic = classNames(
        color === 'violet' ? 'text-violet-700'
            : color === 'blue' ? 'text-blue-700'
                : color === 'yellow' ? 'text-yellow-600'
                    : color === 'red' ? 'text-red-700'
                        : color === 'green' ? 'text-green-700'
                            : 'text-neutral-800'
    )

    const backgroundLogic = classNames(
        color === 'violet' ? 'bg-violet-700 '
            : color === 'blue' ? 'bg-blue-700 '
                : color === 'yellow' ? 'bg-yellow-600 '
                    : color === 'red' ? 'bg-red-700 '
                        : color === 'green' ? 'bg-green-700 '
                            : 'bg-gray-500'
    )

    return (
        <div>
            <div
                className={classNames(
                    type === 'downloadSample' ? ''
                        : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                            :  choose === 2 ? 'ring-2 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                                : 'sampleScale50 overflow-hidden'
                )}
            >
                <div className="   ">
                    <div className="flex justify-between">
                        <div className="flex px-5 pt-3 space-x-3">
                            <div className=" pt-1">
                                <Image
                                    className="rounded-full"
                                    height={28}
                                    width={28}
                                    src={img}
                                    alt=""
                                />
                            </div>
                            <div
                                className={colorLogic}
                            >
                                <div className="flex  space-x-2  font-medium text-xl uppercase font-bold mt-1">
                                    <div>{personal.name}</div>
                                    <div>{personal.syrname}</div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${backgroundLogic} text-xl text-white font-semibold pt-1 text-center w-10 h-10 mr-5 rounded-b-md`}>
                            CV
                        </div>
                    </div>
                    <div className="flex px-5 pt-1 space-x-3">
                        <div className="flex space-x-1  w-3/5">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 mt-auto mb-auto text-center ${colorLogic}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                            </div>
                            <div className="text-neutral-600 text-xs  font-extralight">
                                <span>{personal.address}</span>,
                                <span>{personal.postalcode}</span> <span>{personal.city}</span>
                            </div>
                        </div>
                        <div className="flex space-x-1 w-2/5">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 mt-auto mb-auto text-center ${colorLogic}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                </svg>
                            </div>
                            <div className="text-neutral-600 text-xs  font-extralight">
                                <span>{personal.email}</span>
                            </div>
                        </div>
                        <div className="flex space-x-1 w-2/5">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 mt-auto mb-auto text-center ${colorLogic}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                </svg>
                            </div>
                            <div className="text-neutral-600 text-xs  font-extralight">
                                <span>{personal.phone}</span>
                            </div>
                        </div>
                    </div>
                    <hr className={`mx-5 my-1 ${backgroundLogic} `}/>
                    <div className={'mx-5 my-2'}>
                        <div className="text-neutral-600 font-extralight text-xs">
                            {profileDescription}
                        </div>
                    </div>
                    <hr className={`mx-5 my-1 ${backgroundLogic} `}/>
                    <div className="px-5 ">
                        <div className={colorLogic}>
                            <div className="mb-1 font-bold">
                                EDUCATION AND QUALIFICATIONS
                            </div>
                        </div>
                        <div className="space-y-2">
                            {educationList.map((education) => (
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <div className="text-xs font-medium text-neutral-800">
                                            {education.degree}
                                        </div>
                                        <div className="text-xs  font-extralight text-neutral-500">
                                            {mont[new Date(education.startDate).getMonth()]}{" "}
                                            {new Date(education.startDate).getFullYear()}–
                                            {mont[new Date(education.endDate).getMonth()]}{" "}
                                            {new Date(education.endDate).getFullYear()}
                                        </div>
                                    </div>
                                    <div className="text-xs text-neutral-600 font-light opacity-90  font-serif">
                                        {education.school}, {education.city}
                                    </div>
                                    <div className="text-neutral-600 font-extralight text-xs">
                                        {education.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className={`mx-5 my-1 ${backgroundLogic} `}/>
                    <div className="px-5">
                        <div className={colorLogic}>
                            <div className="mb-1 font-bold">
                                EXPERIENCE
                            </div>
                        </div>
                        <div className="space-y-2">
                            {experienceList.map((experience) => (
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <div className="text-xs font-medium text-neutral-800">
                                            {experience.degree}
                                        </div>
                                        <div className="text-xs  font-extralight text-neutral-500">
                                            {mont[new Date(experience.startDate).getMonth()]}{" "}
                                            {new Date(experience.startDate).getFullYear()}–
                                            {mont[new Date(experience.endDate).getMonth()]}{" "}
                                            {new Date(experience.endDate).getFullYear()}
                                        </div>
                                    </div>
                                    <div className="text-xs text-neutral-600 font-light opacity-90  font-serif">
                                        {experience.employer}, {experience.city}
                                    </div>
                                    <div className="text-neutral-600 font-extralight text-xs">
                                        {experience.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className={`mx-5 my-1 ${backgroundLogic} `}/>
                    <div className="px-5">
                        <div className={colorLogic}>
                            <div className="mb-1 font-bold">
                            SKILLS
                            </div>
                        </div>
                        <div className={'wrap2'}>
                            <ul className="space-y-1">
                                {skillsList.map((skill) => (
                                    <div className="flex-row">
                                        <div className="text-xs font-medium text-neutral-800">
                                            {skill.habit}
                                        </div>
                                        <div className="text-neutral-600 font-extralight text-xs">
                                            {skill.level}
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <hr className={`mx-5 my-1 ${backgroundLogic} `}/>
                    <div className="px-5">
                        <div className={colorLogic}>
                            <div className="mb-1 font-bold">
                                LANGUAGES
                            </div>
                        </div>
                        <div className={'wrap2'}>
                            <ul className="space-y-1">
                                {languagesList.map((language) => (
                                    <div className="">
                                        <div className="text-xs font-medium text-neutral-800">
                                            {language.language}
                                        </div>
                                        <div className="text-neutral-600 font-extralight text-xs">
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

export default CVpdfOtago;
