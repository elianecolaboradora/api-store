const loginBtn = document.getElementById("login-button")
const inputPassword = document.querySelector("#password")
const inputEmail = document.querySelector("#email")

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    try {

		const data = {
			email: inputEmail.value,
			password: inputPassword.value,
		};
		console.log(data)
		const opts = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		};
		
		let response = await fetch("/api/auth/login", opts);
		response = await response.json();
		if (response.error) {
			alert(response.error);
		} else {
			location.replace("api/products");
		}
	
    } catch (error) {
        alert(error.error);
    }
})