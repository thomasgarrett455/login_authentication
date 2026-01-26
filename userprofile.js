import { User } from './main.js';
const displayUsername = document.getElementById('username-display');
const displayPass = document.getElementById('password-display');
const toggleBtn = document.getElementById('toggle-password');
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
if (displayUsername && userInstance) {
    displayUsername.textContent = userInstance.username;
}
else if (displayUsername) {
    displayUsername.textContent = "Not available";
}
if (displayPass && toggleBtn && userInstance) {
    // Initialize password display with hidden state
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
// import { User } from './main.js';
// const displayUsername = document.getElementById('username-display');
// const displayPass = document.getElementById('password-display');
// const rawData = localStorage.getItem('currentUser');
// if (!rawData) {
//     console.warn("DEBUG: No data found in LocalStorage for 'currentUser'");
// } else {
//     const parsed = JSON.parse(rawData);
//     console.log("DEBUG: Parsed data from storage:", parsed);
//     // Make sure we use the keys that actually exist in the JSON (_username)
//     const userInstance = new User(parsed._username, parsed._password);
//     console.log("DEBUG: User Instance created:", userInstance);
//     console.log("DEBUG: Getter check:", userInstance.username);
//     if (displayUsername) {
//         displayUsername.textContent = userInstance.username;
//         console.log("DEBUG: Successfully set username textContent");
//     } else {
//         console.error("DEBUG: Could not find HTML element with ID 'username-display'");
//     }
// }
