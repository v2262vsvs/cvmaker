import React from 'react';
import Head from "next/head";


const HeadMeta = (props: any) => {

    const {title, content} = props

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={content}/>
            <link rel="icon" href="/logo.png"/>
        </Head>
    );
};

export default HeadMeta;
