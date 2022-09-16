import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
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
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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

function CVpdfOtago() {
    const [scale,setScale] = useState('100')
  const [personal, setPersonal] = useState<Personal>({});
  const [profileDescription, setProfileDescription] = useState<string>("");
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [skillsList, setSkillsList] = useState<Skills[]>([]);
  const [languagesList, setLanguagesList] = useState<Languages[]>([]);

  useEffect(() => {
    const data = window.localStorage.getItem("PERSONAL_STATE");
    console.log("from storage", data);
    if (data !== null) {
      const formated: Personal = JSON.parse(data);
      console.log("name", formated.name);
      setPersonal((personal) => ({
        ...personal,
        name: formated.name,
        syrname: formated.syrname,
        image: formated.image,
        phone: formated.phone,
        postalcode: formated.postalcode,
        address: formated.address,
        city: formated.city,
        email: formated.email,
      }));
    }
    const data2 = window.localStorage.getItem("PROFILE_DESCRIPTION_STATE");
    let formated2 = null;
    if (data2 !== null) {
      formated2 = JSON.parse(data2);
      setProfileDescription(formated2);
      console.log("profileDescription ", profileDescription);
    }
    const data3 = window.localStorage.getItem("EDUCATION_STATE");
    console.log("from storage", data3);
    let formated3 = null;
    if (data3 !== null) {
      formated3 = JSON.parse(data3);
      setEducationList(formated3);
      console.log("education ", educationList);
    }

    const data4 = window.localStorage.getItem("EXPERIENCE_STATE");
    console.log("from storage", data4);
    let formated4 = null;
    if (data4 !== null) {
      formated4 = JSON.parse(data4);
      setExperienceList(formated4);
      console.log("experience ", experienceList);
    }
    const data5 = window.localStorage.getItem("SKILLS_STATE");
    console.log("from storage", data5);
    let formated5 = null;
    if (data5 !== null) {
      formated5 = JSON.parse(data5);
      setSkillsList(formated5);
      console.log("skills ", skillsList);
    } else {
      setSkillsList([
        {
          habit: "",
          level: "",
        },
      ]);
    }
    const data6 = window.localStorage.getItem("LANGUAGES_STATE");
    console.log("from storage", data6);
    let formated6 = null;
    if (data6 !== null) {
      formated6 = JSON.parse(data6);
      setLanguagesList(formated6);
      console.log("languages ", languagesList);
    } else {
      setLanguagesList([
        {
          language: "",
          level: "",
        },
      ]);
    }
  }, []);
  return (
    <div>
      <div className={`bg-white w-[595px] h-[842px] scale-${scale}  shadow-xl rounded-md  mr-auto ml-auto `}>
        <div className="   ">
          <div className="flex justify-between">
            <div className="flex px-5 pt-3 space-x-3">
              <div className=" pt-1">
                <Image
                  className="rounded-full"
                  height={25}
                  width={25}
                  src={personal.image}
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-auto mb-auto text-center text-neutral-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    </div>
                    <div className="text-neutral-600 text-xs  font-thin"><span>{personal.address}</span>,<span>{personal.postalcode}</span> <span>{personal.city}</span></div>
                </div>
                <div className="flex space-x-1">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-auto mb-auto text-center text-neutral-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    </div>
                    <div className="text-neutral-600 text-xs  font-thin"><span>{personal.phone}</span></div>
                </div>
                <div className="flex space-x-1">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-auto mb-auto text-center text-neutral-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    </div>
                    <div className="text-neutral-600 text-xs  font-thin"><span>{personal.email}</span></div>
                </div>
          </div>

          <div className=" border-t-0.1 max-w-[555px] mt-3 mb-10 ml-auto mr-auto border border-gray-200"></div>
          <div className=" border-t-0.1 max-w-[555px] mt-3  ml-auto mr-auto border border-gray-200"></div>

          <div className="px-5 pt-3">
              <div className="text-neutral-800 font-light mb-1">EDUCATION AND QUALIFICATIONS</div>
              <div className="space-y-2">
              {educationList.map((education) => (
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <div className="text-xs font-medium text-neutral-700">{education.degree}</div>
                        <div className="text-xs  font-extralight text-neutral-400">{mont[new Date(education.startDate).getMonth()]} {new Date(education.startDate).getFullYear()}–{mont[new Date(education.endDate).getMonth()]} {new Date(education.endDate).getFullYear()}</div>
                    </div>
                    <div className="text-xs text-neutral-700 font-light opacity-90  font-serif">{education.school}, {education.city}</div>
                  <div className="text-neutral-600 font-extralight text-xs">{education.description}</div>
                  
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
                        <div className="text-xs font-medium text-neutral-700">{experience.degree}</div>
                        <div className="text-xs  font-extralight text-neutral-400">{mont[new Date(experience.startDate).getMonth()]} {new Date(experience.startDate).getFullYear()}–{mont[new Date(experience.endDate).getMonth()]} {new Date(experience.endDate).getFullYear()}</div>
                    </div>
                    <div className="text-xs text-neutral-700 font-light opacity-90  font-serif">{experience.employer}, {experience.city}</div>
                  <div className="text-neutral-600 font-extralight text-xs">{experience.description}</div>
                  
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
                    <div className="text-xs font-medium text-neutral-800">{skill.habit}</div>
                    <div className="text-neutral-600 font-extralight text-xs">{skill.level}</div>
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
                    <div className="text-xs font-medium text-neutral-800">{language.language}</div>
                    <div className="text-neutral-600 font-extralight text-xs">{language.level}</div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default CVpdfOtago;
