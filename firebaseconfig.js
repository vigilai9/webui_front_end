import { initializeApp } from 'firebase/app';
 import { getAuth, GoogleAuthProvider } from 'firebase/auth';
 
 // Your web app's Firebase configuration
 // Replace with your own Firebase config
 const firebaseConfig = {
   apiKey: "AIzaSyBXraxCqh-OJuh60mNxt3hsVaobSTOBoFo",
   authDomain: "vigilauthservice.firebaseapp.com",
   projectId: "vigilauthservice",
   storageBucket: "vigilauthservice.firebasestorage.app",
   messagingSenderId: "31035202076",
   appId: "1:31035202076:web:050f773f0ead31bc78ddd9",
   measurementId: "G-ZKVWJ1Y4SB"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const googleProvider = new GoogleAuthProvider();
 
 export { auth, googleProvider };