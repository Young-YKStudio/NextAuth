import { HeaderProps } from "./interfaces";
import { signOut } from 'next-auth/react'
import { FunctionComponent } from "react";
import NextLink from 'next/link'
import { MdLogin, MdLogout } from 'react-icons/md'

const HorizontalHeader:FunctionComponent<HeaderProps> = ({navigations, session, path}: HeaderProps) => {
  
  const styleDistributor = (nav: string) => {
    if (path === nav) {
      return 'bg-white/50 px-4 py-2 rounded-md flex items-center'
    } else {
      return 'hover:bg-white/50 px-4 py-2 rounded-md flex items-center'
    }
  }
  
  return (
    <nav className="fixed z-50 w-full bg-indigo-300 p-4 flex justify-between text-indigo-900">
      <div className="flex items-center">
        <p className="font-bold text-xl">Logo</p>
      </div>
      <ul className="flex gap-4 items-center">
        {navigations && navigations.map((navigation, i: number) => {
          return <NextLink
              key={i}
              href={navigation.href}
              className={styleDistributor(navigation.href)}
            >
              {navigation.icon}{navigation.name}
            </NextLink>
        })}
        { session ? <button onClick={() => signOut()} className='hover:bg-white/50 px-4 py-2 rounded-md flex items-center'><MdLogout className="mr-2 w-5 h-5"/>Logo</button> : <NextLink href='/login' className="hover:bg-white/50 px-4 py-2 rounded-md flex items-center"><MdLogin className="mr-2 w-5 h-5" />Login</NextLink>}
      </ul>
    </nav>
  );
}
export default HorizontalHeader;