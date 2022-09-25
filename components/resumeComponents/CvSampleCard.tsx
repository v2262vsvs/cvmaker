import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import CVpdfOtago from './CVpdfOtago'
import CVpdfStanford from './CVpdfStanford';

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
  type Props={
    open?:boolean
  }
export default function CvSampleCard() {
  let [isOpen1, setIsOpen1] = useState<boolean>(false)
  let [isOpen2, setIsOpen2] = useState<boolean>(false)
  let [isOpen3, setIsOpen3] = useState<boolean>(false)
  let [isOpen4, setIsOpen4] = useState<boolean>(false)
  let [isOpen5, setIsOpen5] = useState<boolean>(false)
  let [isOpen6, setIsOpen6] = useState<boolean>(false)


  function closeModal1() {
    setIsOpen1(false)
  }
  function closeModal2() {
    setIsOpen2(false)
  }
  function closeModal3() {
    setIsOpen3(false)
  }
  function closeModal4() {
    setIsOpen4(false)
  }
  function closeModal5() {
    setIsOpen5(false)
  }
  function closeModal6() {
    setIsOpen6(false)
  }

  function openModal1() {
    setIsOpen1(true)
  }
  function openModal2() {
    setIsOpen2(true)
  }
  function openModal3() {
    setIsOpen3(true)
  }
  function openModal4() {
    setIsOpen4(true)
  }
  function openModal5() {
    setIsOpen5(true)
  }
  function openModal6() {
    setIsOpen6(true)
  }



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
    <>
    <div className='flex items-center space-x-3 overflow-x-scroll overflow-y-hidden overflow-clip scrollbar-hide   w-[1200px] py-5 px-3 ml-auto mr-auto'>
        <div onClick={openModal1}  className="  flex items-center justify-center -ml-40">
           <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
        </div>
        <div onClick={openModal2}  className="  flex items-center justify-center">
           <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
        </div>
        <div onClick={openModal3}  className="  flex items-center justify-center">
           <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
        </div>
        <div onClick={openModal4}  className="  flex items-center justify-center">
           <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
        </div>
        <div onClick={openModal5}  className="  flex items-center justify-center">
           <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
        </div>
        <div onClick={openModal6}  className="  flex items-center justify-center">
           <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
        </div>
    </div>
      

      <Transition appear show={isOpen1} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal1}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
             
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className='-ml-24'>
                  <CVpdfStanford personal={personal} profileDescription={profileDescription} educationList={educationList} experienceList={experienceList} skillsList={skillsList} languagesList={languagesList}/>
                  </div>

                  <div className="mt-4 text-center ">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-4 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeModal1}
                    >
                      Select Sample
                    </button>
                  </div>
                </Dialog.Panel>
                
              </Transition.Child>
            </div>
            
          </div>
        </Dialog>

      </Transition>
    </>
  )
}
