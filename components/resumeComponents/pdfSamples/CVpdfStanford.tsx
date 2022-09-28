import React, { useState } from 'react'
import Image from "next/image"
import { useSelector } from 'react-redux';
import { selectChoose, setChoose } from '../../../slices/navSlice';
import { RootState } from '../../../store';
type Props={
    personal:Personal,
    profileDescription:string,
    educationList:Education[],
    experienceList:Experience[],
    skillsList:Skills[],
    languagesList:Languages[],
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
export default function CVpdfStanford({personal,profileDescription,educationList,experienceList,skillsList,languagesList}:Props) {
    const [scale,setScale] = useState(true)
    
    let img = personal.image
    if (img === undefined) {
      img = 'https://cdn2.iconfinder.com/data/icons/badge-set-2/100/User_Profile-512.png'
    }
//bg-white w-[595px] h-[842px] scale-100 shadow-xl rounded-md  mr-auto ml-auto -mb-48 -pb-48
{/*

  className={`${
          scale
            ? "sampleScale50"
            : "bg-white w-[595px] h-[842px] scale-100 shadow-xl rounded-md  mr-auto ml-auto -mb-48 -pb-48"
        } `}

*/}
  const choose = useSelector((state : RootState) => state.nav.choose); 

  return (
    <div
       
        
    className={classNames(
      (choose == 1) ? ' ring-2 ring-offset-1 ring-violet-700 ring-rounded-lg ring-offset-violet-700  sampleScale50' : 'sampleScale50 '
    )}
        
      >
        <div 
        
        >
          <div className="flex justify-between">
            <div className="flex px-5 pt-3 space-x-3">
              <div className=" pt-1">
                <Image
                  className="rounded-full"
                  height={25}
                  width={25}
                  src={img}
                  alt=""
                />
              </div>
              <div className="flex text-neutral-800 space-x-2  font-medium text-xl">
                <div>{personal.name}</div>
                <div>{personal.syrname}</div>
              </div>
            </div>
            <div className="bg-neutral-400 text-xl text-white font-semibold pt-1 text-center w-10 h-10 mr-5">
              CV
            </div>
          </div>
          <div className="flex px-5 pt-3 space-x-3">
            <div className="flex space-x-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-auto mb-auto text-center text-neutral-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <div className="text-neutral-600 text-xs  font-thin">
                <span>{personal.address}</span>,
                <span>{personal.postalcode}</span> <span>{personal.city}</span>
              </div>
            </div>
            <div className="flex space-x-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-auto mb-auto text-center text-neutral-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="text-neutral-600 text-xs  font-thin">
                <span>{personal.phone}</span>
              </div>
            </div>
            <div className="flex space-x-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-auto mb-auto text-center text-neutral-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="text-neutral-600 text-xs  font-thin">
                <span>{personal.email}</span>
              </div>
            </div>
          </div>

          <div className=" border-t-0.1 max-w-[555px] mt-3 mb-10 ml-auto mr-auto border border-gray-200"></div>
          <div className=" border-t-0.1 max-w-[555px] mt-3  ml-auto mr-auto border border-gray-200"></div>

          <div className="px-5 pt-3">
            <div className="text-neutral-800 font-light mb-1">
              EDUCATION AND QUALIFICATIONS
            </div>
            <div className="space-y-2">
              {educationList.map((education) => (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="text-xs font-medium text-neutral-700">
                      {education.degree}
                    </div>
                    <div className="text-xs  font-extralight text-neutral-400">
                      {mont[new Date(education.startDate).getMonth()]}{" "}
                      {new Date(education.startDate).getFullYear()}–
                      {mont[new Date(education.endDate).getMonth()]}{" "}
                      {new Date(education.endDate).getFullYear()}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-700 font-light opacity-90  font-serif">
                    {education.school}, {education.city}
                  </div>
                  <div className="text-neutral-600 font-extralight text-xs">
                    {education.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" border-t-0.1 max-w-[555px] mt-3  ml-auto mr-auto border border-gray-200"></div>

          <div className="px-5 pt-3">
            <div className="text-neutral-800 font-light mb-1 ">EXPERIENCE</div>
            <div className="space-y-2">
              {experienceList.map((experience) => (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="text-xs font-medium text-neutral-700">
                      {experience.degree}
                    </div>
                    <div className="text-xs  font-extralight text-neutral-400">
                      {mont[new Date(experience.startDate).getMonth()]}{" "}
                      {new Date(experience.startDate).getFullYear()}–
                      {mont[new Date(experience.endDate).getMonth()]}{" "}
                      {new Date(experience.endDate).getFullYear()}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-700 font-light opacity-90  font-serif">
                    {experience.employer}, {experience.city}
                  </div>
                  <div className="text-neutral-600 font-extralight text-xs">
                    {experience.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" border-t-0.1 max-w-[555px] mt-3  ml-auto mr-auto border border-gray-200"></div>
          <div className="px-5 pt-3">
            <div className="text-neutral-800 font-light mb-1 ">SKILLS</div>
            <div className="space-y-1">
              {skillsList.map((skill) => (
                <div className="">
                  <div className="text-xs font-medium text-neutral-800">
                    {skill.habit}
                  </div>
                  <div className="text-neutral-600 font-extralight text-xs">
                    {skill.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" border-t-0.1 max-w-[555px] mt-3  ml-auto mr-auto border border-gray-200"></div>
          <div className="px-5 pt-3">
            <div className="text-neutral-800 font-light mb-1 ">LANGUAGES</div>
            <div className="space-y-1">
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
            </div>
          </div>
        </div>
      </div>
    
  )
}

