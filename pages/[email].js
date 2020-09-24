import Head from 'next/head';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import React, { useEffect } from 'react';

export async function getServerSideProps(context) {
  const emailRep = await fetch( 'https://emailrep.io/'+context.params.email, {
    method: 'GET',
    headers: {
      'Key': process.env.EMAIL_REP,
      'User-Agent': 'launchbarkly',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }
      return res.json();
    }).then((data) => {
      if (!data) {
        return null;
      }
      return data;
    });
  if (emailRep == null) {
    return {
      props: {
        email: context.params.email,
      },
    };
  }
  return {
    props: {
      email: context.params.email,
      reputation: emailRep.reputation,
      references: emailRep.references,
    },
  };
}

export default function User(props) {
  const cookies = parseCookies();
  const img = props.reputation+".jpg";

  function handleClick(event) {
    event.preventDefault();
    destroyCookie(null, 'barklyToken');
    Router.push('/');
  }

  useEffect(() => {
    if (!cookies.barklyToken) {
      Router.push('/');
    }
  });

  if (props.reputation) {
    return (
      <>
        <Head>
          <title>🚀🐶 - {props.email}</title>
        </Head>
        <main className="flex h-screen justify-center items-center">
          <div className="flex flex-col">
            <h1 className="text-5xl text-center">
              🚀🐶LaunchBarkly🐶🚀
            </h1>
            <h1 className="text-3xl text-center">
              {props.email}
            </h1>
            <br />
            <img 
              src={img}
              className="object-contain h-48 w-full"
              alt="Space dog"
            />
            <br />
            <h1 className="text-2xl text-center">
              Your reputation is: <span className="text-purple-700"> {props.reputation} </span>
            </h1>
            <h2 className="text-2xl text-center">
              Email References: <span className="text-purple-700">{props.references}</span>
            </h2>
            <br />
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={(e) => handleClick(e)}
            >
              logout
            </button>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>
            🚀🐶 - Query Limit
          </title>
        </Head>
        <main className="flex h-screen justify-center items-center">
          <div className="flex flex-col">
              <h1 className="text-5xl text-center">
                🚀🐶LaunchBarkly🐶🚀
              </h1>
              <h1 className="text-3xl text-center">
                Sorry! We've reached our query limit!
              </h1>
              <br/>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/I15Je487Z6A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <br/>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={(e)=> handleClick(e)}
              >
                Logout
            </button>
          </div>
          </main>
      </>
    )
  }
}
