import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function RegisterPage() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const registration= async (e)=>{
    e.preventDefault();
    try{
      await axios.post('/register',{
           name:name,
           email:email,
           password:password
         }
      )
      alert('registration successful')
    }
    catch(e){
      alert('please try again later')
    }

    } 
  return (
    <div className='flex flex-col  items-center justify-center grow relative bottom-40 '>
    <h1 className='text-center font-bold text-2xl'>REGISTER</h1>
    <form action="" className='flex flex-col w-full max-w-md mt-10 space-y-2' onSubmit={registration}>
        <input type="text" placeholder='Jon Doe' className='inputStyle' onChange={e=>setName(e.target.value)}   />
        <input type="text" placeholder='Enter Your email' className='inputStyle'onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder='Enter your password' className='inputStyle'onChange={e=>setPassword(e.target.value)}  />
        <button className='bg-red-400 rounded-lg p-2'>Register</button>
        <div className='text-center text-gray-400'>
          <span>Already have an account? </span>
          <Link className='text-black underline hover:text-blue-400' to={'/login'}>Login Now</Link>
        </div>
    </form>
    </div>
  )
}

export default RegisterPage