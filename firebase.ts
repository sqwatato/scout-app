import firebase from 'firebase/app';
require('firebase/auth'); //FIxes the issue for some reason
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVYgLi7CnBXVAo4aN0qFbRGFSozXiltHM",
  authDomain: "mvrt115-scout.firebaseapp.com",
  projectId: "mvrt115-scout",
  storageBucket: "mvrt115-scout.appspot.com",
  messagingSenderId: "161834372741",
  appId: "1:161834372741:web:21f42a585166e7479323ec"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
export default firebase;