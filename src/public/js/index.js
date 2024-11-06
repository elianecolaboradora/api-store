const btnAddProduct = document.querySelectorAll(".btnAddProduct")
const shoppingCart = document.querySelector("#shoppingCart")

async function createCart () {
    const options = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "products":[]
        }),
    };
    const response = await fetch('http://localhost:8080/api/carts',options)
    return await response.text()
}
async function addProductoToCart(cartId,productId) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`,options)
    return await response.json()
}

btnAddProduct.forEach((btn)=>{
    btn.addEventListener("click", async()=>{

        if(!localStorage.getItem("IDCART")){
            const IDCART = await createCart()
            localStorage.setItem("IDCART", IDCART);
        }
        const productId = btn.dataset.product
        const cartId = localStorage.getItem("IDCART")
        shoppingCart.href = `/api/carts/${cartId}`

        return await addProductoToCart(cartId,productId)
    })
})

shoppingCart.addEventListener("click", async()=>{

    if(!shoppingCart.href){
        if(!localStorage.getItem("IDCART")){
            const IDCART = await createCart()
            localStorage.setItem("IDCART", IDCART);
            const cartId = localStorage.getItem("IDCART")
            shoppingCart.href = `/api/carts/${cartId}`
        }
    }
})
window.addEventListener("load", ()=>{
    if(localStorage.getItem("IDCART")){
        const cartId = localStorage.getItem("IDCART")
        shoppingCart.href = `/api/carts/${cartId}`
    }
})
