import Image from "next/image";
import Link from "next/link";
import HeadMeta from "../components/pageSections/HeadMeta";

export default function Custom404() {
    return (
        <>
            <HeadMeta title={'404 - CV'} content={'404 oh no wrong page!! :('}/>
            <div className='container mx-auto w-96 flex-row text-center'>
                <Image src="/404-image.png" width={478} height={478}/>
                <p>404</p>
                <p>Page not found</p>
                <p className='m-4'>
                    Oops! Looks like you followed a bad link.
                    If you think this is a problem with us, please tell us.
                </p>
                <Link href="/">
                    <button
                        className="bg-green-500 text-white text-lg xl:text-xl font-semibold rounded-md py-2 px-4 xl:py-4 xl:px-7 hover:bg-green-600">
                        Go back home
                    </button>
                </Link>
            </div>
        </>
    )
}
