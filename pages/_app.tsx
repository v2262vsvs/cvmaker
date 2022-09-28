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


//remove overflow-y-scroll || h-screen

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    return (
        <Provider store={store}>
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
        </Provider>
    )

}

export default MyApp
