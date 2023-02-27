import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function IndexPage() {
  const [place,setPlaces]=useState([])
  useEffect(()=>{
    axios.get('/places-index').then(({data})=>{
    setPlaces(data)
})
},[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {place.length>0 && place.map((place,index)=>(
        <div className="mt-5 " key={index}>
          <Link to={'/place/'+place._id} className=''>
            <img src={'http://'+'localhost:5000'+'\\uploads\\'+place.photos[0]} alt="" className='object-cover rounded-2xl aspect-square' />
          </Link>
          <div>
            <h1>{place.address}</h1>
            <h2 className='font-bold'>{place.price}$ Night</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default IndexPage