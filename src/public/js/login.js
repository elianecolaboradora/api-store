const loginBtn = document.getElementById("login-button")
const inputPassword = document.querySelector("#email")
const inputEmail = document.querySelector("#password")

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    try {

		const data = {
			email: document.querySelector("#email").value,
			password: document.querySelector("#password").value,
		};
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
			location.replace("/products");
		}
	
    } catch (error) {
        alert(error.error);
    }
})