import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyA3E1WvcdrGm9JWe5LkXtmO12V8NU8GUws",
  authDomain: "black-arch.firebaseapp.com",
  databaseURL: "https://black-arch.firebaseio.com",
  projectId: "black-arch",
  storageBucket: "black-arch.appspot.com",
  messagingSenderId: "580453430462"
};

firebase.initializeApp(config);

export const database = firebase.firestore();

database.settings({
  timestampsInSnapshots: true
})

export default firebase
