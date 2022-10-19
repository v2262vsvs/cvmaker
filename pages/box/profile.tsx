import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, {Fragment, useEffect, useState} from 'react'
import Footer from "../../components/pageSections/Footer";
import CVpdfBerkeley from "../../components/resumeComponents/pdfSamples/CVpdfBerkeley";
import CVpdfErling from "../../components/resumeComponents/pdfSamples/CVpdfErling";
import CVpdfOtago from "../../components/resumeComponents/pdfSamples/CVpdfOtago";
import CVpdfSparkle from "../../components/resumeComponents/pdfSamples/CVpdfSparkle";
import CVpdfStanford from "../../components/resumeComponents/pdfSamples/CVpdfStanford";
import CVpdfTwilight from "../../components/resumeComponents/pdfSamples/CVpdfTwilight";
import { GET_ACCOUNT_BY_EMAIL, GET_FULL_CVS_BY_ACCOUNT_BY_EMAIL, GET_CV_BY_ID, GET_FULL_CVS_BY_ACCOUNT_ID } from "../../graphql/queries";
import {Dialog, Transition} from '@headlessui/react'
import Link from "next/link";
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import {PDFExport} from "@progress/kendo-react-pdf";
import { useDispatch, useSelector } from "react-redux";
import {selectChoose, setChoose, setColor} from '../../slices/navSlice';
import Loading from '../../components/elementsUI/Loading'
import HeadMeta from "../../components/pageSections/HeadMeta";
import { DELETE_CV_BY_ID } from "../../graphql/mutations";
import { toast } from 'react-toastify'
import { RootState } from "../../store";
import { PlusIcon }  from '@heroicons/react/solid'
import { PencilIcon }  from '@heroicons/react/outline'
import { DownloadIcon }  from '@heroicons/react/outline'
import { TrashIcon }  from '@heroicons/react/outline'



