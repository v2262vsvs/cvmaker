import Image from "next/image";
import Link from "next/link";
import HeadMeta from "../components/pageSections/HeadMeta";
import {useTranslation} from "react-i18next";
import Footer from "../components/pageSections/Footer";

export default function Custom404() {
    const { t } = useTranslation();

    return (
        <>
            <HeadMeta title={'404 - CV'} content={'404 oh no wrong page!! :('}/>
            <div className='container mx-auto  flex-row text-center'>
                <Image src="/404-image.png" width={478} height={478} alt=""/>
                <p>404</p>
                <p>{t('Page not found')}</p>
                <p className='mx-auto max-w-xs my-6'>
                    {t('Ops')}
                </p>
                <Link href="/">
                    <button
                        className="bg-violet-500 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:bg-violet-600 mb-20 animation-button">
                        {t('Go back home')}
                    </button>
                </Link>
            </div>
            <Footer/>
        </>
    )
}
