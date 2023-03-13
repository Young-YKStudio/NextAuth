import { NextPage } from 'next'
import { useState} from 'react'
import { getProviders } from 'next-auth/react'
import Login from './login'
import Register from './register'

const LoginLanding: NextPage = ({ providers }: any) => {

  const [ currentSection, setCurrentSection ] = useState<string>('login')

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