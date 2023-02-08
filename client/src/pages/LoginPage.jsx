import React, {useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'


function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState(false)
  const {setUser}=useContext(UserContext)
  useContext(UserContext)
  const loginHandler=async(e)=>{
    e.preventDefault()
    try{
     const {data}= await axios.post('/login',{
           email,
           password
         }
      )
      setUser(data)
      alert('login successful')
      setRedirect(true)
    }
    catch(e){
      alert('please try again later')
    }
  }
  if(redirect){
  return <Navigate to={'/'}/>
  }
  return (
    <div className='flex flex-col  items-center justify-center grow relative bottom-40 '>
    <h1 className='text-center font-bold text-2xl'>LOGIN</h1>
    <form action="" className='flex flex-col w-full max-w-md mt-10 space-y-2' onSubmit={loginHandler}>
        <input type="text" placeholder='Enter Your email' className='inputStyle' onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" placeholder='Enter your password' className='inputStyle' onChange={e=>setPassword(e.target.value)} required/>
        <button className='bg-red-400 rounded-lg p-2'>Login</button>
        <div className='text-center text-gray-400'>
          <span>Don't have an Account yet? </span>
          <Link className='text-black underline hover:text-blue-400' to={'/register'}>Register Now</Link>
        </div>
    </form>
    </div>
  )
}

export default LoginPage