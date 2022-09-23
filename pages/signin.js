import {getProviders, getSession, signIn} from "next-auth/react"
import HeadMeta from "../components/HeadMeta";
import React from "react";

export default function SignIn({ providers }) {
    return (
        <>
            <HeadMeta title={'CV - Sign In'} content={'add later some text'}/>
            {Object.values(providers).map((provider) => (
                <div
                    className='ml-auto mr-auto items-center text-center max-w-[500px] lg:max-w-[650px] space-y-3'
                    key={provider.name}
                >
                    <button onClick={() => signIn(provider.id)}
                            className="bg-violet-700 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:bg-violet-500 m-4"
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
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

