import React, {useEffect, useState} from 'react';
import CVpdfStanford from "./pdfSamples/CVpdfStanford";

const CvCard = (props: any) => {

    const {openModal} = props

    const [personal, setPersonal] = useState<Personal>({});
    const [profileDescription, setProfileDescription] = useState<string>("");
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [experienceList, setExperienceList] = useState<Experience[]>([]);
    const [skillsList, setSkillsList] = useState<Skills[]>([]);
    const [languagesList, setLanguagesList] = useState<Languages[]>([]);


    useEffect(() => {
        const data = window.localStorage.getItem("PERSONAL_STATE");
        console.log("from storage", data);
        if (data !== null) {
            const formated: Personal = JSON.parse(data);
            console.log("name", formated.name);
            setPersonal((personal) => ({
                ...personal,
                name: formated.name,
                syrname: formated.syrname,
                image: formated.image,
                phone: formated.phone,
                postalcode: formated.postalcode,
                address: formated.address,
                city: formated.city,
                email: formated.email,
            }));
        }
        const data2 = window.localStorage.getItem("PROFILE_DESCRIPTION_STATE");
        let formated2 = null;
        if (data2 !== null) {
            formated2 = JSON.parse(data2);
            setProfileDescription(formated2);
            console.log("profileDescription ", profileDescription);
        }
        const data3 = window.localStorage.getItem("EDUCATION_STATE");
        console.log("from storage", data3);
        let formated3 = null;
        if (data3 !== null) {
            formated3 = JSON.parse(data3);
            setEducationList(formated3);
            console.log("education ", educationList);
        }

        const data4 = window.localStorage.getItem("EXPERIENCE_STATE");
        console.log("from storage", data4);
        let formated4 = null;
        if (data4 !== null) {
            formated4 = JSON.parse(data4);
            setExperienceList(formated4);
            console.log("experience ", experienceList);
        }
        const data5 = window.localStorage.getItem("SKILLS_STATE");
        console.log("from storage", data5);
        let formated5 = null;
        if (data5 !== null) {
            formated5 = JSON.parse(data5);
            setSkillsList(formated5);
            console.log("skills ", skillsList);
        } else {
            setSkillsList([
                {
                    habit: "",
                    level: "",
                },
            ]);
        }
        const data6 = window.localStorage.getItem("LANGUAGES_STATE");
        console.log("from storage", data6);
        let formated6 = null;
        if (data6 !== null) {
            formated6 = JSON.parse(data6);
            setLanguagesList(formated6);
            console.log("languages ", languagesList);
        } else {
            setLanguagesList([
                {
                    language: "",
                    level: "",
                },
            ]);
        }
    }, []);

    return (
        <div onClick={openModal} className='-ml-20'>
            <CVpdfStanford
                personal={personal}
                profileDescription={profileDescription}
                educationList={educationList}
                experienceList={experienceList}
                skillsList={skillsList}
                languagesList={languagesList}
            />
        </div>
    );
};

export default CvCard;
