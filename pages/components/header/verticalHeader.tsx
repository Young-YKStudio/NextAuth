import { HeaderProps } from "./interfaces";
import { signOut } from 'next-auth/react'
import { FunctionComponent, useState, MouseEvent } from "react";
import NextLink from 'next/link';
import { MdLogin, MdLogout, MdLastPage, MdFirstPage } from 'react-icons/md'

const VerticalHeader:FunctionComponent<HeaderProps> = ({navigations, session, path}: HeaderProps) => {

  const [ isExtended, setIsExtended ] = useState(true)

  const styleDistributor = (nav: string) => {
    if (path === nav) {
      return 'bg-white/50 px-4 py-2 rounded-md flex items-center'
    } else {
      return 'hover:bg-white/50 px-4 py-2 rounded-md flex items-center'
    }
  }

  const extendButtonHandler = (e: MouseEvent) => {
    setIsExtended(!isExtended)
  }

  const extendButton = () => {
    return isExtended ? 
      <button onClick={extendButtonHandler}><MdLastPage className="w-6 h-6 text-white" /></button> 
    : 
      <button onClick={extendButtonHandler}><MdFirstPage className="w-6 h-6 text-white" /></button>
  }

  return (
    <nav className="fixed z-50 w-48 h-full bg-indigo-300 p-4">
      <div className="absolute top-2 left-48 bg-indigo-300 px-0.5 py-4 rounded-r-md flex items-center">
        {extendButton()}
      </div>
      <ul className="flex flex-col gap-2 text-indigo-900">
        <li className="text-center font-bold text-2xl mb-2">Logo</li>
        {navigations && navigations.map((navigation, i: number) => {
          return <NextLink
              key={i} 
              href={navigation.href}
              className={styleDistributor(navigation.href)}
            >
              {navigation.icon}{navigation.name}
            </NextLink>
        })}
        { session ? <button onClick={() => signOut()} className='hover:bg-white/50 px-4 py-2 rounded-md flex items-center'><MdLogout className="mr-2 w-5 h-5"/>Logout</button> : <NextLink href='/login' className="hover:bg-white/50 px-4 py-2 rounded-md flex items-center"><MdLogin className="mr-2 w-5 h-5"/>Login</NextLink>}
      </ul>
    </nav>
  );
}
export default VerticalHeader;