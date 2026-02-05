export class User {
    private _username: string;
    private _password: string;

    constructor(username:string, password:string) {
        this._username = username;
        this._password = password;
    }

    get username(): string {
        return this._username
    }

    get password(): string {
        return this._password
    }

    set username(newName: string) {
        this._username = newName;
    }

    set password(newPassword: string) {
        this._password = newPassword
    }
}


const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

const loginBtn = document.getElementById('login') as HTMLButtonElement;
const registerBtn = document.getElementById('register') as HTMLButtonElement;

let systemResponse: [number, string];

const handleRegister = async (user: string, pass: string) => {
    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' }, 
        body: JSON.stringify({username: user, password: pass})
    });

    if (!res.ok) {
        alert("Please fill out both fields");
        return
    }

    alert("Resgistration Successful")
    window.location.href = 'profile.html'
};

if (registerBtn){
    registerBtn.addEventListener('click', () => {
        if (usernameInput.value && passwordInput.value) {
            handleRegister(usernameInput.value.trim(), passwordInput.value.trim());
        }
    });
}

const handleLogin = async (user: string, pass: string) => {
   const res = await fetch("http://localhost:3000/login", {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username: user, password: pass})
   });

   if (!res.ok) {
    alert("Invalid Login Credentials");
    return
   }

   alert('Login Successful');
   localStorage.setItem('currentUsername', user)
   window.location.href = 'profile.html'
}

if (loginBtn){ 
    loginBtn.addEventListener('click', () => {
        if (usernameInput.value && passwordInput.value) {
            handleLogin(usernameInput.value.trim(), passwordInput.value.trim())
        }
    });
}




