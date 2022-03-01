import firebase from 'firebase';
import 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyDpd238M2VP-qJEKgyIRuLxpSTVwH4R_Yk",
    authDomain: "school-app-images-repo.firebaseapp.com",
    projectId: "school-app-images-repo",
    storageBucket: "school-app-images-repo.appspot.com",
    messagingSenderId: "994772948234",
    appId: "1:994772948234:web:adfff04ca12f9bc2d696f3",
    measurementId: "G-5SC8HPD4NN"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }
var storage = firebase.storage();
export default storage;