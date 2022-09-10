// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATh-XwlpQONLPHGfkap5CwiUc80OiK7aA",
    authDomain: "todo-30977.firebaseapp.com",
    projectId: "todo-30977",
    storageBucket: "todo-30977.appspot.com",
    messagingSenderId: "595645401522",
    appId: "1:595645401522:web:b406770971d3a937b5fcab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig