import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCsjNlhmAuWSpLmv3MOm17OPt64b2vHoos",
  authDomain: "instagram-clone-react-4baa1.firebaseapp.com",
  projectId: "instagram-clone-react-4baa1",
  storageBucket: "instagram-clone-react-4baa1.appspot.com",
  messagingSenderId: "425460569057",
  appId: "1:425460569057:web:05e2faacaa7bdd99f838a0",
  measurementId: "G-5M5M6VZ8S1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

// import firebase from "firebase/compat/app";
// import 'firebase/compat/firestore';

// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyCsjNlhmAuWSpLmv3MOm17OPt64b2vHoos",
//     authDomain: "instagram-clone-react-4baa1.firebaseapp.com",
//     projectId: "instagram-clone-react-4baa1",
//     storageBucket: "instagram-clone-react-4baa1.appspot.com",
//     messagingSenderId: "425460569057",
//     appId: "1:425460569057:web:05e2faacaa7bdd99f838a0",
//     measurementId: "G-5M5M6VZ8S1"
// });

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };