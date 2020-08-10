import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAjYGtKhVxy8vIeITPGVapoh5QG1L2OojE",
  authDomain: "react-rest-a07dc.firebaseapp.com",
  databaseURL: "https://react-rest-a07dc.firebaseio.com",
  projectId: "react-rest-a07dc",
  storageBucket: "react-rest-a07dc.appspot.com",
  messagingSenderId: "1025565225335",
  appId: "1:1025565225335:web:a5124c6e56e3352b98f172",
  measurementId: "G-J07H6X8DE6"
};

var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();