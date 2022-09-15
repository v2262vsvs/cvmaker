import { ChevronDownIcon } from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Image from 'next/image'

export default function UserDropDown() {
    const {data:session} = useSession()

    const [open, setOpen] = useState(false)
    const onMenu = async(state:boolean)=>{
        setOpen(state)
        console.log(open)
    }
return (
    <div className="">



<button onClick={()=> onMenu(!open)} id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-sm   focus:outline-none dark:text-white  dark:bg-gray-800 " type="button"> 
        <div onClick={()=> onMenu(!open)} className='flex items-center space-x-2 p-2 cursor-pointer border border-gray-100' >
            <div className='relative h-7 w-7 flex-shrink-0 rounded-full'>
                <Image objectFit='contain' src={`${session?.user?.image}`} layout="fill" className='' alt=""/>
            </div>
            <div className='felx flex-1 text-sm'>
            <p className='truncate text-xs'>{session?.user?.name}</p>
            </div>
            <ChevronDownIcon className='w-5 h-5 flex-shrink-0  text-gray-400'/>
        </div>
</button>

{/**<!-- Dropdown menu -->*/}
<div id="dropdownDotsHorizontal" className={`${open && 'hidden'} overflow-visible z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
      <li>
        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
    </ul>
    <div className="py-1">
      <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
    </div>
</div>
      
    </div>
  )
}
