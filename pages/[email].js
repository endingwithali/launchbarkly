import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import {useState, useContext} from 'react'
import fetch from 'isomorphic-unfetch';
import UserContext from '../components/UserContext'

// export async function getServerSideProps(context){
//     await fetch('https://emailrep.io/'+context.params.email,{
//         method: 'GET',
//         // headers:{
//         //     ''
//         // }
//       })
//       .then((result)=>{
//         console.log("HER")
//         console.log(result)
//         return result.json()
//       })
//     return {
//         props:{
//             email: context.params.email
//         }
//     }
// }


export default function User(props) {
    console.log(props);
    const {user, signOut} = useContext(UserContext);
    console.log(user);

    // if (Router.isFallback) {
    //   return <div>Loading...</div>
    // }
  
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
