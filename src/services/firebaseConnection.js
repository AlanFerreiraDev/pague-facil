import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyD0nxnsPF4CoDW1YWE-dohOyiepe6B4xwg",
  authDomain: "pague-facil-ea140.firebaseapp.com",
  projectId: "pague-facil-ea140",
  storageBucket: "pague-facil-ea140.appspot.com",
  messagingSenderId: "214685498797",
  appId: "1:214685498797:web:9790978d3d22dd875f3524",
  measurementId: "G-PCT321QSP8"
};

// Verifica se existe conexões
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;