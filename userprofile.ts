import { User } from './main.js'

const displayUsername = document.getElementById('username-display') as HTMLElement
const displayPass = document.getElementById('password-display') as HTMLElement
const toggleBtn = document.getElementById('toggle-password');

const handleUserInfo = (rawData: string | null): User | null =>{
    if (!rawData) return null;
    try {
        const parsed = JSON.parse(rawData);
        const userInstance = new User(parsed._username, parsed._password)
        return userInstance;
    } catch (e) {
        console.error("Invalid JSON data", e)
        return null;
    }
}

const rawData = localStorage.getItem('currentUser')
const userInstance = handleUserInfo(rawData)

let isPasswordVisible = false;

if (displayUsername && userInstance) {
    displayUsername.textContent = userInstance.username;
} else if (displayUsername) {
    displayUsername.textContent = "Not available";
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
            displayPass.textContent = "*******"
            toggleBtn.textContent = "Show Password";
        }
    });
} else if (displayPass) {
    displayPass.textContent = "Not available";
}
