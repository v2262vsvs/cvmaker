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

export default function CVpdfTwilight({
                                        personal,
                                        profileDescription,
                                        educationList,
                                        experienceList,
                                        skillsList,
                                        languagesList,
                                        type,
                                        colorDB
                                    }: Props) {

    let img = personal.image
    if (img === undefined) {
        img = 'https://cdn2.iconfinder.com/data/icons/badge-set-2/100/User_Profile-512.png'
    }

    const choose = useSelector((state: RootState) => state.nav.choose);
    const color = useSelector((state: RootState) => state.nav.color);

    const colorText = classNames(
        colorDB ? (
            `section-headline text-${colorDB}`
        ) : choose === 5 ? (
            `section-headline text-${color}`
        ) : 'section-headline'
    )

    const colorTextName = classNames(
        colorDB ? (
            colorDB !== 'black' ? `text-${colorDB} border-l-8 pl-2 text-white`
                : `border-green-500 border-l-8 pl-2 text-white`
        ) : choose === 5 ? (
            color !== 'black' ? `text-${color} border-l-8 pl-2 text-white`
                : `border-green-500 border-l-8 pl-2 text-white`
        ) : 'border-green-500 border-l-8 pl-2 text-white'

    )


    return (
        <div
            className={classNames(
                type === 'downloadSample' ? ''
                    : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                        : choose === 5 ? 'ring-4 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                            : 'sampleScale50 overflow-hidden hover:ring-4 ring-offset-1 ring-violet-300 ring-rounded-lg ring-offset-violet-300'
            )}
        >
            <div className="">
                <main
                    className="flex flex-row-reverse shadow-2xl h-[842px]"
                >
                    <div
                        className={classNames(
                            colorDB ? (
                                colorDB !== 'black' ? `w-1/3 gradientBg-${colorDB}`
                                    : `w-1/3 bg-gradient-to-b from-gray-800 to-gray-400`
                            ) : choose === 5 ? (
                                color !== 'black' ? `w-1/3 gradientBg-${color}`
                                    : `w-1/3 bg-gradient-to-b from-gray-800 to-gray-400`
                            ) : 'w-1/3 bg-gradient-to-b from-gray-800 to-gray-400'
                        )}
                    >
                        <div className="flex items-center justify-center mb-5 mt-10">
                            <img src={img} alt="personal-image"
                                 className="rounded-lg w-32"
                            />
                        </div>
                        <div
                            className={colorTextName}
                        >
                            <div className={'font-bold xl:text-xl uppercase tracking-widest text-white'}>
                                {personal.name} {personal.surname}
                            </div>
                        </div>

                        <div className="ml-4 mr-4 mt-2">
                            <div>
                                <div className="text-white uppercase tracking-widest text-lg font-mono font-bold">
                                    Contacts
                                </div>
                                <hr className="mb-2 bg-white h-1"/>
                                <div className="text-white font-mono font-bold text-xs">{personal.email}</div>
                                <div className="text-white font-mono font-bold text-xs">{personal.phone}</div>
                                <div className="text-white font-mono font-bold text-xs">
                                    {personal.address}, {personal.postalcode}, {personal.city}
                                </div>
                            </div>
                            <hr className="my-2 bg-white"/>
                            <div className="text-white uppercase tracking-widest text-lg font-mono font-bold">Skills</div>
                            <hr className="mb-2 bg-white h-1"/>
                            <ul className={'text-gray-200'}>
                                {skillsList.map((skill) => (
                                    <li key={skill.habit} className=" text-white font-mono font-bold text-xs ">
                                        {skill.habit}
                                        <div
                                            className={classNames(
                                                colorDB ? (
                                                    colorDB !== 'black' && colorDB !== 'green' ? `w-32 skill-${colorDB} rounded-full h-1 dark:bg-gray-700 mt-2 mb-2`
                                                        : `w-32 bg-green-500 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2`)
                                                : choose === 5 ? (
                                                    color !== 'black' && color !== 'green' ? `w-32 skill-${color} rounded-full h-1 dark:bg-gray-700 mt-2 mb-2`
                                                        : `w-32 bg-green-500 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2`)
                                                    : 'w-32 bg-green-500 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2'
                                            )}
                                        >
                                            <div
                                                className={classNames(
                                                    skill.level === 'Newcomer' ? 'bg-white h-1  w-1/5'
                                                        : skill.level === 'Beginner' ? 'bg-white h-1  w-2/5'
                                                            : skill.level === 'Skillful' ? 'bg-white h-1 w-3/5'
                                                                : skill.level === 'Experienced' ? 'bg-white h-1 w-4/5'
                                                                    : skill.level === 'Expert' ? 'bg-white h-1 w-5/5'
                                                                        : 'bg-white h-1 w-5/5'
                                                )}
                                            ></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-2 bg-white"/>

                            <div>
                                <div className="text-white uppercase tracking-widest text-lg font-mono font-bold">
                                    Languages
                                </div>
                                <hr className="mb-2 bg-white h-1"/>
                                <ul className={''}>
                                    {languagesList.map((language) => (
                                        <div key={language.language} className="text-white font-mono font-bold text-xs grid grid-cols-2">
                                            <li className="w-1/3">
                                                {language.language}

                                            </li>
                                            <div>{language.level}</div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content w-2/3 p-10">
                        <div>
                            <h2
                                className={colorText}
                            >Profile</h2>
                            <p className='mt-1  text-gray-700 text-xs font-mono tracking-tighter'>
                                {profileDescription}
                            </p>
                        </div>
                        <hr className="my-2"/>
                        <div>
                            <div className=" lg:inline-block w-4/5 align-top">
                                <div
                                    className={colorText}
                                >Experience</div>
                            </div>
                            {experienceList.map((experience)=> (
                                <div key={experience.position} className={'mt-1'}>
                                        <div className="lg:inline-block lg:w-3/12 text-gray-500 text-xs font-mono">
                                            {mont[new Date(experience.startdate).getMonth()]}{" "}
                                            {new Date(experience.startdate).getFullYear()}{" "}
                                            {mont[new Date(experience.enddate).getMonth()]}{" "}
                                            {new Date(experience.enddate).getFullYear()}
                                        </div>
                                        <div className="lg:inline-block lg:w-9/12 align-top w-full text-gray-800 text-sm font-mono font-bold">
                                            <div className={'uppercase -m-0.5'}>{experience.position}</div>
                                            <h3 className={'text-gray-600 text-xs font-mono font-bold -ml-0.5'}>{experience.employer}</h3>
                                        </div>
                                        <p className='mt-2  text-gray-700 text-xs font-mono tracking-tighter'>
                                            {experience.description}
                                        </p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-2"/>
                        <div>
                            <div className=" lg:inline-block w-4/5 align-top">
                                <div
                                    className={colorText}
                                >Education</div>
                            </div>
                            {educationList.map((education)=> (
                                <div key={education.degree} className={'mt-1'}>
                                    <div className="lg:inline-block lg:w-3/12 text-gray-500 text-xs font-mono">
                                        {mont[new Date(education.startdate).getMonth()]}{" "}
                                        {new Date(education.startdate).getFullYear()}{" "}
                                        {mont[new Date(education.enddate).getMonth()]}{" "}
                                        {new Date(education.enddate).getFullYear()}
                                    </div>
                                    <div className="lg:inline-block lg:w-9/12 align-top w-full text-gray-800 text-sm font-mono font-bold">
                                        <div className={'uppercase -m-0.5'}>{education.degree}</div>
                                        <h3 className={'text-gray-600 text-xs font-mono font-bold -ml-0.5'}>{education.school}</h3>
                                    </div>
                                    <p className='mt-2  text-gray-700 text-xs font-mono tracking-tighter'>
                                        {education.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-2"/>
                    </div>
                </main>
            </div>
        </div>
    )
}
