import React from 'react'
import {getProviders,signIn} from 'next-auth/react'


function login({providers}) {
  return (
    <div className='bg-black min-h-screen w-full flex flex-col items-center justify-center'>
      
      <img src="https://www.vectorlogo.zone/logos/spotify/spotify-ar21.svg" alt="" className='w-52 mb-5' />


      {Object.values(providers).map((provider) =>(
          <div key={provider.name}>
            <button className='text-white bg-[#1ED760] p-5 rounded-full font-semibold hover:outline hover:outline-2 hover:outline-offset-2 ' onClick={()=>{
              signIn(provider.id, {callbackUrl : '/'})
            }}>
              Login with {provider.name}
            </button>
          </div>
      ))} 
      
    </div>
  )
}

export default login;
//so we get the providers on our login page through server side rendering and we return the providers object as it throws an error on the page
//we destructure the providers from the props as we had set in our server side return
export async function getServerSideProps() {
    const providers = await getProviders();

    return{
      props : {
        providers,
      }
    }
}