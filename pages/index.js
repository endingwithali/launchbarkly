import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch';
import {useState} from 'react'
import {setCookie} from 'nookies'


export default function Home(ctx) {
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event){ 
    event.preventDefault()
    fetch('/api/auth',{
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((result)=>{
      return result.json()
    })
    .then((data)=>{
      if (data.error){
        setErrorMsg(data.error)
      } else {
        setCookie(null, 'barklyToken', 'loggedon')
        Router.push('/'+email)
      }
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SIGN IN</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
        </h1>

        <form onSubmit={handleSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            label="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            autoComplete="password"
            required
            label="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button> or{' '}
        </form>

        <button onClick={
          (e)=>{
            e.preventDefault()
            Router.push('/signup')
          }
        }>Sign signup</button>
      </main>

    </div>
  )
}
