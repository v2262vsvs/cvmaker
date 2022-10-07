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

export default function CVpdfTwilight({
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

    const colorText = classNames(
        color === 'violet' ? 'section-headline text-violet-500 border-violet-500'
            : color === 'yellow' ? 'section-headline text-yellow-500 border-yellow-500'
                : color === 'red' ? 'section-headline text-red-500 border-red-500'
                    : 'section-headline'
    )

    const colorTextName = classNames(
        color === 'violet' ? 'border-violet-500 border-l-8 pl-2 text-white'
            : color === 'yellow' ? 'border-orange-500 border-l-8 pl-2 text-white'
                : color === 'red' ? 'border-orange-400 border-l-8 pl-2 text-white'
                    : 'border-green-500 border-l-8 pl-2 text-white'
    )


    return (
        <div
            className={classNames(
                type === 'downloadSample' ? ''
                    : type === 'modalSample' ? 'sampleScale50 overflow-hidden'
                        : choose === 5 ? 'ring-2 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50 overflow-hidden'
                            : 'sampleScale50 overflow-hidden'
            )}
        >
            <div className="">
                <main
                    className="flex flex-col sm:flex-row-reverse shadow-2xl h-screen "
                >
                    <div
                        className={classNames(
                            color === 'violet' ? 'w-1/3 bg-gradient-to-b from-violet-300 to-indigo-500'
                                : color === 'blue' ? 'w-1/3 bg-gradient-to-b from-indigo-300 to-green-300'
                                    : color === 'yellow' ? 'w-1/3 bg-gradient-to-b from-yellow-300 to-orange-500'
                                        : color === 'red' ? 'w-1/3 bg-gradient-to-b from-red-600 to-orange-400'
                                            : color === 'green' ? 'w-1/3 bg-gradient-to-b from-green-300 to-indigo-300 '
                                                : 'w-1/3 bg-gradient-to-b from-gray-800 to-gray-400'
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
                                {personal.name} {personal.syrname}
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
                                    <li className=" text-white font-mono font-bold text-xs ">
                                        {skill.habit}
                                        <div
                                            className={classNames(
                                                color === 'violet' ? 'w-32 bg-violet-500 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2'
                                                    : color === 'yellow' ? 'w-32 bg-yellow-600 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2'
                                                        : color === 'red' ? 'w-32 bg-red-600 rounded-full h-1 dark:bg-gray-700 mt-2 mb-2'
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
                                        <div className="text-white font-mono font-bold text-xs grid grid-cols-2">
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
                                <div className={'mt-1'}>
                                        <div className="lg:inline-block lg:w-3/12 text-gray-500 text-xs font-mono">
                                            {mont[new Date(experience.startDate).getMonth()]}{" "}
                                            {new Date(experience.startDate).getFullYear()}{" "}
                                            {mont[new Date(experience.endDate).getMonth()]}{" "}
                                            {new Date(experience.endDate).getFullYear()}
                                        </div>
                                        <div className="lg:inline-block lg:w-9/12 align-top w-full text-gray-800 text-sm font-mono font-bold">
                                            <div className={'uppercase -m-0.5'}>{experience.degree}</div>
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
                                <div className={'mt-1'}>
                                    <div className="lg:inline-block lg:w-3/12 text-gray-500 text-xs font-mono">
                                        {mont[new Date(education.startDate).getMonth()]}{" "}
                                        {new Date(education.startDate).getFullYear()}{" "}
                                        {mont[new Date(education.endDate).getMonth()]}{" "}
                                        {new Date(education.endDate).getFullYear()}
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
