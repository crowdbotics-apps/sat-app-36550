import { initializeApp, getApp } from "firebase/app"
import { initializeFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

/*
const firebaseConfig = {
  apiKey: "AIzaSyB4XZCsYZCWqLBjFmzL6pNBcyv0t5ix7ro",
  authDomain: "sat-app-fddf1.firebaseapp.com",
  projectId: "sat-app-fddf1",
  storageBucket: "sat-app-fddf1.appspot.com",
  messagingSenderId: "1028879498536",
  appId: "1:1028879498536:web:e433b3751262ff8453e41d",
  measurementId: "G-Q4D2E0WW1K"
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyDbE4iY2BKWi1q_ZVVqFbwz1U07fm6_AH0",
  authDomain: "sat-test-158d6.firebaseapp.com",
  projectId: "sat-test-158d6",
  storageBucket: "sat-test-158d6.appspot.com",
  messagingSenderId: "25687521850",
  appId: "1:25687521850:web:5a2624c4483df278cc1303"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })
const storage = getStorage(app)

export { db, auth, storage }