function profile() {
    const [isConfetti, setIsConfetti] = useState<boolean>(false)
    const {data : session} = useSession()
    const router = useRouter()
    const dispatch = useDispatch()

    const [deleteCv] = useMutation(DELETE_CV_BY_ID)
    const [isChoose, setIsChoose] = useState<number>(1)


   
    const pdfExportComponent = React.useRef<PDFExport>(null);


    const {data,error} = useQuery(GET_FULL_CVS_BY_ACCOUNT_BY_EMAIL,{
        variables:{
          email:session?.user?.email
        }
      })
      if(error){
        return `Error! ${error}`
      } 
    console.log('account ',data)
    dispatch(setColor(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.color))
    const color = useSelector((state: RootState) => state.nav.color);
    console.log(color)

    //setIsChoose(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample)
    dispatch(setChoose(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample));

    

    let educationArr:Education[] = []
    for(let i=0;i<data?.getEducationByAccountEmail.length;i++){
      if (data?.getEducationByAccountEmail[i].cv_id == data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].id){
        educationArr.push(data?.getEducationByAccountEmail[i])
      }
    }
    let experienceArr:Experience[] = []
    for(let i=0;i<data?.getExperienceByAccountEmail.length;i++){
      if (data?.getExperienceByAccountEmail[i].cv_id == data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].id){
        experienceArr.push(data?.getExperienceByAccountEmail[i])
      }
    }
    let skillsArr:Skills[] = []
    for(let i=0;i<data?.getSkillsByAccountEmail.length;i++){
      if (data?.getSkillsByAccountEmail[i].cv_id == data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].id){
        skillsArr.push(data?.getSkillsByAccountEmail[i])
      }
    }
    let languagesArr:Languages[] = []
    for(let i=0;i<data?.getLanguagesByAccountEmail.length;i++){
      if (data?.getLanguagesByAccountEmail[i].cv_id == data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].id){
        languagesArr.push(data?.getLanguagesByAccountEmail[i])
      }
    }
    const [isOpen, setIsOpen] = useState<number>(0)

    function openModal(n:number) {
      setIsOpen(n)
    }
    function closeModal() {
      setIsOpen(0)
    }
    const handleEdit = async () => {

      

      
      
        window.localStorage.setItem("PERSONAL_STATE", JSON.stringify(data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]));
        console.log("storage", window.localStorage.getItem("PERSONAL_STATE"))

        window.localStorage.setItem("itUCATION_STATE",JSON.stringify(educationArr));
        console.log("storage", window.localStorage.getItem("EDUCATION_STATE"));

        window.localStorage.setItem("EXPERIENCE_STATE",JSON.stringify(experienceArr));
        console.log("storage", window.localStorage.getItem("EXPERIENCE_STATE"));

        window.localStorage.setItem("LANGUAGES_STATE",JSON.stringify(languagesArr));
        console.log("storage", window.localStorage.getItem("LANGUAGES_STATE"));

        window.localStorage.setItem("SKILLS_STATE",JSON.stringify(skillsArr));
        console.log("storage", window.localStorage.getItem("SKILLS_STATE"));
          
        window.localStorage.setItem("PROFILE_DESCRIPTION_STATE",JSON.stringify(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.description));
        console.log("storage for profile  ", window.localStorage.getItem("PROFILE_DESCRIPTION_STATE"));

        router.push('/box/personal')
      
    
    }
    const handleDelete = async () => {

      try { 
        const {data:{deleteUserByCvId:deletedCV}} = await deleteCv({
          variables:{
              cv_id: data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].id
          },
        })

        toast("Your last CV deleted!")
        location.reload();        

    }catch(error){console.log("error",error)}
    }


    const exportPDFWithComponent = async () => {
      setIsConfetti(true)
      if (pdfExportComponent.current) {
          pdfExportComponent.current.save();
      }
      

      
      setIsConfetti(false)
  };



    
    

  return (
    <div className="h-full">
      
      <HeadMeta title={'Your Profile'} content={'add later some text'}/>      <div className="mt-5 mx-20">
        <div className="flex justify-between">
          <div className="font-extrabold text-violet-700 text-xl xl:text-2xl 2xl:text-4xl">
            Resumes & Cover Letters
          </div>
          <div className="flex mt-5 px-8 space-x-2 py-4 bg-violet-700 rounded-lg hover:shadow-lg shadow-md cursor-pointer">
            <Link href="/box/personal">
                  <button
                    className="text-white font-medium text-xl">
                    Create New
                  </button>
            </Link>
            <div className="h-7 w-7 text-white">
              <PlusIcon/>
            </div>
          </div>
        </div>

        <div className="flex justify-start space-x-10 border-1 border-gray-500 border-b">
            <div className="   border-violet-700 border-b-2">Resumes</div>
            <div className=" text-gray-500">Cover Letters</div>
        </div>
      </div>
      <div className="flex">
      {data?.getCvsByAccountEmail.length > 0  ?(
        <div>
          <div className="mx-14 mt-3">
            {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].sample == 1) && (
              <div onClick={()=>openModal(2)}>
              <CVpdfStanford
              //personal={{name: 'Eugene', surname: 'Karashevich', email: 'wert130202@gmail.com'}}
              personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
              profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
              educationList={educationArr}
              experienceList={experienceArr}
              skillsList={skillsArr}
              languagesList={languagesArr}
              />
              </div>
            )}
            
            {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].sample == 2) && (
              <div onClick={()=>openModal(2)}>
              <CVpdfOtago
              personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
              profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
              educationList={educationArr}
              experienceList={experienceArr}
              skillsList={skillsArr}
              languagesList={languagesArr}
              />
              </div>
            )}
            {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].sample == 3) && (
              <div onClick={()=>openModal(2)}>
               <CVpdfBerkeley
               personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
               profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
               educationList={educationArr}
               experienceList={experienceArr}
               skillsList={skillsArr}
               languagesList={languagesArr}
              />
              </div>
            )}
            
            {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].sample == 4) && (
              <div onClick={()=>openModal(2)}>
               <CVpdfErling
               personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
               profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
               educationList={educationArr}
               experienceList={experienceArr}
               skillsList={skillsArr}
               languagesList={languagesArr}
              />
              </div>
            )}
            {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].sample == 5) && (
              <div onClick={()=>openModal(2)}>
               <CVpdfTwilight
               personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
               profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
               educationList={educationArr}
               experienceList={experienceArr}
               skillsList={skillsArr}
               languagesList={languagesArr}
              />
              </div>
            )}
            {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].sample == 6) && (
              <div onClick={()=>openModal(2)}>
               <CVpdfSparkle
               personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
               profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
               educationList={educationArr}
               experienceList={experienceArr}
               skillsList={skillsArr}
               languagesList={languagesArr}
              />
              </div>
            )} 
      </div>

        </div>
        ) : (
        <div className="mx-14 mt-3">
            <div
            className='sampleScale50 overflow-hidden'></div>
            <CVpdfOtago
                personal={{}}
                profileDescription={''}
                educationList={[]}
                experienceList={[]}
                skillsList={[]}
                languagesList={[]}
            />
        </div>
      )}
      

      <div className="mt-8 space-y-2 -ml-20">
        <div className="mb-1 font-medium text-lg">Your last cv</div>
        <div onClick={()=>handleEdit()} className="flex space-x-1 hover:border-b hover:border-violet-700 w-fit cursor-pointer">
          <div className="h-5 w-5 text-violet-600 ">
            <PencilIcon/>
          </div>
          <div>Edit</div>
        </div>
        <div onClick={() => exportPDFWithComponent()} className="flex space-x-1 hover:border-b hover:border-violet-700 w-fit cursor-pointer">
          <div className="h-5 w-5 text-violet-600">
              <DownloadIcon/>
          </div>
          <div>Dowload PDF</div>
        </div>
        <div onClick={()=>handleDelete()} className="flex space-x-1 hover:border-b hover:border-violet-700 w-fit cursor-pointer">
          <div className="h-5 w-5 text-violet-600">
              <TrashIcon/>
          </div>
          <div>Delete</div>
        </div>
      </div>

      <div className="mt-3 ml-48 ">
      <Link href="/box/personal">
      <div  className='bg-white w-[595px] h-[842px] scale-65 shadow-xl hover:shadow-2xl rounded-2xl -mt-32  -mb-32 -ml-20 -mr-10  overflow-hidden'>
        <div className="rounded-full bg-violet-300 hover:-scale-105 bg-opacity-25 w-48 h-48  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-24 w-24 text-violet-700  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <PlusIcon/>
            </div>
        </div>
      </div>
      </Link>

      </div>
      <div className="mt-8 space-y-2 -ml-6">
        <div className="mb-1 font-medium text-lg text-gray-500">New Resume</div>
        <div  className="flex text-gray-500 text-sm font-light cursor-pointer">
          <div>Create a tailored resume for each job <div>application. Double your chances of <div>getting hired!</div></div> </div>
        </div>
      </div>

      </div>


      <Transition appear show={isOpen == 2} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>

                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto mt-8">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-125"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">

                                    
                                    {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample == 2) && (
                                      <div>
                                      <CVpdfOtago
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'modalSample'}
                                      />
                                      </div>
                                    )}
                                    {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample == 3) && (
                                      <div>
                                      <CVpdfBerkeley
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'modalSample'}
                                      />
                                      </div>
                                    )}
                                    {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample == 4) && (
                                      <div>
                                      <CVpdfErling
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'modalSample'}
                                      />
                                      </div>
                                    )}
                                    {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample == 5) && (
                                      <div>
                                      <CVpdfTwilight
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'modalSample'}
                                      />
                                      </div>
                                    )}
                                    {(data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample == 6) && (
                                      <div>
                                      <CVpdfSparkle
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'modalSample'}
                                      />
                                      </div>
                                    )}

                                    <div className="-mt-4 text-center p-2 ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-bluee-500 px-8 py-2 text-sm font-medium bg-opacity-95 text-white hover:shadow-md hover:bg-opacity-100 focus:outline-none "
                                            //onClick={closeModal }
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>
                        </div>

                    </div>
                </Dialog>

            </Transition>

            <div className='flex justify-center' style={{ position: "absolute", left: "-4000px", top: 0 }}>
                <PDFExport ref={pdfExportComponent} paperSize="A4">
                    {data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample === 1 ?
                        <div className=''>
                            <CVpdfStanford
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'downloadSample'}
                                      />
                        </div>
                        : data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample === 2 ?
                            <div className=''>
                                <CVpdfOtago
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'downloadSample'}
                                      />
                            </div>
                            : data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample === 3 ?
                                <div>
                                    <div className=''>
                                    <CVpdfBerkeley
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'downloadSample'}
                                      />
                                    </div>
                                </div>
                                : data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample === 4 ?
                                    <div>
                                        <div className=''>
                                        <CVpdfErling
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'downloadSample'}
                                      />
                                        </div>
                                    </div>
                                : data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample === 5 ?
                                    <div>
                                        <div className=''>
                                        <CVpdfTwilight
                                      personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                      profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                      educationList={educationArr}
                                      experienceList={experienceArr}
                                      skillsList={skillsArr}
                                      languagesList={languagesArr}
                                      type={'downloadSample'}
                                      />
                                        </div>
                                    </div>
                                : data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1]?.sample === 6 ?
                                        <div>
                                            <div className=''>
                                            <CVpdfSparkle
                                            personal={data?.getUserInfoByAccountEmail[data?.getCvsByAccountEmail.length-1]}
                                            profileDescription={data?.getCvsByAccountEmail[data?.getCvsByAccountEmail.length-1].description}
                                            educationList={educationArr}
                                            experienceList={experienceArr}
                                            skillsList={skillsArr}
                                            languagesList={languagesArr}
                                            type={'downloadSample'}
                                            />
                                            </div>
                                        </div>
                                : <div>YOU HAVEN`T FILLED CV FORMS YET.</div>
                    }
                </PDFExport>
            </div>

            {isConfetti &&
                <Confetti
                    width={window.innerWidth - 50}
                    height={window.innerHeight + 50}
                    numberOfPieces={500}
                />}

      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default profile;
