const loginNameInput = document.querySelector('#loginName');
const loginPasswordInput = document.querySelector('#loginPass');
const loginBtn = document.querySelector('#signBtn');
const usernameError = document.querySelector('#loginError1');
const passError = document.querySelector('#loginError2');
const passwordIcon = document.querySelector(".password-icon");

const passwordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g;

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let hasError = false;

    if (loginNameInput.value === "") {
        usernameError.innerHTML = "username field is required";
        hasError = true;
    } else if (loginNameInput.value.length <= 7) {
        usernameError.innerHTML = "username must contain at least 8 characters";
        hasError = true;
    } else{
        usernameError.innerHTML = "";
    }

    if (loginPasswordInput.value === "") {
        passError.innerHTML = "password field is required";
        hasError = true;
    } else if (!passwordRegex.test(loginPasswordInput.value)) {
        passError.innerHTML = "password must be a combination of all characters";
        hasError = true;
    }else if (loginPasswordInput.value.length <= 7) {
        passError.innerHTML = "password must be at least 8 characters long";
        hasError = true;
    }else{
        passError.innerHTML = "";
    }

    if (!hasError) {
        window.location.href = 'dashboard.html';
    }
});


// PASSWORD ICON

let isPasswordVisible = false;
passwordIcon.addEventListener("click", () => {
  if (isPasswordVisible) {
    loginPasswordInput.type = "password";
    passwordIcon.src = "./images/hide.png";
    isPasswordVisible = false;
  } else {
    loginPasswordInput.type = "text";
    passwordIcon.src = "./images/view.png";
    isPasswordVisible = true;
  }
});