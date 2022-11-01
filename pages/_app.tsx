import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import Header from '../components/pageSections/Header'
import Loading from '../components/elementsUI/Loading'

import { ApolloProvider } from '@apollo/client'
import client from "../apolo-client"
import { store } from '../store';
import { Provider } from 'react-redux';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import './i18n';
import '/utils/i18n'



//remove overflow-y-scroll || h-screen

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    return (
        < div >
        <Provider store={store}>
        <ApolloProvider client={client}>
            <SessionProvider session={session}>
                <div className='bg-violet-50 h-screen overflow-y-scroll' >
                    <Loading/>
                    <ToastContainer />
                    <Header/>
                    <Component  {...pageProps} />
                </div>
            </SessionProvider>
        </ApolloProvider>
        </Provider>
        </div>
    )

}

export default MyApp
