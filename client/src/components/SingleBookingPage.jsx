
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Bookinginfo from './Bookinginfo'

function SingleBookingPage() {
    const [showPhoto,setShowPhoto]=useState(false)
    const [place,setPlace]=useState()
    const [dataplace,setDataPlace]=useState()
    const {action}=useParams()
    console.log(action)
    useEffect(()=>{
        if(!action)return
      axios.get('/bookings-single/'+action).then(({data})=>{
        setDataPlace(data[0])
      setPlace(data[0].place)
    })}
    ,[action])
    if(showPhoto){
        return(
            <div className=" bg-black min-h-screen inset-0 ">
            <div className="px-8 bg-black grid gap-4 pb-4">
                <div className='text-white text-3xl mr-48'>{place?.title}</div>
            <button onClick={e=>setShowPhoto(false)} className='fixed shadow shadow-black text-black bg-white px-4 py-2 right-2 top-2 rounded-full flex'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
                Close photos
                </button>
                {place.photos.map((photo,index)=>(
                    <div className="" key={index}>
                        {  <img src={'http://'+'localhost:5000'+'\\uploads\\'+photo} className='' alt="" />}
                    </div>
                ))}
            </div>
        </div>
        )
    }
  return (
    <div className='bg-gray-100 mt-4'>{console.log(place)}
        <div className='space-y-4 '>
            <div className='font-bold text-2xl'>
                {place?.title}
            </div>
            <div className='flex text-sm items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place?.address}
            </div>
        </div>
        {dataplace&&(
        <div>
            <Bookinginfo place={dataplace}/>
        </div>
        )}
            <div className='grid md:grid-cols-[2fr_1fr] mt-4 gap-2 rounded-2xl overflow-hactionden mb-4'>
                <div><img src={'http://'+'localhost:5000'+'\\uploads\\'+place?.photos[0]} className='aspect-square object-cover' alt="" /></div>
                <div className='grid '>
                    <img src={'http://'+'localhost:5000'+'\\uploads\\'+place?.photos[2]} className='aspect-square object-cover' alt="" />
                    <div className='overflow-hactionden relative'>
                        <img src={'http://'+'localhost:5000'+'\\uploads\\'+place?.photos[1]} className='aspect-square object-cover relative top-2' alt="" />
                        {place?.photos.length>3 &&(
                            <button className="absolute bg-gray-200 right-2 px-4 py-2 gap-x-2 bottom-2 shadow-md shadow-gray-200 flex rounded-2xl" onClick={e=>setShowPhoto(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Show all photos
                            </button>)}
                    </div>
                </div>
                </div>
            </div>
)}

export default SingleBookingPage