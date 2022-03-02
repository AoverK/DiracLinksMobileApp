// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpC7Bjt2HHiWznD_Y7QkTC9zFtzC8Z4zw",
  authDomain: "diraclinks-992f1.firebaseapp.com",
  databaseURL: "https://diraclinks-992f1-default-rtdb.firebaseio.com",
  projectId: "diraclinks-992f1",
  storageBucket: "diraclinks-992f1.appspot.com",
  messagingSenderId: "388821746602",
  appId: "1:388821746602:web:51ffd40dceec4ce856a1d3",
  measurementId: "G-QW06DLHNKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;