import firebase from 'firebase'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCpkwH1iQ58uDXpWs1_7AxsEAi8Ooone5U",
    authDomain: "glushkov-com.firebaseapp.com",
    projectId: "glushkov-com",
    storageBucket: "glushkov-com.appspot.com",
    messagingSenderId: "492398768992",
    appId: "1:492398768992:web:d3d3c4a6cb003d5fc0a405",
    measurementId: "G-LZF7KHCNNJ"
  })
}

firebase.firestore().settings({ timestampsInSnapshots: true })

const auth = firebase.auth()
const db = firebase.database()
const storage = firebase.storage()
//const storage = firebase.storage() //if use storage

export { auth, db, storage }