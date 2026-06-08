import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB0ZfSjF7G8q_FwV_xAXuSIocZKpi8UGZ0",
    authDomain: "proyectointegrador2-f7c74.firebaseapp.com",
    projectId: "proyectointegrador2-f7c74",
    storageBucket: "proyectointegrador2-f7c74.firebasestorage.app",
    messagingSenderId: "87404776747",
    appId: "1:87404776747:web:d1f90b0db47188afe8c96e"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();