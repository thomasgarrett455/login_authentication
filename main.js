export class User {
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    set username(newName) {
        this._username = newName;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
}
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
let systemResponse;
const handleRegister = async (user, pass) => {
    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });
    if (!res.ok) {
        alert("Please fill out both fields");
        return;
    }
    alert("Resgistration Successful");
    window.location.href = 'profile.html';
};
if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        if (usernameInput.value && passwordInput.value) {
            handleRegister(usernameInput.value.trim(), passwordInput.value.trim());
        }
    });
}
const handleLogin = async (user, pass) => {
    const res = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });
    if (!res.ok) {
        alert("Invalid Login Credentials");
        return;
    }
    alert('Login Successful');
    localStorage.setItem('currentUsername', user);
    window.location.href = 'profile.html';
};
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (usernameInput.value && passwordInput.value) {
            handleLogin(usernameInput.value.trim(), passwordInput.value.trim());
        }
    });
}
