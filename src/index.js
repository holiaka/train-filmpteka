// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ2XP7poG0XpFLsnXL3RM81DM9cUBt3Mw",
  authDomain: "team-project-20a02.firebaseapp.com",
  databaseURL: "https://team-project-20a02-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "team-project-20a02",
  storageBucket: "team-project-20a02.appspot.com",
  messagingSenderId: "755446667553",
  appId: "1:755446667553:web:0ee696ebc0509aa9284660",
  measurementId: "G-EPQTZQBE46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const paginationRef = document.querySelector('.js-pagination');

const paginationHtml = ``