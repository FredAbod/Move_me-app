# Move_me-app
## Project Description
Hi, my name is Fredrick abodunrin,
a student of back-end web development at Grazac Academy. 
I was given a project to build an api for a train service provider MOVE_ME,
 that wishes to switch from the conventional paper booking system to the digitized booking system.
The endpoints on my application are to:

1. sign up with Phone Number, Email, First Name, Last Name,
and Password
2. Login with Email address and password.
3. book a train seat
4. edit booking time
5. delete booking
6. see all services provided by the train station ( Include Reservation,
Business or Economy)
7. see all registered users (admin)
8. upload new reservation for commuters to book (admin)
9. see the total numbers of bookings done on the platform.

THE STACKS USED ARE; VSCODE as my working environment
		     MONGODB as my database 
		     NODEJS as my open-source
		      POSTMAN FOR MY DOCUMENTATION

The packages i installed are;
```javascript
 "dependencies": {
    "bcrypt": "^5.0.1",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-rate-limit": "^6.5.1",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.2",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
    } 
```    
* BCRYPT: bcrypt is a password-hashing function 
* DOTENV - THIS IS A ZERO-DEPENDENCY MODULE THAT LOADS ENVIRONMENT VARIABLES FROM .ENV TO PROCESS.ENV. 
* EXPRESS - THIS IS MY FRAMEWORK and the de facto for nodejs
* EXPRESS-RATE-LIMIT: this is Used to limit repeated requests to public APIs and/or endpoints such as password reset
* JOI:  schema description language and data validator for JavaScript.
* JSONWEBTOKEN:  is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key. This is used for authorization
* MONGOOSE: THIS SERVES AS MY ODM/ORM (OBJECT DATA MODELLING/ OBJECT RELATIONAL MODELLING),
* MORGAN: THIS IS A MIDDLEWARE THAT HELPS ME LOG MY ERRORS AND REQUEST ON MY CONSOLE OR TERMINAL  

* NODEMON - WHICH I INSTALLED AS DEVDEPENDENCIES WHICH MEANS DEVELOPMENT DEPENDENCIES, THIS MEANS I WON'T BE NEEDING THIS PACKAGE DURING PRODUCTION OR TESTING UNTIL THE APP IS DEPLOYED ON THE SERVER. NODEMON WRAPS NODE AND HELPS ME RESTART MY NODE APP WHEN FILE CHANGES IN THE DIRECTORY ARE DETECTED. 

## How to start the app
```
npm i
```
> This will install node modules and all existing packages in index.js

## Run the app
```
npm run dev
```

[POSTMAN LINK](https://documenter.getpostman.com/view/21992639/VUxLw8Vd)
----
[Authentication Article](https://dev.to/fredabod/authorization-in-nodejs-all-you-need-to-know-3fga)
