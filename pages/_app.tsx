import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import Header from '../components/pageSections/Header'
import Loading from '../components/elementsUI/Loading'

import { ApolloProvider } from '@apollo/client'
import client from "../apolo-client"
import {Toaster} from "react-hot-toast"
import { store } from '../store';
import { Provider } from 'react-redux';
import { useEffect } from 'react'
import { useRouter } from 'next/router'


//remove overflow-y-scroll || h-screen

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    return (
        < div className='bg-violet-50 h-screen'>
        <Provider store={store}>
        <ApolloProvider client={client}>
            <SessionProvider session={session}>
                <div >
                   
                    <Loading/>
                    <Header/>
                    <Toaster/>
                    <div >
                        <Component  {...pageProps} />
                    </div>
                </div>
            </SessionProvider>              
        </ApolloProvider>
        </Provider>
        </div>
    )

}

export default MyApp
