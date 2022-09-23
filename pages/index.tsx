import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";
import HeadMeta from "../components/HeadMeta";
import ToTopButton from "../components/ToTopButton";


export default function Home() {
    return (
        <>
            <HeadMeta
                title={'CV - online constructor'}
                content={'Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!'}
            />
            <ToTopButton/>
            <HomeContent/>
            <Footer/>
        </>
  );
}
