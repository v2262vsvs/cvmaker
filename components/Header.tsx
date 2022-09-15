import Image from 'next/image'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BeakerIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/solid'

import Link from 'next/link'
import UserDropDown from './UserDropDown'


function Header() {
    const {data:session} = useSession()
    console.log(session)
    const [open, setOpen] = useState(false)
    const onMenu = async(state:boolean)=>{
        setOpen(state)
        console.log(open)
    }

    const signin = async ()=>{
        signIn()
    }
    const singout = async ()=>{
        signOut()
    }
  return (
    <div className=''>
    <div className='flex justify-between sticky top-0 z-50 bg-white px-4 py-2 shadow-sm items-center space-x-10'>
        <div className='relative h-12 w-20 flex-shrink-0 cursor-pointer hover:shadow-md '>
            <Link href="/">
                <Image  objectFit="cover"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmddonMMPG8V8cPM40ne9d7D5YPqn3D58Y9VyXBjcbtNnl5_-3yZy_zNbakykMwk72ss&usqp=CAU" layout="fill" />
            </Link>
        </div>
        <div className='flex'>
        <div className='flex items-center mx-7 xl:min-w-[300px] space-x-5  border-r-2 border-gray-300 mr-3 px-3'>
            <Link href={`/box/personal`} className='flex hover:text-green-900 ring-1 ring-green-900 rounded-md p-1 shadow-sm hover:shadow-md'>
                Create My Resume
            </Link>
           <div className='flex items-center hover:text-blue-900'>
           <p>Resume</p>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            </div>
           <div className='flex items-center hover:text-blue-900'>
           <p>Cover Letter</p>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            </div>
           <p className='hover:text-blue-900 hidden lg:inline-block'>Blog</p>
           <p className='hover:text-blue-900 hidden lg:inline-block'>FAQ</p>
        </div>
        <form className='hidden lg:flex items-center space-x-2 rounded-l-md border border-gray-200  bg-gray-100 px-3 py-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <input className='bg-transparent  outline-none flex-1' type="text" placeholder='Search Employee'/>
        <button type="submit" hidden={true}/>
        </form>
        {/* sing in btn */} 
        {session? (
            <div className='flex'>
                <div onClick={()=> singout()} className='flex items-center space-x-2 p-2 cursor-pointer border border-gray-100' >
                <div className='relative h-7 w-7 flex-shrink-0 rounded-full'>
                <Image objectFit='contain' src={`${session?.user?.image}`} layout="fill" className='' alt=""/>
                </div>
                <div className='felx flex-1 text-sm'>
                <p className='truncate text-xs'>{session?.user?.name}</p>
            </div>
            <ChevronDownIcon className='w-5 h-5 flex-shrink-0  text-gray-400'/>
        </div>

               
            </div>
        ):(
            <div>
                <div onClick={()=> signin()} className='flex items-center space-x-2 p-2 cursor-pointer border border-gray-100' >
                    <div className='relative h-5 w-5 flex-shrink-0 hover:scale-95'>
                        <Image objectFit='contain' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" layout="fill" className='' alt=""/>
                    </div>
                    <p className='text-gray-400'>Sing In</p>
                </div>
            </div>
        )}
        </div>  
    </div>

    

    </div>
  )
}

export default Header