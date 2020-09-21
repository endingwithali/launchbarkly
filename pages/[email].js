import Head from 'next/head'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import {parseCookies, destroyCookie} from 'nookies'
import { useEffect } from 'react'
import { PRIORITY_HIGH } from 'constants'

export async function getServerSideProps(context){
    // await fetch('https://emailrep.io/'+context.params.email,{
    //     method: 'GET',
    //     headers:{
    //         'Key': process.env.EMAIL_REP,
    //         'User-Agent': 'launchbarkly',
    //         'Conect-Type': 'application/json'
    //     }
    //   })
    //   .then((res)=>{
    //     return res.json()
    //   }).then((data)=>{
    //     console.log(data)
    //     return {
    //       props:{
    //           email: context.params.email,
    //           details: data

    //       }
    //     }
    //   })
      return {
        props:{
            email: context.params.email,
            reputation: 'medium',
            references: 22 
        }
      }
}




export default function User(props) {
  const cookies = parseCookies();
  const img = props.reputation+".jpg"

  function handleClick(event){
    event.preventDefault();
    destroyCookie(null, 'barklyToken')
    Router.push('/')
  }

  useEffect(()=>{
    if (!cookies.barklyToken){
      Router.push('/')
    }
  })


  return (
    
    <div>
      <Head>
        <title>🚀🐶 - {props.email}</title>
      </Head>

      <main className='flex h-screen justify-center items-center'>
        <div className='flex flex-col'>
          <h1 className='text-5xl text-center'>🚀🐶LaunchBarkly🐶🚀</h1>
          <h1 className='text-3xl text-center'>
            {props.email}
          </h1>
          <br/>
            <img 
              src={img}
              className="object-contain h-48 w-full" 
            />
          <br/>
          <h1 className='text-2xl text-center'>
            Your reputation is: <span className="text-purple-700">{props.reputation}</span>
          </h1>
          <h2 className='text-2xl text-center '>
            Email References: <span className="text-purple-700">{props.references}</span>
          </h2>
          <br/>
            <button
              className="bg-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={(e)=> handleClick(e)}
            >
              logout
          </button>
        </div>
      </main>

    </div>
  )
}
