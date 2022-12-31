// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase 프로젝트 ReactNative-TodoList
const firebaseConfig = {
  apiKey: "AIzaSyCCXhmxwcKdLt9HXQn4d47EorwfYt5LBeE",
  authDomain: "reactnative-todolist-43bb4.firebaseapp.com",
  projectId: "reactnative-todolist-43bb4",
  storageBucket: "reactnative-todolist-43bb4.appspot.com",
  messagingSenderId: "437174377157",
  appId: "1:437174377157:web:91ef78724f725930bb2eac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
