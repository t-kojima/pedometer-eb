import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPPQo7BhWvPvs99P_3jWNH6H6hfdiDif0',
  authDomain: 'pedometer-eb-staging.firebaseapp.com',
  databaseURL: 'https://pedometer-eb-staging.firebaseio.com',
  projectId: 'pedometer-eb-staging',
  storageBucket: 'pedometer-eb-staging.appspot.com',
  messagingSenderId: '37364328029',
  appId: '1:37364328029:web:0b1bbd50087db5ea32cfb4',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const config = firebaseConfig;
export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
