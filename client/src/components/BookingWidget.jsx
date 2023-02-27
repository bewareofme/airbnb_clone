import React, { useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function BookingWidget({place}) {
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [numberOfGuests,setNumberOfGuests]=useState('')
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const navigate=useNavigate()
    let numberOfNights=0
    const submitBooking=()=>{
        const price=numberOfNights*place[0]?.price
        const currentPlace=place[0]._id
        const data={currentPlace,checkIn,checkOut,numberOfGuests,name,phone,price}
        axios.post('/booking',data)
        navigate('/account/bookings')
    }
    if(checkIn && checkOut){
        numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }
  return (
    <div className="px-3 py-4  bg-white rounded-2xl">
    <div className='text-2xl font-semibold text-center'>Price ${place[0]?.price}/per night</div>
<div className='border rounded-2xl my-4 '>
    <div className='flex border-b '>
        <div className='border-r p-4'>
            <label>Check in</label>
            <input type="date" onChange={(e)=>setCheckIn(e.target.value)} value={checkIn}/>
        </div>
        <div className='p-4'>
            <label>Check out</label>
            <input type="date" onChange={(e)=>setCheckOut(e.target.value)} value={checkOut}/> 
        </div>
    </div>
    <div className='p-4 border-b'>
        <p>Number of Guests</p>
        <input type="number" min={1} className='rounded-2xl w-full border p-2' onChange={(e)=>setNumberOfGuests(e.target.value)} value={numberOfGuests}/>
    </div>
    {numberOfNights>0 && numberOfGuests &&(
        <>
            <div className='p-4 border-b'>
                <p>Your full name</p>
                <input type="text"  className='rounded-2xl w-full border p-2' onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
            <div className='p-4'>
                <p>Phone number</p>
                <input type="number" className='rounded-2xl w-full border p-2' onChange={(e)=>setPhone(e.target.value)} value={phone} />
            </div>
        </>
    )}
</div>
<button onClick={submitBooking} className='bg-red-400 rounded-2xl p-2 text-white w-full'>Book place</button>
</div>
  )
}

export default BookingWidget