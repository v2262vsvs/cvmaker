import HomeContent from "../components/pageSections/HomeContent";
import Footer from "../components/pageSections/Footer";
import HeadMeta from "../components/pageSections/HeadMeta";
import ToTopButton from "../components/elementsUI/ToTopButton";



export default function Home() {


    return (
        <>
        <div className=" overflow-x-hidden ">
            <HeadMeta
                title={'CV - online constructor'}
                content={'Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!'}
            />
            <ToTopButton/>
            {/*@ts-ignore*/}
            <HomeContent/>
            <div className="">
            <Footer/>
            </div>

        </div>
        </>
  );
}

