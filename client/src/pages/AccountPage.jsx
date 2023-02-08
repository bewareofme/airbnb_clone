import axios from 'axios'
import React, { useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

function AccountPage() {
    const {subpage}=useParams()
    const {user,ready,setUser}=useContext(UserContext)
    console.log(ready,user)
    const handleLogout=async()=>{
        await axios.get('/logout')
        setUser(null)
    }
    if (!user && ready){
        return <Navigate to={'/'}/>
    }
    const linkclasses=(type)=>{
        if(type===subpage ||(type==='profile' && subpage===undefined)) return 'border-gray-400 px-4 py-2 bg-red-400 text-white rounded-full'
        return 'border-gray-400 px-2 py-1'
    }
  return (
    <div className='mt-5'>
        <div className='flex space-x-10 max-w-lg mx-auto mt-5 mb-8'>
        <Link to={'/account'} className={linkclasses('profile')}>My Profile</Link>
        <Link to={'/account/bookings'} className={linkclasses('bookings')}>My booking</Link>
        <Link to={'/account/accomodations'} className={linkclasses('accomodations')}>My accomodations</Link>
        </div>
        {subpage===undefined && (
            <div className='text-center mx-auto max-w-lg space-y-2'>
                <div>
                    You are logged in on {user?.email}
                </div>
                <button onClick={handleLogout} className='bg-red-400 rounded-lg p-2 text-white w-full max-w-md'>Logout</button>
            </div>
        )}
    </div>
  )
}

export default AccountPage