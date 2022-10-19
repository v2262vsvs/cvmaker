import React from 'react'
import {useSelector} from 'react-redux';
//import {selectChoose, setChoose} from '../../../slices/navSlice';
import {RootState} from '../../../store';

type Props = {
    personal: Personal,
    profileDescription: string,
    educationList: Education[],
    experienceList: Experience[],
    skillsList: Skills[],
    languagesList: Languages[],
    type?: string
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
                                        type
                                    }: Props) {

    let img = personal.image
    if (img === undefined) {
        img = 'https://cdn2.iconfinder.com/data/icons/badge-set-2/100/User_Profile-512.png'
    }

    const choose = useSelector((state: RootState) => state.nav.choose);
    const color = useSelector((state: RootState) => state.nav.color);
    console.log('colorrrr',color)

    const backgroundPanel = classNames(
        choose === 4 ? (
        color === 'violet' ? 'bg-violet-800 w-2/6 h-screen'
            : color === 'blue' ? 'bg-blue-800 w-2/6 h-screen'
                : color === 'yellow' ? 'bg-yellow-500 w-2/6 h-screen'
                    : color === 'red' ? 'bg-red-700 w-2/6 h-screen'
                        : color === 'green' ? 'bg-green-800 w-2/6 h-screen'
                            : 'bg-gray-800 w-2/6 h-screen'
        ) : 'bg-gray-800 w-2/6 h-screen'
    )

    const colorText = classNames(
        choose === 4 ? (
        color === 'violet' ? 'text-violet-800'
            : color === 'blue' ? 'text-blue-800'
                : color === 'yellow' ? 'text-yellow-500'
                    : color === 'red' ? 'text-red-700'
                        : color === 'green' ? 'text-green-800'
                            : 'text-gray-800'
        ) : 'text-gray-800'
    )


    return (
        <div
            className={classNames(
                type === 'downloadSample' ? ''
                    : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                        : choose === 4 ? 'ring-2 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                            : 'sampleScale50 overflow-hidden'
            )}
        >
            <div className="flex items-center justify-center">
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

                        </div>
                            <div className="text-white mt-2 uppercase tracking-widest text-lg font-bold">SKILLS</div>
                            <hr className="w-1/6 mb-5"/>
                            <ul className={'text-gray-200'}>
                                {skillsList.map((skill) => (
                                    <li key={skill.habit} className=" text-sm list-disc ml-4">
                                        {skill.habit}
                                        <div className="w-32 bg-gray-200 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2">
                                            <div
                                                className={classNames(
                                                    skill.level === 'Newcomer' ? 'bg-gray-400 h-1 rounded-full w-1/5'
                                                        : skill.level === 'Beginner' ? 'bg-gray-400 h-1 rounded-full w-2/5'
                                                        : skill.level === 'Skillful' ? 'bg-gray-400 h-1 rounded-full w-3/5'
                                                        : skill.level === 'Experienced' ? 'bg-gray-400 h-1 rounded-full w-4/5'
                                                        : skill.level === 'Expert' ? 'bg-gray-400 h-1 rounded-full w-5/5'
                                                        : 'bg-gray-500 h-1 rounded-full w-5/5'
                                                )}
                                            ></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

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
                        //style={{fontWeight: "bolder" ,fontSize: 40}}
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
                                <div  key={experience.degree} className='my-3'>
                                    <div className={'flex justify-between mr-5'}>
                                        <div className="text-gray-700 text-sm uppercase font-semibold tracking-wider">
                                            {experience.degree}
                                        </div>
                                        <div className="text-gray-500 text-xs mt-0.5">
                                            {mont[new Date(experience.startDate).getMonth()]}{" "}
                                            {new Date(experience.startDate).getFullYear()}{" - "}
                                            {mont[new Date(experience.endDate).getMonth()]}{" "}
                                            {new Date(experience.endDate).getFullYear()}
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
                                            {mont[new Date(education.startDate).getMonth()]}{" "}
                                            {new Date(education.startDate).getFullYear()}{" - "}
                                            {mont[new Date(education.endDate).getMonth()]}{" "}
                                            {new Date(education.endDate).getFullYear()}
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

