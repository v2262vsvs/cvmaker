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

function CVpdfBerkeley() {
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
        <div className="bg-white w-[595px] h-[842px] scale-60 shadow-xl rounded-md  mr-auto ml-auto ">
          <div className="flex justify-start space-x-3 px-7 pt-4 pb-4">
            <div className="">
              <Image
                className="rounded-full"
                height={30}
                width={30}
                src={personal.image}
                alt=""
              />
            </div>
            <div className="flex text-neutral-800 space-x-1 font-medium text-xl">
              <div>{personal.name}</div>
              <div>{personal.syrname}</div>
            </div>
          </div>
          <div className="mx-7 mb-5 space-y-3 ">
            <div className="flex px-3 py-1  bg-neutral-100 text-neutral-600 space-x-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div className="">Personal data</div>
            </div>
            <div>
              <div className="flex  space-x-10">
                <div className="text-neutral-600 text-xs w-10">Name</div>
                <div className="text-neutral-800 text-xs font-medium">
                  {personal.name}
                </div>
              </div>
              <div className="flex  space-x-10 ">
                <div className="text-neutral-600 text-xs w-10">Address</div>
                <div className="text-neutral-800 text-xs font-medium">
                  {personal.address}
                </div>
              </div>
              <div className="flex  space-x-10">
                <div className="text-neutral-600 text-xs w-10">Phone</div>
                <div className="text-neutral-800 text-xs font-medium">
                  {personal.phone}
                </div>
              </div>
              <div className="flex  space-x-10">
                <div className="text-neutral-600 text-xs w-10">Email</div>
                <div className="text-neutral-800 text-xs font-medium">
                  {personal.email}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-7 mb-5 space-y-3 ">
            <div className="flex px-3 py-1  bg-neutral-100 text-neutral-600 space-x-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <div>Profile</div>
            </div>
            <div className="text-neutral-600 text-xs">
              <div>{profileDescription}</div>
            </div>
          </div>
          <div className="mx-7 mb-5 space-y-3 ">
            <div className="flex px-3 py-1  bg-neutral-100 text-neutral-600 space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div>Education and qualifications</div>
            </div>
            <div className="space-y-2">
              {educationList.map((education) => (
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <div className="text-xs font-semibold text-neutral-800">{education.degree}</div>
                        <div className="text-xs text-neutral-400">{mont[new Date(education.startDate).getMonth()]} {new Date(education.startDate).getFullYear()}–{mont[new Date(education.endDate).getMonth()]} {new Date(education.endDate).getFullYear()}</div>
                    </div>
                    <div className="text-xs text-neutral-700 opacity-90  font-serif">{education.school}, {education.city}</div>
                  <div className="text-neutral-600 text-xs">{education.description}</div>
                  
                </div>
              ))}
            </div>
          </div>
          <div className="mx-7 mb-5 space-y-3 ">
            <div className="flex px-3 py-1  bg-neutral-100 text-neutral-600 space-x-2">
              <div>
               
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  text-neutral-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              </div>
              <div>Experience</div>
            </div>
            <div className="space-y-2">
              {experienceList.map((experience) => (
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <div className="text-xs font-semibold text-neutral-800">{experience.degree}</div>
                        <div className="text-xs text-neutral-400">{mont[new Date(experience.startDate).getMonth()]} {new Date(experience.startDate).getFullYear()}–{mont[new Date(experience.endDate).getMonth()]} {new Date(experience.endDate).getFullYear()}</div>
                    </div>
                    <div className="text-xs text-neutral-700 opacity-90  font-serif">{experience.employer}, {experience.city}</div>
                  <div className="text-neutral-600 text-xs">{experience.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-7 mb-5 space-y-3 ">
            <div className="flex px-3 py-1  bg-neutral-100 text-neutral-600 space-x-2">
              <div>
               
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
              
              </div>
              <div>Skills</div>
            </div>
            <div className="space-y-2">
              {skillsList.map((skill) => (
                <div className="">
                    <div className="text-xs font-semibold text-neutral-800">{skill.habit}</div>
                    <div className="text-neutral-600 font-serif text-xs">{skill.level}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-7 mb-5 space-y-3 ">
            <div className="flex px-3 py-1  bg-neutral-100 text-neutral-600 space-x-2">
              <div>
               
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  bg-white text-neutral-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
            </svg>
              
              </div>
              <div>Languages</div>
            </div>
            <div className="space-y-2">
              {languagesList.map((language) => (
                <div className="">
                    <div className="text-xs font-semibold text-neutral-800">{language.language}</div>
                    <div className="text-neutral-600 font-serif text-xs">{language.level}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      
    </div>
  );
}

export default CVpdfBerkeley;
