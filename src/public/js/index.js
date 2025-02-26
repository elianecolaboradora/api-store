const btnSignOut = document.querySelector(".header-singout")
console.log(btnSignOut)
async function signOut(){
    try {
        const options = {
            method: "POST",
            credentials: "include", // Para enviar cookies al backend
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch('/api/auth/signout', options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        location.replace("/api/auth/login")

    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}

btnSignOut.addEventListener("click", signOut)
