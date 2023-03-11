import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBox() {
  const { data: session } = useSession()

  if(session) {
    return (
      <>
        <p className="text-white">Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()} className='text-white'>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br/>
      <button onClick={() => signIn()} className='text-white'>Sign in</button>
    </>
  )
}