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

export default function CVpdfErling({
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

    const backgroundPanel = classNames(
        colorDB ? (
            colorDB === 'yellow' ? 'bg-yellow-500 w-2/6'
                : colorDB === 'black' ? 'bg-gray-800 w-2/6'
                    : `background-${colorDB}  w-2/6`
        ) : choose === 4 ? (
            color === 'yellow' ? 'bg-yellow-500 w-2/6'
                : color === 'black' ? 'bg-gray-800 w-2/6'
                    : `background-${color} w-2/6`
        ) : 'bg-gray-800 w-2/6'
    )

    const colorText = classNames(
        colorDB ? (
            colorDB === 'black' ? 'text-gray-800'
                    : `text-${colorDB}`
        ) : choose === 4 ? (
            color === 'black' ? 'text-gray-800'
                    : `text-${color}`
        ) : 'text-gray-800'
    )

    let skillStyle = "bg-gray-400 h-1 rounded-full"
    if (colorDB) {
        skillStyle = `skill-${colorDB} h-1 rounded-full`
    }
    if (choose === 4) {
        skillStyle = `skill-${color} h-1 rounded-full`
    }



    return (
        <div
            className={classNames(
                type === 'downloadSample' ? ''
                    : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                        : choose === 4 ? 'ring-4 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                            : 'sampleScale50 overflow-hidden hover:ring-4 ring-offset-1 ring-violet-300 ring-rounded-lg ring-offset-violet-300'
            )}
        >
            <div className="flex  flex-row h-[842px]">
                <div
                    className={backgroundPanel}
                >
                    <div className="flex items-center justify-center mb-10 mt-10">
                        <img src={img} alt="personal-image"
                             className="rounded-full w-32 border-2 border-white"
                        />
                    </div>
                    <div className="ml-4 mr-4">
                        <div>
                            <div className="text-white uppercase tracking-widest text-lg font-bold">Contacts</div>
                            <hr className="w-1/6 mb-5"/>
                            <div className="text-gray-100 text-sm">{personal.email}</div>
                            <div className="text-gray-100 text-sm">{personal.phone}</div>
                            <div className="text-gray-100 text-sm">{personal.address}, {personal.postalcode}, {personal.city}</div>
                        </div>

                        <hr className="my-5"/>

                        <div>
                            <div className="text-white mt-2 uppercase tracking-widest text-lg font-bold">SKILLS</div>
                            <hr className="w-1/6 mb-5"/>
                            <ul className={'text-gray-200'}>
                                {skillsList.map((skill) => (
                                    <li key={skill.habit} className=" text-sm list-disc ml-4">
                                        {skill.habit}
                                        <div className="w-32 bg-gray-200 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2">
                                            <div
                                                className={classNames(
                                                    skill.level === 'Newcomer' ? skillStyle + ' w-1/5'
                                                        : skill.level === 'Beginner' ? skillStyle + ' w-2/5'
                                                            : skill.level === 'Skillful' ? skillStyle + ' w-3/5'
                                                                : skill.level === 'Experienced' ? skillStyle + ' w-4/5'
                                                                    : skill.level === 'Expert' ? skillStyle + ' w-5/5'
                                                                        : ''
                                                )}
                                            ></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr className="my-5"/>

                        <div>
                            <div className="text-white mt-2 uppercase tracking-widest text-lg font-bold">Languages</div>
                            <hr className="w-1/6 mb-5"/>
                            <ul className={''}>
                                {languagesList.map((language) => (
                                    <div key={language.language} className="text-gray-100 text-sm list-disc ml-4 grid grid-cols-2">
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
                <div className={' w-8/12 h-screen ml-5'}>
                    <div
                        className="font-extrabold uppercase tracking-wider my-6 text-gray-800 text-2xl"
                    >
                        <div
                            className={colorText}
                        >
                            {personal.name} {personal.surname}
                        </div>
                    </div>

                    <div className="text-gray-700 text-xs text-justify mr-5" >
                        {profileDescription}
                    </div>

                    <div>
                        <hr className="my-3"/>
                        <div className="text-gray-700 mt-2 uppercase tracking-widest text-lg font-bold">
                            <div
                                className={colorText}
                            >
                                EXPERIENCE
                            </div>
                        </div>
                        <hr className="w-1/6 mb-3"/>
                        <div>
                            {experienceList.map((experience) => (
                                <div  key={experience.position} className='my-3'>
                                    <div className={'flex justify-between mr-5'}>
                                        <div className="text-gray-700 text-sm uppercase font-semibold tracking-wider">
                                            {experience.position}
                                        </div>
                                        <div className="text-gray-500 text-xs mt-0.5">
                                            {mont[new Date(experience.startdate).getMonth()]}{" "}
                                            {new Date(experience.startdate).getFullYear()}{" - "}
                                            {mont[new Date(experience.enddate).getMonth()]}{" "}
                                            {new Date(experience.enddate).getFullYear()}
                                        </div>
                                    </div>
                                    <div className="text-xs text-neutral-900 font-light italic mr-5">
                                        {experience.employer} , {experience.city}
                                    </div>
                                    <div className={'text-gray-700 text-xs text-justify mt-2 mr-5'}>
                                        {experience.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <hr className="my-3"/>
                        <div className="text-gray-700 mt-2 uppercase tracking-widest text-lg font-bold">
                            <div
                                className={colorText}
                            >
                                EDUCATION
                            </div>
                        </div>
                        <hr className="w-1/6 mb-3"/>
                        <div>
                            {educationList.map((education) => (
                                <div key={education.degree} className='my-3'>
                                    <div className={'flex justify-between mr-5'}>
                                        <div className="text-gray-700 text-sm uppercase font-semibold tracking-wider">
                                            {education.degree}
                                        </div>
                                        <div className="text-gray-500 text-xs mt-0.5">
                                            {mont[new Date(education.startdate).getMonth()]}{" "}
                                            {new Date(education.startdate).getFullYear()}{" - "}
                                            {mont[new Date(education.enddate).getMonth()]}{" "}
                                            {new Date(education.enddate).getFullYear()}
                                        </div>
                                    </div>
                                    <div className="text-xs text-neutral-900 font-light italic mr-5">
                                        {education.school} , {education.city}
                                    </div>
                                    <div className={'text-gray-700 text-xs text-justify mt-2 mr-5'}>
                                        {education.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

