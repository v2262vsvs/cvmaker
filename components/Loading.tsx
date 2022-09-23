import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function Loading(): any {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url:any) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url: any) => (url === router.asPath) && setTimeout(() =>{setLoading(false)},300);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError',  handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    return loading && (<div className='spinner-wrapper'>
        <div className="spinner"></div></div>)
}

export default Loading
