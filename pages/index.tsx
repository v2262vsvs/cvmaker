import HomeContent from "../components/pageSections/HomeContent";
import Footer from "../components/pageSections/Footer";
import HeadMeta from "../components/pageSections/HeadMeta";
import ToTopButton from "../components/elementsUI/ToTopButton";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { authActions } from "../slices/auth-slice";



export default function Home() {
    const {data:session} = useSession()
    const dispatch = useDispatch()
    if ( session ){
        dispatch(authActions.setSession({
            name:session?.user?.name!,
            email:session?.user?.email!,
            image:session?.user?.image!,
        }))
    }





    return (
        <>
        <div className=" overflow-x-hidden ">
            <HeadMeta
                title={'CV - online constructor'}
                content={'Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!'}
            />
            <ToTopButton/>
            <HomeContent/>
            <Footer/>
        </div>
        </>
  );
}

