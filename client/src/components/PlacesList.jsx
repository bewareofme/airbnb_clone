
import React from 'react'
import { Link } from 'react-router-dom'

function PlacesList({places}) {
  return (
    <div className='grid grid-cols-1 mt-2'>
        {places?.map((place,index)=>(
            <Link to={'/account/accomodations/'+place._id} className="flex  p-2 gap-4 mb-4 bg-gray-200" key={index}>
                <div className="h-[7rem]">
                    <img src={'http://'+'localhost:5000'+'\\uploads\\'+place.photos[0]} alt="" className="object-cover h-full w-full border " />
                </div>
                <div className="flex flex-col  grow space-y-2 relative ">
                    <h1 className='font-bold'>{place.title}</h1>
                    <div className='wrap'>{place.description}</div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default PlacesList