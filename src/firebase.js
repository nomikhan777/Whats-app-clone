// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';





const firebaseConfig = {
    apiKey: "AIzaSyCPbUS5zuNS5T1LsG7lRgeeW6jSiHBb9VU",
    authDomain: "whats-app-clone-6073.firebaseapp.com",
    projectId: "whats-app-clone-6073",
    storageBucket: "whats-app-clone-6073.appspot.com",
    messagingSenderId: "304362046551",
    appId: "1:304362046551:web:6cd4e86eae79fca50f4f12",
    measurementId: "G-RPBT6KR3MY"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

   export const auth = firebase.auth();
  

  export const provider = new firebase.auth.GoogleAuthProvider();

  export default db;

