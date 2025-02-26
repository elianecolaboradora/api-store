const btnRegister = document.getElementById("register")
const inputPassword = document.getElementById("password")
const inputEmail = document.getElementById("email")
const inputPhoto  = document.getElementById("photo")

async function createCart(data) {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        let response = await fetch("/api/carts", opts);
    
        if (!response.ok) {
            let text = await response.text();
            throw new Error("Error en createCart:", text);
        }
    
        response = await response.json();
        return response;
    } catch (error) {
        throw new Error(error)
    }

}

async function registerUser(e) {

    e.preventDefault();
    try {
        const data = {
            email: inputEmail.value,
            password: inputPassword.value,
        };
        if(inputPhoto.value) data.photo = inputPhoto.value

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
    
        let registryResponse = await fetch("/api/auth/register", opts);
        if (!registryResponse.ok) {
            let text = await registryResponse.json();
            throw new Error("Error al regsitrar el usuario:", text.error);
        }

        registryResponse = await registryResponse.json();

        await createCart({
            user_id: registryResponse._id
        });

        location.replace("/api/auth/login")
        
    } catch (error) {
        throw new Error(error);
    }

}

btnRegister.addEventListener("click", registerUser)