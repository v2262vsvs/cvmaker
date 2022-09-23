import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import Header from '../components/Header'
import Loading from '../components/Loading'

import { ApolloProvider } from '@apollo/client'
import client from "../apolo-client"
import {Toaster} from "react-hot-toast"


//remove overflow-y-scroll || h-screen

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <SessionProvider session={session}>
                <div className='bg-violet-50'>
                    <Toaster/>
                    <Loading/>
                    <Header/>
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </ApolloProvider>
    )

}

export default MyApp
