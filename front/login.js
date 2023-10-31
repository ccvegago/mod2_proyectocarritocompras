let buttonLogin = document.getElementById("button-login");
buttonLogin.addEventListener("click",() => {
    login();
});

async function signup() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    let name = document.getElementById('name').value;
    let addres = document.getElementById('addres').value;
    let tel = document.getElementById('tel').value;
    

    let response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        //se pasa el objeto json a string 
        body: JSON.stringify({
            email,
            pass,
            name,
            addres,
            tel
        })
    });
    let responseJson = await response.json();

    localStorage.setItem('token', responseJson.token);
}

async function login() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    

    let response = await fetch('http://localhost:3000/user/signin', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            pass
        })
    });
    let responseJson = await response.json();

    localStorage.setItem('token', responseJson.token);
    console.log(responseJson);
    window.location.href = '/front';
    
}

async function logout() {
    localStorage.removeItem('token');

    window.location.href = '/front/login.html';
}

async function verifySession() {
    let token = localStorage.getItem('token');

    if(!token) {
        window.location.href = '/front/login.html';
    }
    console.log(token);
    document.getElementById('token').innerText = token;
}
