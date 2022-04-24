import React from 'react'
import SideBar from './SideBar'
import Body from './Body'
import Player from './Player'

function DashBoard() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      
        <main className='flex'>  
            <SideBar/> 
            <Body/>
        </main>
       
       <div className='sticky bottom-0'><Player/></div>

    </div>
  )
}

export default DashBoard

