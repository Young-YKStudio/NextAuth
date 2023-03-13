import { HeaderProps } from "./interfaces";
import { signOut } from 'next-auth/react'
import { FunctionComponent } from "react";
import NextLink from 'next/link'

const HorizontalHeader:FunctionComponent<HeaderProps> = ({navigations, session}: HeaderProps) => {
  return (
    <nav className="fixed z-50 w-full bg-indigo-300 p-4 flex justify-between">
      <div>
        <p>Logo</p>
      </div>
      <ul className="flex gap-4">
        {navigations && navigations.map((navigation, i: number) => {
          return <li key={i}>
            <NextLink href={navigation.href}>
              {navigation.name}
            </NextLink>
          </li>
        })}
        { session ? <button onClick={() => signOut()}>Logout</button> : <li><NextLink href='/login'>Login</NextLink></li>}
      </ul>
    </nav>
  );
}
export default HorizontalHeader;