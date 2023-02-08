import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div className='p-4 min-h-screen flex flex-col'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout