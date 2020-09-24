
  # 🚀🐶 LaunchBarkly 🚀🐶
  
![image of dog in space](https://i.pinimg.com/originals/8a/b0/40/8ab04043dc62cb3e5bd63717b56be075.jpg)

This service is a simple login utilizing an email and password to check the reputation of an email via the emailrep.io API. 

This project is a demonstration of the use of LaunchDarkly feature flags to toggle password hashing algorithms as well as making calls to external APIs and create/read from a MySQL database. 

## Getting Started

### External Dependencies
You will need to request an access key from [EmailRep](https://emailrep.io), and set up + deploy the [password checking server](https://github.com/endingwithali/launchbarkly-password).

In addition, you will need to set up a MySQL instance prior to running this service - the live project uses [Google Cloud SQL for MySQL](https://cloud.google.com/sql/docs/mysql)

### ENV Vars

Create a file `next.config.js` in `/`, and fill in with the relevant information. .

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

There is poor session management - the cookie for the logged in session can easily be set manually via console, and is not checked / confirmed on the server side.

### Hashing

This service switches between utilizing industry standard bcrypt and no longer accepted SHA256. Additionally, the MySQL server where the password values are stored is not secure. 

### Empty API Calls
Auth and Sign up calls do not actively check for empty bodies, which will cause errors. Inputs to the calls prevent empty bodies from being sent. 


## Why the Separate Server for the LaunchDarkly calls

This project is a [Next.JS](https://nextjs.org/) based project. 

[insert paragraph about issue with serverside rendering]


## Issues
If you find any additional issues/questions, feel free to reach out to me via Twitter - [@endingwithali](twitter.com/endingwithali). I'm most responsive there. 