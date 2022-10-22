import React, {useEffect, useState} from "react";
import HeadMeta from "../../components/pageSections/HeadMeta";
import StepProgressBar from "../../components/elementsUI/StepProgressBar";
import PersonalForm from "../../components/resumeComponents/PersonalForm";
import MyModal from "../../components/resumeComponents/MyModal";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'


function Personal() {
    // for progress bar
    const [percent, setPercent] = useState<number>(0)
    const {data:session} = useSession()
    const router = useRouter()
    

    // for progress bar animation
    useEffect(() => {
        setTimeout(() => {
            setPercent(percent + 25)
        }, 800)

        if (!session){
            router.push('/auth/signin')
            console.log('router',router)
        }
        
    }, [])


    return (
        <>
            <HeadMeta title={'CV - Personal'} content={'add later some text'}/>
            <div className="h-full w-full bg-violet-700 space-y-10">
                <div className="text-center text-white font-semibold text-4xl pt-10">
                    Personal data
                </div>

                <StepProgressBar percent={percent}/>

                <div className="bg-violet-50 rounded-t-md h-full shadow-t-xl space-y-10 pt-10 ">

                    <PersonalForm/>

                    <footer className="ml-auto   mr-auto text-center text-gray-500 text-xs max-w-[500px]">
                        By clicking "Next", you will start creating your resume and agree to
                        our general terms and conditions and privacy policy .
                    </footer>
                    <div
                        className='shadow-2xl shadow-violet-500'
                        style={{
                            position: 'fixed',
                            bottom: '80px',
                            right: '80px',
                            height: 80,
                            width: 80,
                            background: 'white',
                            display: "flex",
                            justifyContent: 'center',
                            borderRadius: 40
                        }}>
                        <MyModal
                            type='hint'
                            advice={'1. Fields with * must be filled in. These are one of the most important fields for a resume.\n2. We recommend filling in the phone, address, city and photo fields. The more complete your resume is, the more likely you are to get a response.'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Personal;
