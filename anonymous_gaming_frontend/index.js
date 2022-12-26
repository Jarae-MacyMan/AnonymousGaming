const url = "http://localhost:3001"

let token = ""
fetch(`${url}/home`, {
    headers: { 
        Authorization: `Bearer: ${token}`
    },
})
.then((response) => response.json()
.then(data => console.log(data)))

const signUpForm = document.getElementById("sign-up-form")

signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const username = data.get ("username") ;
    const email = data.get ("email") ;
    const password = data.get ("password") ;

    const respose = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password,
        })
    })
})