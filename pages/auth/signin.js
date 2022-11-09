import {getProviders, getSession, signIn} from "next-auth/react"
import HeadMeta from "/components/pageSections/HeadMeta";
import React from "react";
import Link from "next/link"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function SignIn({ providers }) {

    console.log(providers)



    const handleSignIn = async (id) =>{
        signIn(id)
    }

    return (
        <>
            <HeadMeta title={'CV - Sign In'} content={'add later some text'}/>

            <div className='flex   h-screen justify-center items-center scroll-none'>
            <div className="m-auto text-center w-1/2">
            <div className='ml-auto mr-auto items-center text-center relative h-16 w-16   hover:shadow-md '>
                        <Link href="/">
                            <img src='/logo.png' alt='logo'/>
                        </Link>
            </div>
            <div className="font-bold xl:text-2xl lg:text-xl mt-5 mb-2">

                <div>Sign Up/In</div>
            </div>
            <div className="text-violet-700 text-xs font-light xl:text-md lg:text-sm mb-5">Only registered users can download resume</div>


            <div className="border-dashed border-2 border-indigo-600  rounded-xl  w-5/6 lg:w-2/3 xl:w-1/2 ml-auto mr-auto py-2">
            {Object.values(providers).map((provider) => (
                <div
                    className='ml-auto mr-auto items-center text-center   space-y-1   '
                    key={provider.name}
                >
                    <button onClick={() => handleSignIn(provider.id)}
                            className={classNames(
                                (provider.name === 'Facebook') ? ' pl-5  bg-blue-600 text-white text-md xl:text-lg w-11/12 font-semibold rounded-md py-1   xl:py-2  hover:shadow-md m-4'
                                    : (provider.name === 'Google') ? "bg-white text-black text-md xl:text-lg w-11/12 font-semibold rounded-md py-1   xl:py-2  hover:shadow-md m-4"
                                        : (provider.name  === 'GitHub') ? "bg-black text-white text-md xl:text-lg w-11/12 font-semibold rounded-md py-1 xl:py-2  hover:shadow-md m-4 "
                                            :"bg-violet-700 text-white text-lg xl:text-xl  font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:bg-violet-500 m-4"
                            )
                        }
                    >
                        <div className="flex justify-center space-x-3">
                        {provider.name === "GitHub" && (

                            <div className=" mt-1">
                            <img className="h-5 w-5  rounded-full ring-1 ring-white bg-white" src='/github2.png' alt='logo'/>
                            </div>
                        )}
                        {provider.name === "Facebook" && (
                            <div className=" mt-1">
                            <img className="h-5 w-5  rounded-full ring-1 ring-blue-500 bg-white" src='/facebook2.webp' alt='logo'/>
                            </div>
                        )}
                        {provider.name === "Google" && (
                            <div className=" mt-1">
                            <img className="h-5 w-5  rounded-full  bg-white" src='/google2.webp' alt='logo'/>
                            </div>
                        )}

                        <div>Continue with {provider.name}</div>
                        </div>
                    </button>
                </div>
            ))}
            </div>
            </div>
            </div>
        </>
    )
}



export async function getServerSideProps(context) {

    const {req} = context
    const session = await getSession({ req })
    if (session) {
        //signed in
        
        

        return {
            redirect: {destination: '/'}
        }
    }

    const providers = await getProviders()
    return {
        props: { providers },
    }
}
