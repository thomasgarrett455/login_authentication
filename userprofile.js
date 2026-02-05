import { User } from './main.js';
const displayUsername = document.getElementById('username-display');
const displayPass = document.getElementById('password-display');
const toggleBtn = document.getElementById('toggle-password');
const changeUsernameLink = document.getElementById('change-username');
const newUsernameInput = document.getElementById('newusername');
const changeUsernameButton = document.getElementById('changeusername');
const username = localStorage.getItem('currentUsername');
const handleUserInfo = (rawData) => {
    if (!rawData)
        return null;
    try {
        const parsed = JSON.parse(rawData);
        const userInstance = new User(parsed._username, parsed._password);
        return userInstance;
    }
    catch (e) {
        console.error("Invalid JSON data", e);
        return null;
    }
};
const rawData = localStorage.getItem('currentUser');
const userInstance = handleUserInfo(rawData);
let isPasswordVisible = false;
if (displayUsername) {
    if (username) {
        // Prefer the latest username from localStorage
        displayUsername.textContent = username;
    }
    else if (userInstance) {
        // Fallback to username from stored user object (if present)
        displayUsername.textContent = userInstance.username;
    }
    else {
        displayUsername.textContent = "Not available";
    }
}
if (displayPass && toggleBtn && userInstance) {
    displayPass.textContent = "*******";
    toggleBtn.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        if (isPasswordVisible) {
            displayPass.textContent = userInstance.password;
            toggleBtn.textContent = "Hide Password";
        }
        else {
            displayPass.textContent = "*******";
            toggleBtn.textContent = "Show Password";
        }
    });
}
else if (displayPass) {
    displayPass.textContent = "Not available";
}
if (changeUsernameLink) {
    changeUsernameLink.addEventListener('click', () => {
        window.location.href = 'changeusername.html';
    });
}
if (changeUsernameButton) {
    changeUsernameButton.addEventListener('click', () => {
        if (!newUsernameInput || !newUsernameInput.value.trim()) {
            alert("Please enter a new username");
            return;
        }
        funchangeUsername(newUsernameInput.value.trim(), username);
    });
}
const funchangeUsername = async (newusername, username) => {
    if (!username) {
        console.warn("No current username found to change.");
        return;
    }
    const res = await fetch('http://localhost:3000/changeusername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newusername, username })
    });
    if (res) {
        localStorage.setItem('currentUsername', newusername);
        window.location.href = 'profile.html';
    }
};
