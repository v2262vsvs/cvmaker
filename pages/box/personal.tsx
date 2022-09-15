import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import ProgressBar from "../../components/ProgressBar";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";
import { useSession } from "next-auth/react";


type Personal = {
  name?: string;
  syrname?: string;
  image?: string | undefined;
  phone?: string;
  postalcode?: string;
  address?: string;
  city?: string;
  email?: string;
};

function personal() {
  const [personal, setPersonal] = useState<Personal>({});
  const {data:session} = useSession()

  const [image, setImage] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const [syrname, setSyrname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postalcode, setPostalcode] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    const { data, error } = await supabase.storage
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
    
    //setImage("https://opvjnmulzzsldrjmksau.supabase.co/storage/v1/object/public/images/public"+file?.name)
  };
  const handleRemoveImage = async () => {
    const list = personal;
    list.image = undefined;
    setPersonal(list);
    
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
    console.log('useEffect on reload personal page')
    const data = window.localStorage.getItem("PERSONAL_STATE");
    console.log("from storage", data);
    let formated: Personal = {
      name: "",
      syrname: "",
      image: "",
      phone: "",
      postalcode: "",
      address: "",
      city: "",
      email: "",
    };
    if (data !== null) {
      formated = JSON.parse(data);
      const value = formated.name;
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
  }, []);
  useEffect(() => {
    if(personal.name != undefined &&personal.syrname != undefined &&personal.phone != undefined &&personal.email != undefined &&personal.city != undefined &&personal.address != undefined &&personal.postalcode != undefined && personal.image != undefined){
      window.localStorage.setItem("PERSONAL_STATE", JSON.stringify(personal));
      console.log("storage", window.localStorage.getItem("PERSONAL_STATE"));
    }
  }, [personal])
  
  

  

  return (
    <div className="h-full w-full bg-greenn-500 space-y-10">
      <div className="pt-10">
        <div className="text-center text-white font-semibold text-4xl ">
          Personal data
        </div>
      </div>
      <div className="">
        <div className="w-11/12 lg:w-2/6 mx-auto">
          <div className="bg-green-300 h-2 flex items-center justify-between">
            <div className="w-1/2 flex justify-start">
              <div className="bg-bluee-500 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white text-center"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <Link href="/box/experience" className="w-1/2 flex justify-center">
              <div className="bg-green-300 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 text-center"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
            <div className="w-1/2 flex justify-end">
              <div className="bg-green-300 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 text-center"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-t-md h-full shadow-t-xl space-y-10 pt-10 ">
        <div className="bg-white max-w-[850px] shadow-xl rounded-md h-full mr-auto ml-auto ">
          <div className=" pt-6 pb-5 font-medium px-10 text-xl text-neutral-700">
            Personal data
          </div>
          <div className="border-t-0.1 max-w-[770px] ml-auto mr-auto border border-gray-200"></div>

          <div className="flex space-x-5 mr-10 ml-10 mt-7">
            <div className="relative z-0 bg-neutral-100 h-44 w-44 rounded-sm shadow-sm outline-gray-100 hover:outline-neutral-300 outline-dotted hover:outline-2 hover:outline-offset-2 ring-1 ring-neutral-200 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-16 w-16 text-neutral-500	 text-center ml-auto mr-auto mt-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-center text-sm mt-3 text-neutral-500">
                Upload Photo
              </div>
              {personal.image && (
                <div>
                  <Image
                    layout="fill"
                    src={`${personal.image}`}
                    className="w-44 h-44 "
                  />
                  <div className="absolute z-20 w-44 h-44 inset-0 opacity-0 hover:opacity-60 text-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleRemoveImage()}
                      className="mt-12 ml-12 h-20 w-20 text-neutral-500   hover:scale-95 cursor-pointer"
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
                  value={personal.name}
                  onChange={(e) => handleChangePersonal(e, "name")}
                  className=" ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <div className="text-neutral-600 text-sm">Syrname *</div>
                <input
                  value={personal.syrname}
                  onChange={(e) => handleChangePersonal(e, "syrname")}
                  className="ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          {/* */}
          <div className="max-w-[770px]  ml-auto mr-auto space-y-5 mt-5">
            <div className="flex space-x-7">
              <div className="space-y-2 grow">
                <div className="text-neutral-600 text-sm">Email</div>
                <input
                  value={personal.email}
                  onChange={(e) => handleChangePersonal(e, "email")}
                  className="ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
              <div className="space-y-2 grow">
                <div className="text-neutral-600 text-sm">Phone</div>
                <input
                  value={personal.phone}
                  onChange={(e) => handleChangePersonal(e, "phone")}
                  className="ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div className="">
              <div className="space-y-2 ">
                <div className="text-neutral-600 text-sm">Address</div>
                <input
                  value={personal.address}
                  onChange={(e) => handleChangePersonal(e, "address")}
                  className="ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div className="flex space-x-7">
              <div className="space-y-2 grow">
                <div className="text-neutral-600 text-sm">Postal code</div>
                <input
                  value={personal.postalcode}
                  onChange={(e) => handleChangePersonal(e, "postalcode")}
                  className="ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
              <div className="space-y-2 grow">
                <div className="text-neutral-600 text-sm">City</div>
                <input
                  value={personal.city}
                  onChange={(e) => handleChangePersonal(e, "city")}
                  className="ring-2 ring-gray-200 px-4 py-3 rounded-sm w-full outline-none"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="items-center text-center pt-10">
          <Link href="/box/experience">
            <button className="bg-indigo-500 px-12 py-3 rounded-md hover:shadow-md  shadow-sm flex ml-auto mr-auto">
              <div className="text-white text-lg font-semibold">
                The next step
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white text-center mt-auto mb-auto font-semibold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
        <footer className="ml-auto   mr-auto text-center text-gray-500 text-xs max-w-[500px]">
          By clicking "Next", you will start creating your resume and agree to
          our general terms and conditions and privacy policy .
        </footer>
      </div>
    </div>
  );
}

export default personal;
