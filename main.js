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
const getUsersFromStorage = () => {
    const rawData = localStorage.getItem('users');
    if (!rawData)
        return [];
    const data = JSON.parse(rawData);
    return data.map((u) => new User(u._username, u._password));
};
const handleRegister = (user, pass) => {
    if (!user || !pass) {
        alert("Please fill out both fields");
        return;
    }
    const users = getUsersFromStorage();
    const userExists = users.some(u => u.username === user);
    if (userExists) {
        alert("Username already taken");
        return;
    }
    const newUser = new User(user, pass);
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registered successfully!");
    usernameInput.value = "";
    passwordInput.value = "";
};
if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        if (usernameInput.value && passwordInput.value) {
            handleRegister(usernameInput.value.trim(), passwordInput.value.trim());
        }
    });
}
const handleLogin = (user, pass) => {
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.username === user);
    if (!foundUser || foundUser.password !== pass) {
        systemResponse = [401, "Invalid login credentials"];
        alert(systemResponse[1]);
        return;
    }
    alert("Login Successful.");
    localStorage.setItem('currentUser', JSON.stringify({
        _username: foundUser.username,
        _password: foundUser.password
    }));
    window.location.href = 'profile.html';
};
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (usernameInput.value && passwordInput.value) {
            handleLogin(usernameInput.value.trim(), passwordInput.value.trim());
        }
    });
}
