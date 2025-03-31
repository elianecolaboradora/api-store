const btnRegister = document.getElementById("register")
const inputPassword = document.getElementById("password")
const inputEmail = document.getElementById("email")
const btnVerify = document.getElementById("verify-button")
const boxVerify = document.querySelector(".background-verify")
const inputverify = document.querySelector(".verify-input")
/* const inputPhoto  = document.getElementById("photo")
 *//* 
console.log(inputEmail)
async function createCart(data) {
   try {
       const opts = {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(data),
       };
       let response = await fetch("/api/cart", opts);
   
       if (!response.ok) {
           let text = await response.text();
           throw new Error("Error en createCart:", text);
       }
   
       response = await response.json();
       return response;
   } catch (error) {
       throw new Error(error)
   }

} */
async function verifyCode(e) {
    e.preventDefault();

    const dataVerify = {
        email: inputEmail.value,
        code: inputverify.value,
    };

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataVerify),
    };

    await fetch("/api/auth/verify", opts);
    location.replace("/")
}
async function registerUser(e) {

    e.preventDefault();
    try {
        const dataRegister = {
            email: inputEmail.value,
            password: inputPassword.value,
        };

        console.log(dataRegister)
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataRegister),
        };

        boxVerify.classList.remove("verify_close")
        await fetch("/api/auth/register", opts);

    } catch (error) {
        throw new Error(error);
    }

}

btnRegister.addEventListener("click", registerUser)
btnVerify.addEventListener("click", verifyCode)