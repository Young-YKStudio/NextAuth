import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import { Container } from './components';
import { useState, useEffect, Dispatch, SetStateAction, FunctionComponent, ChangeEvent } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { FcGoogle } from "react-icons/fc";

interface LoginProps {
  currentSection: string,
  setCurrentSection: Dispatch<SetStateAction<string>>,
  providers: any
} 
const Login: FunctionComponent<LoginProps> = ({currentSection, setCurrentSection, providers}) => {

  const [ loginForm, setLoginForm ] = useState({
    name: '',
    email: '',
    password: ''
  })

  const formChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const redirectToHome = () => {
    const { pathname } = Router
    if (pathname === '/login') {
      Router.push('/')
    }
  }

  const submitHandler = async () => {
    const request: any = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `/`
    })

    request.error ? console.log(request.error) : redirectToHome()
  }

  const AuthLinks = ({ providers }: any) => (
    <div className='w-full flex flex-col items-center'>
      {Object.values(providers).map((provider: any) => (
        provider.name !== 'Credentials' && (
          <button
            key={provider.name}
            className='w-full border-2 border-transparent flex items-center justify-center bg-white py-2 rounded-lg hover:border-indigo-500'
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: `${window.location.origin}`
              })
            }}
          >
            {provider.name === 'Google' && <FcGoogle className='w-6 h-6 mr-2' />} Sign in with {provider.name}
          </button>
        )
      ))}
    </div>
  )

  const { name, email, password } = loginForm

  return (
    <Container>
      <section className='w-full h-full bg-indigo-200 flex flex-col items-center justify-center'>
        <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>
          <div className='flex justify-center border-b border-white pb-4 mb-4'>
            <h1 className='font-bold text-2xl'>Login</h1>
          </div>
          <AuthLinks providers={providers} />
          <div className='flex w-full justify-center items-center gap-2 my-2'>
            <div className='w-full border-b border-white'/>
            <div className=''>
              <h1 className='text-xs'>or</h1>
            </div>
            <div className='w-full border-b border-white'/>
          </div>
          <div className='flex flex-col gap-1 text-sm mb-2' >
            <div className='flex flex-col gap-1 mb-2'>
              <label htmlFor='email'>
                Email
              </label>
              <input type='email' value={email} name='email' className='rounded-md px-4 py-1' onChange={formChangeHandler}/>
            </div>
            <div className='flex flex-col gap-1 mb-2'>
              <label htmlFor='password'>
                Password
              </label>
              <input type='password' value={password} name='password' className='rounded-md px-4 py-1' onChange={formChangeHandler}/>
            </div>
          </div>

          <div className='flex flex-col items-center gap-4'>
            <button className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full' onClick={submitHandler}>Login</button>
            <p className='text-xs'>Don't have an account? <button onClick={() => setCurrentSection('register')} className='font-bold hover:text-indigo-500'>Register</button></p>
          </div>
        </div>
      </section>
    </Container>
  );
}
export default Login;

export async function getServerSideProps() {

  const { data: session } = useSession()

  console.log(session, 'from getserversideprop')

  return {
    props: {
      providers: await getProviders()
    }
  }
}