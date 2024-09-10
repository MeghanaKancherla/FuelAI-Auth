# FuelAI-Auth
React.js Web App with Firebase Integration

Features: 
Signup: A form that collects user details and saves them in Firebase Firestore.
Login: A login feature using OTP verification for mobile numbers or using email and password.

Creating Firebase:
Under Firestore create a 'users' collection and 'user' document under it. 
The fields of user document are as follows:
```
 - createAt  (timestamp)
 - email "" (string)
 - firstName "" (string)
 - lastName "" (string)
 - mobile "" (string)
 - password ""
```

In src/firebase.js file, please put in your firebase web app configurations.

Change the directory to the project directory and use the command.
```
cd auth-web-app
```

Install the node modules
```
npm install
```

To run the web app:
```
npm start
```


