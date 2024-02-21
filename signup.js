import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#pass");
const cPasswordInput = document.querySelector("#cpass");
const signupBtn = document.querySelector("#signBtn");
const googleBtn = document.querySelector("#googleAdd");
const nameError = document.querySelector("#error1");
const emailError = document.querySelector("#error2");
const passwordError = document.querySelector("#error3");
const cpassError = document.querySelector("#error4");
const passwordIcon = document.querySelector(".pass-icon");
const confirmPassIcon = document.querySelector(".confirmPass-icon");

const passwordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g;

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let hasError = false;

  if (usernameInput.value === "") {
    nameError.innerHTML = "username field is required";
    hasError = true;
  } else if (usernameInput.value.length <= 7) {
    nameError.innerHTML = "username must contain at least 8 characters";
    hasError = true;
  } else {
    nameError.innerHTML = "";
  }

  if (emailInput.value === "") {
    emailError.innerHTML = "email address field is required";
    hasError = true;
  } else if (emailInput.value.length <= 10) {
    emailError.innerHTML = "enter a valid email address";
    hasError = true;
  } else if (
    !emailInput.value.includes("@") &&
    !emailInput.value.includes(".")
  ) {
    emailError.innerHTML = "email must include '@' and '.' in the right place";
    hasError = true;
  } else {
    emailError.innerHTML = "";
  }

  if (passwordInput.value === "") {
    passwordError.innerHTML = "password field is required";
    hasError = true;
  } else if (!passwordRegex.test(passwordInput.value)) {
    passwordError.innerHTML =
      "password must be a combination of all characters";
    hasError = true;
  } else if (passwordInput.value.length <= 7) {
    passwordError.innerHTML = "password must be at least 8 characters long";
    hasError = true;
  } else {
    passwordError.innerHTML = "";
  }

  if (cPasswordInput.value !== passwordInput.value) {
    cpassError.innerHTML = "password do not match";
    hasError = true;
  } else if (cPasswordInput.value === passwordInput.value) {
    cpassError.innerHTML = "";
  }

  if (!hasError) {
    // Only attempt to create a user if there are no errors
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        set(ref(database, "users/" + user.uid), {
          username: usernameInput.value,
          email: emailInput.value,
        }).catch((error) => {
          console.error("Error writing data to the database:", error.message);
        });
        alert("User created!");
        window.location.href = "dashboard.html"; // Redirect after successful sign up
      })
      .catch((error) => {
        alert(error.message)
        console.log(error.code);
        console.log(error.message);
      });
  }

  allowAutoRedirect();
});

// FOR THE GOOGLE SIGN IN BTN....

const userSignInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((googleResult) => {
      const credential = GoogleAuthProvider.credentialFromResult(googleResult);
      const token = credential.accessToken;
      const user = googleResult.user;
      console.log(user);
    })
    .catch((error) => {
      alert(error.message)
      console.log(error.code);
      console.log(error.message);
    });
};

let preventAutoRedirectOnLoad = true; // Flag to prevent auto-redirect on initial load

function allowAutoRedirect() {
  preventAutoRedirectOnLoad = false;
}

onAuthStateChanged(auth, (user) => {
  if (user && !preventAutoRedirectOnLoad) {
    // User is signed in, and we allow redirecting now
    alert("user is signed in");
    window.location.href = "dashboard.html";
  } else if (!user) {
    console.log("User is signed out!");
  }
  preventAutoRedirectOnLoad = false;
});

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userSignInWithGoogle();

  allowAutoRedirect();
});

// PASSWORD $$ CONFIRM-PASSWORD ICON

let isPasswordVisible = false;
passwordIcon.addEventListener("click", () => {
  if (isPasswordVisible) {
    passwordInput.type = "password";
    passwordIcon.src = "./images/hide.png";
    isPasswordVisible = false;
  } else {
    passwordInput.type = "text";
    passwordIcon.src = "./images/view.png";
    isPasswordVisible = true;
  }
});


let isConfirmPasswordVisible = false;
confirmPassIcon.addEventListener("click", () => {
  if (isConfirmPasswordVisible) {
    cPasswordInput.type = "password";
    confirmPassIcon.src = "./images/hide.png";
    isConfirmPasswordVisible = false;
  } else {
    cPasswordInput.type = "text";
    confirmPassIcon.src = "./images/view.png";
    isConfirmPasswordVisible = true;
  }
});
