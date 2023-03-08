import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAzVl3Y0Bkp05ySMYTPfxbYXyhw-Bgc7Ik",
    authDomain: "rump-f8ec2.firebaseapp.com",
    projectId: "rump-f8ec2",
    storageBucket: "rump-f8ec2.appspot.com",
    messagingSenderId: "673393457957",
    appId: "1:673393457957:web:dd23ff58478b9fda3838cc"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);