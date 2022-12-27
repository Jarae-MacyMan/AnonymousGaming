const url = "http://localhost:3001"

let token = ""
const getComments = () => {
    return fetch(`${url}/home`, {
        headers: { 
            Authorization: `Bearer: ${token}`
        },
    })
    .then((response) => response.json())

    .then(data => {
        console.log(data)
        return data
    })
}

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

    const responseData = await respose.json()
    token = responseData.token
})


const logInForm = document.getElementById("log-in-form")

logInForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const email = data.get ("email") ;
    const password = data.get ("password") ;

    const respose = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           
            email,
            password,
        })
    })

    const responseData = await respose.json()
    token = responseData.token
})

const getCommentsBtn = document.getElementById('get-comments')

getCommentsBtn.addEventListener('click', () => {
    getComments()
})