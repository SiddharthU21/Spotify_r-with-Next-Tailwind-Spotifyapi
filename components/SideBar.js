import { HomeIcon, LibraryIcon, PlusCircleIcon, SearchIcon} from '@heroicons/react/outline'
import { HeartIcon , RssIcon } from '@heroicons/react/solid';
import { useSession} from 'next-auth/react';
import React, { useState, useEffect} from 'react';
import { useRecoilState } from 'recoil';
import  useSpotify  from '../lib/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom'

function SideBar() {
   {/* image tag of next is used as reduces bundle size all you have to is write the host name (here rb.gy) in next.config.js */}
    
   const spotifyApi = useSpotify();

   const {data : session} = useSession();
   const [playlists , setPlaylists] = useState([]);
   const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  

   useEffect(() => {
        
      if(spotifyApi.getAccessToken()){

         spotifyApi.getUserPlaylists(session).then((data)=>{
            setPlaylists(data.body.items);
         })
      }
     

     
   }, [session , spotifyApi])
 
  return (
  <section className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">

    <div className='space-y-4'>
       <button className='flex items-center space-x-2 hover:text-white'>
         <HomeIcon className='h-5 w-5'/>
         <p>Home</p>
       </button>
       <button className='flex items-center space-x-2 hover:text-white'>
         <SearchIcon className='h-5 w-5'/>
         <p>Search</p>
       </button>
       <button className='flex items-center space-x-2 hover:text-white'>
         <LibraryIcon className='h-5 w-5'/>
         <p>Your Library</p>
       </button>

       <hr className='border-t-[0.2px] border-gray-900'/>

      <button className='flex items-center space-x-2 hover:text-white'>
         <PlusCircleIcon className='h-5 w-5'/>
         <p>Create Playlist</p>
      </button>
      <button className='flex items-center space-x-2 hover:text-white'>
         <HeartIcon className='h-5 w-5 text-blue-400'/>
         <p>Liked Songs</p>
      </button>
      <button className='flex items-center space-x-2 hover:text-white'>
         <RssIcon className='h-5 w-5 text-green-400'/>
         <p>Your Episodes</p>
      </button>

      <hr className='border-t-[0.2px] border-gray-900'/>
         {
           playlists.map((playlist)=><p key={playlist.id} onClick={()=>{setPlaylistId(playlist.id)}} className='hover:text-white cursor-pointer'>{playlist.name}</p>)
         }
       </div>

  </section>
  )
}

export default SideBar; 