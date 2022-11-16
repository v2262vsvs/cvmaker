import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useSession} from "next-auth/react";
import {supabase} from "../../utils/supabaseClient";
import Image from "next/image";
import Link from "next/link";



const PersonalForm = () => {
    //stopped from calling useEffect twice
    const dataFetchedRef = useRef(false);

    const [personal, setPersonal] = useState<Personal>({});
    const {data: session} = useSession()



    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        let file;
        if (e.target.files) {
            file = e.target.files[0];
        }
        const {data, error} = await supabase.storage
            .from("images")
            .upload("public" + file?.name, file as File);
        if (data) {
            console.log(data);
            console.log(
                "https://opvjnmulzzsldrjmksau.supabase.co/storage/v1/object/public/images/public" +
                file?.name
            );
        } else if (error) {
            console.log(error);
        }
        const value = `https://opvjnmulzzsldrjmksau.supabase.co/storage/v1/object/public/images/public${file?.name}`;
        setPersonal((personal) => ({
            ...personal,
            ["image"]: value,
        }));
    };
    const handleRemoveImage = async () => {
        const value = undefined
        setPersonal((personal)=> ({
            ...personal,
            ["image"]: value
        }))
    };
    const handleChangePersonal = async (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
        name: string
    ) => {
        const value = e.target.value;
        setPersonal((personal) => ({
            ...personal,
            [name]: value,
        }));
    };

    useEffect(() => {
        //stopped from calling useEffect twice
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        console.log('useEffect on reload personal page')
        const data = window.localStorage.getItem("PERSONAL_STATE");
        console.log("from storage", data);
        let formated: Personal = {
            name: "",
            surname: "",
            image: "",
            phone: "",
            postalcode: "",
            address: "",
            city: "",
            email: "",
        };
        if (data !== null) {
            formated = JSON.parse(data);
            console.log("name", formated.name);
            setPersonal((personal) => ({
                ...personal,
                name: formated.name,
                surname: formated.surname,
                image: formated.image,
                phone: formated.phone,
                postalcode: formated.postalcode,
                address: formated.address,
                city: formated.city,
                email: formated.email,
            }));
        }
    }, []);
    useEffect(() => {
        if (session) {
            window.localStorage.setItem("PERSONAL_STATE", JSON.stringify(personal));
            console.log("storage", window.localStorage.getItem("PERSONAL_STATE"))
        }
    }, [personal])

    //for validation
    const [focused, setFocused] = useState(false);
    console.log('focused',focused.toString())

    const handleFocus = () => {
        setFocused(true);
    };

    let Focused = {'focused': focused.toString()}

    return (
        <>
            <div style={{height: focused ? '685px': '600px'}}
                 className="bg-white max-w-[850px] shadow-violetShadow rounded-xl h-full mr-auto ml-auto "
            >
                <div className=" pt-6 pb-5 font-medium px-10 text-xl text-neutral-700">
                    Personal data
                </div>
                <div className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200 "></div>
                {/*max-[516px]:flex-wrap*/}
                <div className="flex space-x-7 mt-7 max-md:w-11/12 max-md:mx-auto ml-10 mr-10">
                    <div
                        className="relative z-0 bg-violet-50 h-44 w-44 max-[473px]:w-2/3 rounded-xl shadow-violetShadowMenu outline-violet-100 hover:outline-violet-300 outline-dotted hover:outline-2 hover:outline-offset-2 ring-1 ring-violet-200 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className=" h-16 w-16 text-center ml-auto mr-auto mt-10 text-violet-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div className="text-center text-sm mt-3 text-violet-500">
                            Upload Photo
                        </div>
                        {personal.image && (
                            <div>
                                <Image
                                    layout="fill"
                                    src={`${personal.image}`}
                                    className="w-44 h-44 rounded-xl"
                                />
                                <div
                                    className="absolute z-20 w-44 h-44 inset-0 opacity-0 hover:opacity-60 text-center items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleRemoveImage()}
                                        className="mt-12 ml-12 h-20 w-20 hover:scale-95 cursor-pointer text-violet-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}
                        <input
                            onChange={(e) => {
                                handleUpload(e);
                            }}
                            type="file"
                            className="absolute inset-0 z-10 opacity-0 bg-pink-100 h-44 w-44"
                            accept="image/*"
                        />
                    </div>
                    <div className="grow space-y-7 -mt-1">
                        <div className="space-y-2">
                            <div className="text-neutral-600 text-sm ">Name *</div>
                            <input
                                value={personal.name || ''}
                                onChange={(e) => handleChangePersonal(e, "name")}
                                className=" px-4 py-3  w-full outline-none appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                                type='text'
                                name='name'
                                pattern='^[A-Za-z0-9]{3,16}$'
                                required={true}
                                {...Focused}
                                onBlur={handleFocus}
                            />
                            <span className='span-redmark'>{"Firstname should be 3-16 characters and shouldn't include any special character!"}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="text-neutral-600 text-sm">Surname *</div>
                            <input
                                value={personal.surname || ''}
                                onChange={(e) => handleChangePersonal(e, "surname")}
                                className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                                type='text'
                                name='lastname'
                                pattern='^[A-Za-z0-9]{3,16}$'
                                required={true}
                                {...Focused}
                                onBlur={handleFocus}
                            />
                            <span className='span-redmark'>{"Lastname should be 3-16 characters and shouldn't include any special character!"}</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-[770px]  ml-auto mr-auto space-y-5 mt-5 max-md:w-11/12">
                    <div className="flex space-x-7">
                        <div className="space-y-2 grow">
                            <div className="text-neutral-600 text-sm">Email *</div>
                            <input
                                value={personal.email || ''}
                                onChange={(e) => handleChangePersonal(e, "email")}
                                className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                                type='email'
                                name='email'
                                required={true}
                                {...Focused}
                                onBlur={handleFocus}
                            />
                            <span className='span-redmark'>{"It should be a valid email address!"}</span>
                        </div>
                        <div className="space-y-2 grow">
                            <div className="text-neutral-600 text-sm">Phone</div>
                            <input
                                value={personal.phone || ''}
                                onChange={(e) => handleChangePersonal(e, "phone")}
                                className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                                type='tel'
                                name='telephone'
                            />
                        </div>
                    </div>

                    <div className="">
                        <div className="space-y-2 ">
                            <div className="text-neutral-600 text-sm">Address</div>
                            <input
                                value={personal.address || ''}
                                onChange={(e) => handleChangePersonal(e, "address")}
                                className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                                type='text'
                            />
                        </div>
                    </div>

                    <div className="flex space-x-7">
                        <div className="space-y-2 grow">
                            <div className="text-neutral-600 text-sm">Postal code</div>
                            <input
                                value={personal.postalcode || ''}
                                onChange={(e) => handleChangePersonal(e, "postalcode")}
                                className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                            />
                        </div>
                        <div className="space-y-2 grow">
                            <div className="text-neutral-600 text-sm">City</div>
                            <input
                                value={personal.city || ''}
                                onChange={(e) => handleChangePersonal(e, "city")}
                                className="appearance-none block w-full bg-violet-50 text-gray-700 border border-violet-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-500"
                                placeholder=""
                                type='text'
                                name='city'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="items-center text-center pt-10">
                <Link href={"/box/experiencepage"}>
                    <button
                        disabled={!personal.name || !personal.surname || !personal.email}
                        className="bg-violet-700 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto animation-button">
                        <div className="text-white text-lg font-semibold">
                            The next step
                        </div>
                        <img src='/ChevronNext.svg' alt='next' className="h-6 w-6 text-center mt-auto mb-auto"/>
                    </button>
                </Link>
            </div>
        </>
    );
};

export default PersonalForm;
