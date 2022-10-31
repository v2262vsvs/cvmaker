import React from 'react'
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

type Props = {
    personal: Personal,
    profileDescription: string,
    educationList: Education[],
    experienceList: Experience[],
    skillsList: Skills[],
    languagesList: Languages[],
    type?: string
    colorDB?: string
}

type Experience = {
    position: string;
    city: string;
    employer: string;
    description: string;
    startdate: Date;
    enddate: Date;
};

type Education = {
    degree: string;
    city: string;
    school: string;
    description: string;
    startdate: Date;
    enddate: Date;
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

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function CVpdfSparkle({
                                        personal,
                                        profileDescription,
                                        educationList,
                                        experienceList,
                                        skillsList,
                                        languagesList,
                                        type,
                                        colorDB
                                    }: Props) {


    const choose = useSelector((state: RootState) => state.nav.choose);
    const color = useSelector((state: RootState) => state.nav.color);

    const colorLogic = classNames(
        colorDB ? (
            colorDB === 'violet' ? 'text-violet-700'
                : colorDB === 'blue' ? 'text-blue-700'
                    : colorDB === 'yellow' ? 'text-yellow-500'
                        : colorDB === 'red' ? 'text-red-700'
                            : colorDB === 'green' ? 'text-green-700'
                                : ''
        ) : choose === 6 ? (
        color === 'violet' ? 'text-violet-700'
            : color === 'blue' ? 'text-blue-700'
                : color === 'yellow' ? 'text-yellow-500'
                    : color === 'red' ? 'text-red-700'
                        : color === 'green' ? 'text-green-700'
                            : ''
        ) : ''
    )

    const backgroundLogic = classNames(
        colorDB ? (
            colorDB === 'violet' ? 'bg-violet-700'
                : colorDB === 'blue' ? 'bg-blue-700'
                    : colorDB === 'yellow' ? 'bg-yellow-500'
                        : colorDB === 'red' ? 'bg-red-700'
                            : colorDB === 'green' ? 'bg-green-700'
                                : ''
        ) : choose === 6 ? (
        color === 'violet' ? 'bg-violet-700'
            : color === 'blue' ? 'bg-blue-700'
                : color === 'yellow' ? 'bg-yellow-500'
                    : color === 'red' ? 'bg-red-700'
                        : color === 'green' ? 'bg-green-700'
                            : ''
        ) : ''
    )


    return (
        <div
            className={classNames(
                type === 'downloadSample' ? ''
                    : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                        : choose === 6 ? 'ring-4 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                            : 'sampleScale50 overflow-hidden hover:ring-4 ring-offset-1 ring-violet-300 ring-rounded-lg ring-offset-violet-300'
            )}
        >
            <div className={'p-8'}>
                <div className={'grid font-serif '}>
                    <div className={'justify-self-center font-bold'}>
                        <div
                            className={colorLogic}
                        >
                            {personal.name} {personal.surname}
                        </div>
                    </div>
                    <div className={'justify-self-center text-xs mt-1 text-center w-5/6'}>
                        {personal.address},{" "}{personal.postalcode},{" "}{personal.city}{" "}{personal.phone}{" "}{personal.email}
                    </div>
                </div>
                <div
                    className={backgroundLogic}
                ><hr className={'my-2'}/></div>
                <div className={'flex font-serif'}>
                    <div className={'w-1/8 font-medium uppercase'}>
                        <div
                            className={colorLogic}
                        >
                            About
                        </div>
                    </div>
                    <div className={'w-10/12 text-xs ml-3 mt-1 opacity-80'}>{profileDescription}
                    </div>
                </div>
                <div
                    className={backgroundLogic}
                ><hr className={'my-2'}/></div>
                <div className={'font-serif'}>
                    <div className={'font-medium uppercase mb-1'}>
                        <div
                            className={colorLogic}
                        >
                            Experience
                        </div>
                    </div>
                    {experienceList.map((experience) => (
                        <div key={experience.position} className={'mb-3'}>
                            <div className="flex">
                                <div className="flex-auto w-5/12 text-xs mr-auto opacity-60">
                                    {mont[new Date(experience.startdate).getMonth()]}{" "}
                                    {new Date(experience.startdate).getFullYear()}{" - "}
                                    {mont[new Date(experience.enddate).getMonth()]}{" "}
                                    {new Date(experience.enddate).getFullYear()}
                                </div>
                                <div className="flex-auto font-bold text-sm -mt-0.5">
                                    <div
                                        className={colorLogic}
                                    >
                                        {experience.position}{", "}{experience.employer}
                                    </div>
                                    <div className={'font-normal text-xs'}>
                                        <li className={'w-96 mt-1 opacity-80'}>
                                            {experience.description}
                                        </li>
                                    </div>
                                </div>
                                <div className="flex-auto w-3/6 text-xs text-end opacity-60">
                                    {experience.city}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={backgroundLogic}
                ><hr className={'my-2'}/></div>
                <div className={'font-serif'}>
                    <div className={'font-medium uppercase mb-1'}>
                        <div
                            className={colorLogic}
                        >
                            Education
                        </div>
                    </div>
                    {educationList.map((education) => (
                        <div key={education.degree} className={'mb-3'}>
                            <div className="flex">
                                <div className="flex-auto w-5/12 text-xs mr-auto opacity-60">
                                    {mont[new Date(education.startdate).getMonth()]}{" "}
                                    {new Date(education.startdate).getFullYear()}{" - "}
                                    {mont[new Date(education.enddate).getMonth()]}{" "}
                                    {new Date(education.enddate).getFullYear()}
                                </div>
                                <div className="flex-auto font-bold text-sm -mt-0.5">
                                    <div
                                        className={colorLogic}
                                    >
                                        {education.degree}{", "}{education.school}
                                    </div>
                                    <div className={'font-normal text-xs'}>
                                        <li className={'w-96 mt-1 opacity-80'}>
                                            {education.description}
                                        </li>
                                    </div>
                                </div>
                                <div className="flex-auto w-3/6 text-xs text-end opacity-60">
                                    {education.city}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={backgroundLogic}
                ><hr className={'my-2'}/></div>
                <div className={'font-serif'}>
                    <div className={'w-1/8 font-medium uppercase'}>
                        <div
                            className={colorLogic}
                        >
                            Skills
                        </div>
                    </div>
                    <div className={'w-10/12 text-xs ml-20 mt-1'}>
                        <div className={'wrap2'}>
                            <ul className={''}>
                                {skillsList.map((skill) => (
                                    <div key={skill.habit} className={'flex'}>
                                        <div className="list-disc  -ml-4">
                                            <li className="">
                                                {skill.habit}
                                            </li>
                                            <div className={'ml-4 opacity-80'}>{skill.level}</div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className={backgroundLogic}
                ><hr className={'my-2'}/></div>
                <div className={'font-serif '}>
                    <div className={'w-1/8 font-medium uppercase'}>
                        <div
                            className={colorLogic}
                        >
                            Languages
                        </div>
                    </div>
                    <div className={'w-10/12 text-xs ml-20 mt-1'}>
                        <div className={'wrap'}>
                            <ul className={''}>
                                {languagesList.map((language) => (
                                    <div key={language.language} className={'flex'}>
                                        <div className="list-disc grid grid-cols-2 w-3/4 -ml-4">
                                            <li className="">
                                                {language.language}
                                            </li>
                                            <div className={'ml-2 opacity-80'}>{language.level}</div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

