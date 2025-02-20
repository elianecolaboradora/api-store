const loginBtn = document.getElementById("login-button")
const inputPassword = document.querySelector("#email")
const inputEmail = document.querySelector("#password")

loginBtn.addEventListener("click", async () => {
    try {
        // 1. Obtener datos de usuario

        // 2. Enviar los datos del usuario
        
/*         const data = {
            email: inputPassword.value,
            password: inputEmail.value,
        };

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        let response = await fetch("/api/users/login", opts);
        response = await response.json();

        if (response.error) {
            alert(response.error);
        } else { */
            location.replace("/products");
        /* } */
    } catch (error) {
        alert(error.error);
    }
})