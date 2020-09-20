import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import {useState, useContext} from 'react'
import fetch from 'isomorphic-unfetch'
import UserContext from '../components/UserContext'
import {withIronSession} from 'next-iron-session'


export async function getServerSideProps(context){
    await fetch('https://emailrep.io/'+context.params.email,{
        method: 'GET',
        headers:{
            'Key': process.env.EMAIL_REP
        }
      })
      .then((result)=>{
        console.log("HER")
        console.log(result.body.email)
        return result.json()
      })

    return {
        props:{
            email: context.params.email
        }
    }
}

export default function User(props) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>

      </main>

    </div>
  )
}
