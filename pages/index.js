import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import { setCookie } from 'nookies';

export default function Home() {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMsg(data.error);
        } else {
          setCookie(null, 'barklyToken', 'loggedon');
          Router.push('/'+email);
        }
      });
  }

  return (
    <>
      <Head>
        <title>🚀🐶 - Home</title>
      </Head>
      <main className="flex h-screen justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-5xl text-center">
            🚀🐶LaunchBarkly🐶🚀
          </h1>
          <br />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
          >
            {errorMsg && <p>{errorMsg}</p>}
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email"
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              name="password"
              type="password"
              autoComplete="password"
              required
              placeholder="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Sign in
            </button>
          </form>
          <br />
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="button"
            onClick={
              (e) => {
                e.preventDefault();
                Router.push('/signup');
              }
            }
          >
            Sign up
          </button>
        </div>
      </main>
    </>
  );
}
