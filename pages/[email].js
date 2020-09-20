import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'
import {parseCookies, destroyCookie} from 'nookies'
import { useEffect } from 'react'

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

        }
      }
}




export default function User(props) {
  const cookies = parseCookies();

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
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
          {props.email}
          <button
            onClick={(e)=> handleClick(e)}
          >
            logout
        </button>
      </main>

    </div>
  )
}
