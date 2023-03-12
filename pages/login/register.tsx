import { useState, Dispatch, SetStateAction, FunctionComponent, ChangeEvent } from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import Router from 'next/router'

interface RegisterProps {
  currentSection: string,
  setCurrentSection: Dispatch<SetStateAction<string>>,
}
const Register: FunctionComponent<RegisterProps> = ({currentSection, setCurrentSection}) => {

  const [ registerForm, setRegisterForm ] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const { name, email, password, passwordConfirm } = registerForm

  const formChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({
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

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`
    })

    res.error ? console.log(res.error) : redirectToHome()
  }

  const submitHandler = async () => {
    const request = await axios.post('/api/register', registerForm)
    if(request.status === 200) {
      await loginUser()
    }
    console.log(request)
  }

  return (
    <section className='w-full h-full bg-indigo-200 flex items-center justify-center'>
      <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>
        <div className='flex justify-center border-b border-white pb-4 mb-4'>
          <h1 className='font-bold text-2xl'>Register</h1>
        </div>
        <div className='flex flex-col gap-1 text-sm mb-2' >
          <div className='flex flex-col gap-2 mb-2'>
            <label htmlFor='name'>
              Name
            </label>
            <input type='text' value={name} name='name' className='rounded-md px-4 py-1' onChange={formChangeHandler}/>
          </div>
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
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='passwordConfirm'>
              Confirm Password
            </label>
            <input type='password' value={passwordConfirm} name='passwordConfirm' className='rounded-md px-4 py-1' onChange={formChangeHandler}/>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <button className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full' onClick={submitHandler}>Register</button>
          <p className='text-xs'>back to <button onClick={() => setCurrentSection('login')} className='font-bold hover:text-indigo-500'>login</button></p>
        </div>
      </div>
    </section>

  );
}
export default Register;