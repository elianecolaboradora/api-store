const socket = io()

const btnAddProduct = document.getElementById("addNewProduct")
const allProductsContainer = document.getElementById("allProductsContainer")
const nameProduct = document.getElementById("name")
const description = document.getElementById("description")
const price = document.getElementById("price")
const code = document.getElementById("code")
const stock = document.getElementById("stock")
const btnsDelete = document.querySelectorAll(".btnDelate")
const cardsProducts = document.querySelectorAll(".card")

function deleteProduct(btns,card) {
    Object.values(btns).forEach((btnDelate,indexBtnDelate) =>{
        btnDelate.addEventListener("click", ()=>{

            const idProduct = card[indexBtnDelate].dataset.id
            socket.emit("idProductDelete",  idProduct)
            card[indexBtnDelate].remove()
        })
    })
}
btnAddProduct.addEventListener("click", ()=>{


    if(!nameProduct.value || !description.value || !price.value || !code.value || !stock.value){
        alert("completa todos los campos para agregar el producto")
    }else{

        socket.emit("newProduct", {
            title: nameProduct.value,
            description: description.value,
            price: price.value,
            img: "no hay imagen",
            code: code.value,
            stock: stock.value
        })

        socket.on("products", async(dataProducts)=>{

            try{
                const products = await dataProducts

                let templateProducts= products.reduce((acc, currentProduct) =>{
                    return acc + `
                                    <div class="card" data-id=${currentProduct.id}>
                                        <p>Producto: ${currentProduct.title} </p>
                                        <p>Descripción ${currentProduct.description} </p>
                                        <p>Precio: ${currentProduct.price}</p>
                                        <button class="btnDelate" data-id=${currentProduct.id}>Eliminar producto</button>
                                    </div>
                                `
                },"")
                allProductsContainer.innerHTML = ""
                allProductsContainer.innerHTML = templateProducts

                deleteProduct(allProductsContainer.querySelectorAll(".btnDelate"),allProductsContainer.querySelectorAll(".card"))

            }catch(error){
                console.log(error)
            }

        })

        function clearFormFields() {
            btnAddProduct.value = ""
            nameProduct.value = ""
            description.value = ""
            price.value = ""
            code.value = ""
            stock.value = ""
        }
        clearFormFields()

    }
})
deleteProduct(btnsDelete,cardsProducts)

