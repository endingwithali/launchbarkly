<div align="center">
<h1><a href="http://pleasehirethis.dev">🚀🐶 LaunchBarkly 🐶🚀</a></h1>
</div>

<p align="center">
  <img src="https://i.pinimg.com/originals/8a/b0/40/8ab04043dc62cb3e5bd63717b56be075.jpg"/>
</p>

This service is a simple login form that utilizes an email and password to check the reputation of an email via the [EmailRep.io](http://emailrep.io) API. Passwords are hashed, and saved along with the emails in a MySQL database. 

This project is a demonstration of the use of LaunchDarkly feature flags to toggle password hashing algorithms as well as making calls to external APIs and create/read from a MySQL database. 

## Set Up

### External Dependencies
You will need to request an access key from [EmailRep](https://emailrep.io), and set up + deploy the [LaunchDarkly password checking server](https://github.com/endingwithali/launchbarkly-password).

In addition, you will need to set up a MySQL instance prior to running this service - the live project uses [Google Cloud SQL for MySQL](https://cloud.google.com/sql/docs/mysql)

### ENV Vars 

Create a file `next.config.js` in `/`, and fill in with the relevant information:

```Javascript
module.exports = {
	env: {
		'MYSQL_HOST': '{MySQL Host URL}',
		'MYSQL_DATABASE': '{Database name}',
		'MYSQL_USER': '{Database user}',
		'MYSQL_PASSWORD': '{Database Password}',
		'EMAIL_REP': '{Key to access emailrep.io}',
		'PASSWORD_SERVER': '{URL to server for password checking}'
	}
}
```

## Getting Started

Clone the repository, install the packages, and run the development server:
```bash
$ npm i
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Caveat

If you're having issues, make sure you're using Node 13.0.0 or higher, and make sure the `autoprefixer` package is 9.8.6 ([until the issue is fixed](https://github.com/vercel/next.js/issues/17236)).

## Security

This service is **not** secure. Do not pass sensitive passwords through this service.

### Session Management and Cookies

There is poor session management - the cookie for the logged in session can easily be set manually via console, and is not checked / confirmed on any API calls / server side requests. 

### Hashing

This service switches between utilizing industry standard bcrypt and no longer accepted SHA256. Additionally, the MySQL server where the password values are stored is not a secure connection, nor is access to the server secured. 

### Empty API Calls
Auth and Sign up calls do not actively check for empty bodies - if an empty body is sent to the endpoints, errors will occur. For this implementation, inputs utilized to build the calls prevent empty bodies from being sent. 


## Publishing
This project can easily be deployed utilizing [Vercel](https://vercel.co/) thanks to the use of Next.js. You can learn more about deploying utilizing Vercel and their easy command line tool [here](https://vercel.com/docs/platform/deployments)!

## Issues
If you find any additional issues/questions, feel free to reach out to me via Twitter - [@endingwithali](twitter.com/endingwithali). I'm most responsive there. 

## Why Next.JS + Separate Server?

This project is a [Next.JS](https://nextjs.org/) based project. With the rise in popularity of JAMstack and serverless products, I wanted to utilize this prototype as an opportunity to dive deeper into understanding Next.JS and the JAMstack community. When researching Next.JS and LaunchDarkly, I realized there was only one example using the two together and it appeared to be nonfunctional. I took this as a challenge and opportunity to create a new use case of the two.

By design, Next.js relies upon server-side rendering of the content - making it difficult to integrate LaunchDarkly. Options explored involved removing the features that enable Next.JS and it's easy integration into Vercel. I opted for rapid prototyping, and chose to implement a server that could respond to a client side focused implementation. 


## Thanks
Shout out to @ndneighor, @noodle, @darkfadr, and especially @0xHaas for being my rubber ducks while I worked on this project. 

## Bonus Content
Click the image for a surprise! 

<p align="center">
  <a href="https://youtu.be/REaa-s68W2I"><img src="https://img.youtube.com/vi/REaa-s68W2I/hqdefault.jpg"/></a>
</p>