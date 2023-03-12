import { NextPage } from 'next'
import { useState, Dispatch, SetStateAction } from 'react'
import { signIn, signOut, getProviders } from 'next-auth/react'
import axios from 'axios'
import Router from 'next/router'
import { Container } from './components'
import Login from './login'
import Register from './register'

const LoginLanding: NextPage = ({ providers }: any) => {

  const [ currentSection, setCurrentSection ] = useState<string>('login')
  const [ submitForm, setSubmitForm ] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { name, email, password, passwordConfirm } = submitForm

  const redirectToHome = () => {
    const { pathname } = Router

    if(pathname === '/login') {
      Router.push('/')
    }
  }

  const AuthLinks = ({ providers }: any) => (
    <div>
      {Object.values(providers).map((provider: any) => (
        provider.name !== 'Credentials' && (
          <button
            key={provider.name}
            type='submit'
            onClick={() => {
              signIn(provider.id)
            }}
          >
            Sign in with {provider.name}
          </button>
        )
      ))}
    </div>
  )

  return (
    <div className='w-screen h-screen'>
      {currentSection === 'login'&& <Login currentSection={currentSection} setCurrentSection={setCurrentSection} providers={providers}/>}
      {currentSection === 'register'&& <Register currentSection={currentSection} setCurrentSection={setCurrentSection} />}
    </div>

  );
}
export default LoginLanding;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders()
    }
  }
}