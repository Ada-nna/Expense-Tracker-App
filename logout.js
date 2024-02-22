import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Define firebaseConfig before using it to initialize the app
const firebaseConfig = {
  apiKey: "AIzaSyADxvD4LWuydXVLTXveOa46ZmN-z-nx0cs",
  authDomain: "combine-auth-app.firebaseapp.com",
  projectId: "combine-auth-app",
  storageBucket: "combine-auth-app.appspot.com",
  messagingSenderId: "83206515996",
  appId: "1:83206515996:web:1d0bb9dea2394de3fcded9",
};

// Initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const logoutBtn = document.querySelector("#logoutBtn");

const userSignOutOfGoogle = async () => {
  signOut(auth)
    .then(() => {
      // alert("You've signed out successfully");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Sign out error:", error); // Logs the error to the console
      alert("An error occurred while signing out."); // Optionally, inform the user
    });
};

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userSignOutOfGoogle();
});
