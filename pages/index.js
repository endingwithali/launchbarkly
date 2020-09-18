import Head from 'next/head'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
// import fetch from 'isomorphic-unfetch';


export default function Home() {
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
      console.log(result)
      return result.json()
    })
    .then((data)=>{
      console.log(data)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
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
      </main>

    </div>
  )
}
