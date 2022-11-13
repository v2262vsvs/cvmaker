import React, {useEffect, useState} from 'react'
import MyModal from '../elementsUI/MyModal';


function Languages() {
    const [openLanguages, setOpenLanguages] = useState<boolean>(false);

    const [visibleLanguages, setVisibleLanguages] = useState<number>(0);

    const [languagesList, setLanguagesList] = useState<Languages[]>([]);

    const handleRemoveLanguages = async (index: number) => {
        if(languagesList.length === 1) {
            window.localStorage.removeItem("LANGUAGES_STATE")
        }
        const list = [...languagesList];
        list.splice(index, 1);
        setLanguagesList(list);
    };

    const handleAddLanguages = async (
        language: string,
        level: string,
    ) => {
        setVisibleLanguages(languagesList.length)
        setLanguagesList([
            ...languagesList,
            {language, level},
        ]);
    };

    const handleChangeLanguages = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number, name: string) => {
        const value = e.target.value
        const list = [...languagesList]
        switch (name) {
            case 'language':
                list[index].language = value
                setLanguagesList(list)
                break;
            case 'level':
                list[index].level = value
                setLanguagesList(list)
                break;
        }
    }

    useEffect(() => {
        const data = window.localStorage.getItem("LANGUAGES_STATE");
        console.log("from storage", data);
        let formated = null;
        if (data !== null) {
            formated = JSON.parse(data);
            setLanguagesList(formated);
            console.log("languages ", languagesList);
        } else {
            setLanguagesList([{
                language: '',
                level: ''
            }])
        }

    }, []);

    useEffect(() => {
        if (languagesList.length !== 0 || languagesList.length != 0) {
            console.log("data saved");
            window.localStorage.setItem(
                "LANGUAGES_STATE",
                JSON.stringify(languagesList)
            );
            console.log("storage", window.localStorage.getItem("LANGUAGES_STATE"));
        }
    }, [languagesList]);


    return (
        <div>
            <div className="bg-white max-w-[850px] shadow-violetShadow rounded-xl  mr-auto ml-auto max-md:w-11/12 max-md:mx-auto">
                <div
                    className="cursor-pointer"
                    onClick={() => setOpenLanguages(!openLanguages)}
                >
                    <div className="flex py-8 px-10 space-x-2">

                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-7 w-7 font-medium bg-white text-violet-700" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                  clipRule="evenodd"/>
                        </svg>
                        <div className="font-medium text-xl text-violet-700">
                            Languages
                        </div>
                    </div>
                </div>

                {openLanguages && (
                    <div className="mr-10 ml-10 pb-10 -mt-2 space-y-4 max-md:w-11/12 max-md:mx-auto">
                        {languagesList.map((languages, index) => (

                            <div key={index} className="  -mt-2 space-y-4">
                                {(visibleLanguages == index) ? (<div className="  -mt-2 space-y-4">
                                    <div
                                        className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>

                                    <div className="flex space-x-7">
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Language</div>
                                            <input
                                                value={languages.language}
                                                onChange={(e) =>
                                                    handleChangeLanguages(e, index, 'language')
                                                }
                                                placeholder="for example, Spanish"
                                                name='language'
                                                className="ring-2 ring-gray-200 px-4 py-3 text-neutral-600 rounded-sm w-full outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2 grow">
                                            <div className="text-neutral-600 text-sm">Level</div>
                                            <select value={languages.level}
                                                    onChange={(e) =>
                                                        handleChangeLanguages(e, index, 'level')
                                                    } name="level" id="cars"
                                                    className="ring-2 ring-gray-200 my-auto text-lg px-4 py-3 text-neutral-600   rounded-sm w-full outline-none">
                                                <option value="" disabled selected>Choose a level</option>
                                                <option className="" value="Fluent">Native Language</option>
                                                <option value="Hight level">Hight level of spoken and written language</option>
                                                <option value="Good knowledge">Very good knowledge</option>
                                                <option value="Sufficient">Knowledge at a good working level</option>
                                                <option value="Working knowledge">Working knowledge</option>
                                                <option value="A1">A1</option>
                                                <option value="A2">A2</option>
                                                <option value="B1">B1</option>
                                                <option value="B2">B2</option>
                                                <option value="C1">C1</option>
                                                <option value="C2">C2</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="">
                                            <MyModal advice={"1 .Always indicate your native language. \n2 .Specify as many languages as possible, but only those that you speak, read and really understand. "}/>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                className="rounded-sm bg-white hover:text-red-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                <div onClick={() => handleRemoveLanguages(index)}
                                                     className="flex sapce-x-2 ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 hover:text-red-500 text-neutral-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div className="mt-auto mb-auto">
                                                        Remove
                                                    </div>
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-sm bg-white hover:text-bluee-500 hover:ring-gray-400 text-center ring-1 ring-gray-300 px-3 mt-auto mb-auto py-1 text-xs text-neutral-600 hover:bg-opacity-30 bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                <div className="flex sapce-x-2 items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="hover:text-bluee-500 h-5 w-5 text-neutral-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                                                    </svg>
                                                    <div className="mt-auto mb-auto">Save</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>) : (
                                    <div onClick={() => setVisibleLanguages(index)}>
                                        <div className="   space-y-4 mb-7">
                                            <div
                                                className=" border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>
                                            <div className="flex justify-between ">
                                                <div className="mt-auto mb-auto text-neutral-400 text-md">
                                                    <div className="font-medium">{languages.language}</div>
                                                    <div className="text-xs">Language</div>
                                                </div>
                                                <div className=" flex space-x-3 mt-auto mb-auto  text-neutral-600">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="cursor-pointer"
                                                         onClick={() => handleRemoveLanguages(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        ))}
                        <div>
                            <button
                                onClick={() =>
                                    handleAddLanguages("", "")
                                }
                                type="button"
                                className="flex py-3 w-full justify-center space-x-2 rounded-sm bg-neutral-200  text-center  text-md text-neutral-600 hover:bg-opacity-60 bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" h-5 w-5 text-neutral-600 mt-auto mb-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="mt-auto mb-auto">Add another Language</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Languages
