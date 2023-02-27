import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import PlacesList from '../components/PlacesList'
import Perks from '../components/Perks'

function PlacesPage() {
    const resetParam=()=>{
        setTitle('')
        setAddress('')
        setExtra('')
        setPhotos([])
        setDescription('')
        setPerks('')
        setCheckin('')
        setCheckout('')
        setMaxGuests('')
        setPrice(100)
    }
    const {action}=useParams()
    const [places,setPlaces]=useState([])
    const navigate=useNavigate()
    const [titled,setTitle]=useState('')
    const [address,setAddress]=useState('')
    const [extra,setExtra]=useState('')
    const [photos,setPhotos]=useState([])
    const [photoLink,setPhotoLink]=useState('')
    const [descriptiond,setDescription]=useState('')
    const [perks,setPerks]=useState([])
    const [checkin,setCheckin]=useState('')
    const [checkout,setCheckout]=useState('')
    const [maxGuests,setMaxGuests]=useState('')
    const [price,setPrice]=useState('')
    useEffect(()=>{
        if(action==='new')return
        axios.get('/places').then(({data})=>{
        setPlaces(data)
        if(!action ||action==='new'){resetParam();return}
        const current=data.find((obj)=>obj._id===action)
        setTitle(current.title)
        setAddress(current.address)
        setExtra(current.extraInf)
        setPhotos(current.photos)
        setDescription(current.description)
        setPerks(current.perks)
        setCheckin(current.checkIn)
        setCheckout(current.checkOut)
        setMaxGuests(current.maxGuests)
        setPrice(current.price)
    })
},[action])
    const deletePhotoHandler=(photo)=>{
        setPhotos((e)=>{
            return [...e.filter((cur)=>cur!==photo)]
        })
    }
    const setCoverHandler=(photo)=>{
        setPhotos((e)=>{
            return [photo,...e.filter((cur)=>cur!==photo)]
        })
    }
    const addPhotosByLinkHandler=async(e)=>{
        e.preventDefault()
        const {data}= await axios.post('/uploadsbylink',{photoLink})
        setPhotos(e=>{
            return[...e,data]
        })
        setPhotoLink('')
    }
    const handleFormSubmit=async(e)=>{
        e.preventDefault()
        if(action==='new'){
        await axios.post('/places',{
            titled,address,extra,
            photos,descriptiond,perks,
            checkin,checkout,maxGuests,price
        })
         navigate('/account/accomodations')
     }else{
        await axios.put('/places/'+action,{
            titled,address,extra,
            photos,descriptiond,perks,
            checkin,checkout,maxGuests,price
        })
        navigate('/account/accomodations')
     }
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
                    <div className='grow'>
                        <h1>Price per night</h1>
                        <input type="number" placeholder={'min 100'} className={`inputStyle`} min={100} onChange={e=>setPrice(e.target.value)} value={price}/>
                    </div>
                </div>
            )}
            {(title==='Photos')&&(
                <div className="flex space-x-4">
                    <input type="text" placeholder={placeholder} className={`inputStyle`} onChange={(e)=>setPhotoLink(e.target.value)} value={photoLink}/>
                    <button onClick={addPhotosByLinkHandler} className='bg-gray-200 rounded-lg whitespace-nowrap px-3'>Add photos</button>
                </div>
            )}
            {(title!=='Extra info'&&title!=='Description'&&title!=='Photos'&&title!=='Check in and Check out time') &&(
            <input type="text" placeholder={placeholder} className={`inputStyle`}
             onChange={(e)=>{
                if(title==='Title')setTitle(e.target.value)
                else setAddress(e.target.value)
            }} value={title==='Title'?titled:address}/>
            )
             } 
             {(title==='Extra info'||title==='Description')
             &&(
                 <textarea name="" id="" cols="20" rows="2" className='inputStyle' onChange={e=>{if(title==='Description'){setDescription(e.target.value)}else{setExtra(e.target.value)}}}
                 value={title==='Description'?descriptiond:extra}
                 ></textarea>
                 )
              }
        </>
        )
    }
  return (
    <div>
{!action && (
    <div>
        <div className='text-center flex justify-center'>
        <Link to={'/account/accomodations/new'} className='border-gray-400 px-4 py-2 bg-red-400 text-white rounded-full flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
            Add new places</Link>
        </div>
        <div>
            <PlacesList places={places}/>
        </div>
    </div>  
)}
{action && (

    <form action="" onSubmit={handleFormSubmit}>
        {TitleComponent('Title','tile should be short and concised as in advertisements','title:for example:my lovely apt')}
        {TitleComponent('Address','address to this place','89,houston,whitehouse')}
        {TitleComponent('Photos','add photos here','add using a link ...jpg')}
        <div className='mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
            {photos?.map((photo,index)=>(
                <div className="m-1 max-h-44 relative" key={index}>
                    <button className='absolute bottom-2 right-2 text-white bg-black p-1 cursor bg-opacity-50 rounded-2xl cursor-pointer' onClick={(e)=>
                        {e.preventDefault();deletePhotoHandler(photo)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                    </button>
                    <button className='absolute bottom-2 left-2 text-white bg-black p-1 cursor bg-opacity-50 rounded-2xl cursor-pointer' onClick={(e)=>
                        {e.preventDefault();setCoverHandler(photo)}}>
                            {(photos[0]!==photo)&&(
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            )}
                            {(photos[0]===photo)&&(
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                              
                            )}
                    </button>
                    <img src={'http://'+'localhost:5000'+'\\uploads\\'+photo} alt="a" className="object-cover h-90 h-full w-full border  rounded-2xl" />
                </div>
            ))}
            <label className='border p-8 justify-center flex rounded-2xl text-xl mb-2 items-center gap-2 m-1 cursor-pointer  max-h-44'>
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