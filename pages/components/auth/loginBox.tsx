import { useSession, signIn, signOut } from "next-auth/react";
import { FunctionComponent } from "react";

export default function LoginBox(): FunctionComponent<HTMLElement> | any {
  const { data: session } = useSession()

  if(session) {
    return (
      <div className="text-white">
        <p className="text-white">Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()} className='text-white'>Sign out</button>
      </div>
    )
  } 
}