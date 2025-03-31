const btnClose = document.querySelector(".header-singout")
const btnCart = document.querySelector(".cart-link")
async function closeSession() {
    try {

        const opts = {
            method: "POST",
            credentials: "include",
        };
        
        let response = await fetch("/api/auth/signout", opts);
        response = await response.json()
        console.log(response)
        location.replace("/");

    } catch (error) {
        console.log(error)
    }


}  

btnClose.addEventListener("click", closeSession)