import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div className='py-4 px-8 min-h-screen flex flex-col'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout