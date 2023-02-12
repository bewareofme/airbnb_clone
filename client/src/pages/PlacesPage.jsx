import axios from 'axios'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../components/Perks'

function PlacesPage() {
    const [title,setTitle]=useState('')
    const [address,setAddress]=useState('')
    const [extra,setExtra]=useState('')
    const [photos,setPhotos]=useState([])
    const [photoLink,setPhotoLink]=useState('')
    const [description,setDescription]=useState('')
    const [perks,setPerks]=useState([])
    const [checkin,setCheckin]=useState('')
    const [checkout,setCheckout]=useState('')
    const [maxGuests,setMaxGuests]=useState('')
    const {action}=useParams()

    const addPhotosByLinkHandler=async(e)=>{
        e.preventDefault()
        const {data}= await axios.post('/uploadsbylink',{photoLink})
        setPhotos(e=>{
            return[...e,data]
        })
        setPhotoLink('')
    }
    const uploadByFileHandler = async(e) =>{
        const files=e.target.files
        const data=new FormData()
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i])
        }
        const {data:fileReturned}=await axios.post('/upload',data,{
            headers:{'Content-type':'multipart/form-data'}
        })
        console.log(fileReturned)
        return setPhotos(e=>{
            return [...e,...fileReturned]
        })
    }
    const TitleComponent=(title,description,placeholder)=>{
        return(
        <>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <h3 className='text-sm'>{description}</h3>
            {(title==='Check in and Check out time')&&(
                <div className="flex space-x-4 ">
                    <div className='grow'>
                        <h1>Check in time</h1>
                        <input type="text" placeholder={'14:00'} className={`inputStyle`} onChange={e=>setCheckin(e.target.value)} value={checkin}/>
                    </div>
                    <div className='grow'>
                        <h1>Check out time</h1>
                        <input type="text" placeholder={'16:00'} className={`inputStyle`} onChange={e=>setCheckout(e.target.value)}value={checkout} />
                    </div>   
                    <div className='grow'>
                        <h1>Max number of guest</h1>
                        <input type="number" placeholder={'min 1'} className={`inputStyle`} min={1} onChange={e=>setMaxGuests(e.target.value)} value={maxGuests}/>
                    </div>
                </div>
            )}
            {(title==='Photos')&&(
                <div className="flex space-x-4">
                    <input type="text" placeholder={placeholder} className={`inputStyle`} onChange={(e)=>setPhotoLink(e.target.value)} value={photoLink}/>
                    <button onClick={addPhotosByLinkHandler} className='bg-gray-200 rounded-lg whitespace-nowrap px-3  '>Add photos</button>
                </div>
            )}
            {(title!=='Extra info'&&title!=='Description'&&title!=='Photos'&&title!=='Check in and Check out time') &&(
            <input type="text" placeholder={placeholder} className={`inputStyle`} onChange={(e)=>{
                if(title==='Title')setTitle(e.target.value)
                else setAddress(e.target.value)
            }} />
            )
             } 
             {(title==='Extra info'||title==='Description')
             &&(
                 <textarea name="" id="" cols="20" rows="2" className='inputStyle' onChange={e=>{if(title==='Description'){setDescription(e.target.value)}else{setExtra(e.target.value)}}}
                 ></textarea>
                 )
              }
        </>
        )
    }
  return (
    <div>
{action!=='new' && (
    <div>
            <div className='text-center flex justify-center'>
        <Link to={'/account/accomodations/new'} className='border-gray-400 px-4 py-2 bg-red-400 text-white rounded-full flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
            Add new places</Link>
        </div>
        <div>
            places
        </div>
    </div>  
)}

{action==='new' && (

    <form action="">
        {TitleComponent('Title','tile should be short and concised as in advertisements','title:for example:my lovely apt')}
        {TitleComponent('Address','address to this place','89,houston,whitehouse')}
        {TitleComponent('Photos','add photos here','add using a link ...jpg')}
        <div className='mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
            {photos?.map((photo,index)=>(
                <div className="m-1 max-h-44" key={index}>
                    <img src={'http://'+'localhost:5000'+'\\uploads\\'+photo} alt="a" className="object-cover h-90 h-full w-full border  rounded-2xl" />
                </div>
            ))}
            <label className='border p-8 justify-center flex rounded-2xl text-xl mb-2 items-center gap-2 m-1 cursor-pointer max-h-44'>
            <input type="file" className='hidden' multiple onChange={uploadByFileHandler} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
            </svg>
            Upload
            </label>
        </div>
        {TitleComponent('Description','description on the place','2 bedroom,etc')}
        <Perks onChanged={setPerks} selected={perks}/>
        {TitleComponent('Extra info','extra info etc','')}
        {TitleComponent('Check in and Check out time','add check in and checkout time,remember to have some time to clean room between guests','')}
        <button className='bg-red-400 rounded-lg p-2 text-white w-full mt-2'>Save</button>
    </form>
)}

</div>
  )
}

export default PlacesPage