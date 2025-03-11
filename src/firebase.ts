import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyABP7S9fQpzO0WCIJsm7OAC81vokCu0ANE",
    authDomain: "todos-2d38c.firebaseapp.com",
    projectId: "todos-2d38c",
    storageBucket: "todos-2d38c.firebasestorage.app",
    messagingSenderId: "106895731276",
    appId: "1:106895731276:web:d81cee5f2777b0e94f22e9",
    databaseURL: 'https://todos-2d38c-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp