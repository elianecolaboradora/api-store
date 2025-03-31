# 🛒 SHOP API

## 📌 Descripción del Proyecto  
Este proyecto es una API RESTful para la gestión de productos y carritos de compras en SHOP, un e-commerce que vende diversos productos. La API sigue una arquitectura basada en el patrón **MVC (Modelo-Vista-Controlador)**, lo que permite una estructura modular y escalable.

## 🏗️ Arquitectura MVC  

La aplicación sigue el patrón **MVC** para separar responsabilidades:

- **Model (Modelo)**: Representa la estructura de datos y se encarga de la persistencia en la base de datos.  
- **View (Vista)**: En este caso, al ser una API, no tiene vistas gráficas, sino que devuelve respuestas en formato **JSON**.  
- **Controller (Controlador)**: Maneja las solicitudes HTTP, llama a los servicios correspondientes y devuelve respuestas.  
- **Service (Servicio) [Adicional]**: Contiene la lógica de negocio, validaciones y reglas antes de interactuar con la base de datos.  
- **Repository (Repositorio) [Adicional]**: Se encarga de la comunicación con la base de datos, aislando la lógica de acceso a datos.  

## 🚀 Instalación y Ejecución  

1. Clona el repositorio:  
   ```sh
   git clone https://github.com/tu-usuario/shop-api.git
   ```
2. Accede al proyecto:  
   ```sh
   cd shop-api
   ```
3. Instala las dependencias:  
   ```sh
   npm install
   ```
4. Configura las variables de entorno en un archivo **.env**.  
5. Ejecuta el servidor:  
   ```sh
   npm run dev
   ```

## 📌 Endpoints de la API  

### 🔹 **Autenticación (Auth)**  
---
#### 📍 `POST /api/auth/register`  
Registra un nuevo usuario en la plataforma.  

- Verifica si el usuario ya está registrado.  
- Envía un token de seguridad para validar el correo electrónico.  

📌 **Body (JSON)**  
```json
{
    "email": "user@gmail.com",
    "password": "contraseña_segura"
}
```
---
#### 📍 `POST /api/auth/login`  
Permite al usuario iniciar sesión en la plataforma.  

- Verifica que el correo electrónico esté verificado; de lo contrario, no podrá iniciar sesión.  
- Guarda el token en una cookie para autenticación segura.  

📌 **Body (JSON)**  
```json
{
    "email": "user@gmail.com",
    "password": "contraseña_segura"
}
```
---

#### 📍 `POST /api/auth/signout`  
Permite al usuario cerrar sesión mediante JWT (token de verificación).  

- Elimina el token de autenticación almacenado en las cookies.  
- Invalida la sesión activa del usuario. 

📌 **Body (JSON)**  
```
No requiere cuerpo en la solicitud. 
```

---

#### 📍 `POST /api/auth/online`  
Permite verificar si el usuario está activo y si el token sigue siendo válido.  

- Comprueba la validez del token de autenticación.  
- Retorna el estado de la sesión del usuario.  

📌 **Body (JSON)** 
```
No requiere cuerpo en la solicitud.
```

---

#### 📍 `GET /api/auth/google/callback`  
Permite la autenticación del usuario mediante Google.  

- Inicia sesión o registra al usuario a través de Google.  
- Abre un popup para completar el proceso de autenticación.  
- Retorna un token de acceso si la autenticación es exitosa.  

📌 **Body (JSON)**  
```
No requiere cuerpo en la solicitud.
```
---

#### 📍 `POST /api/auth/google/failure`  
Redirige a una ruta alternativa en caso de fallo en la autenticación con Google.  

- Se activa si hay un error durante el proceso de autenticación.  
- Permite manejar errores y mostrar un mensaje adecuado al usuario.

---  

#### 📍 `POST /api/auth/twilio`  
Permite realizar una verificación mediante SMS usando Twilio.  

- Envía un código de verificación al número de teléfono proporcionado.  
- Se usa para autenticar o validar la identidad del usuario.  

📌 **Parámetros de la URL**  
- `phone` _(number)_: Número de teléfono del usuario.  

📌 **Body (JSON)**  
```json
{
    "phone": "your_number"
}
```

---

#### 📍 `POST /api/auth/nodemailer`  
Permite realizar una verificación mediante correo electrónico.  

- Envía un código de verificación al email del usuario.  
- Se usa para autenticar o validar la identidad del usuario.  

📌 **Body (JSON)**  
```json
{
    "email": "your_email"
}
```

---

#### 📍 `POST /api/auth/verify`  
Registra si el usuario ha verificado su cuenta.  

- Comprueba el código de verificación enviado al correo electrónico.  
- Habilita el acceso completo a la plataforma una vez verificado.  

📌 **Body (JSON)**  
```json
{
    "email": "your_email",
    "code": "your_code"
}
```

---

### 🔹 **User**

#### 📍 `POST /api/user`  
Crea un nuevo usuario, pero solo si la solicitud es realizada por un administrador.  

- Requiere permisos de administrador para ejecutar la acción.  
- Registra un nuevo usuario en la plataforma.  

📌 **Body (JSON)**  
```json
{
    "email": "email",
    "password": "password"
}
```

---

#### 📍 `GET /api/user`  
Obtiene la lista de usuarios, pero solo si el usuario está autenticado como **ADMIN** y su sesión sigue activa.  

- Requiere un token de autenticación válido.  
- Solo los administradores pueden acceder a esta información.  

📌 **Body (JSON)**  
```
No requiere cuerpo en la solicitud.
```

---

#### 📍 `GET /api/user/:uid_req`  
Permite obtener los datos de un usuario según su rol y verificación de cuenta.  

- **Usuarios estándar**: Solo pueden acceder a sus propios datos.  
- **Administradores**: Pueden acceder a la información de cualquier usuario.  
- Ambos deben tener cuentas verificadas.  
- El ID del usuario a obtener se pasa como parámetro en la URL.  

📌 **Parámetros de la URL**  
```
"uid_req" _(string)_: ID del usuario a consultar.  
```
📌 **Body (JSON)**  
```
No requiere cuerpo en la solicitud. 
```

---

#### 📍 `PUT /api/user/:uid_req`  
Permite actualizar los datos de un usuario según su rol.  

- **Usuarios estándar**: Solo pueden actualizar sus propios datos.  
- **Administradores**: Pueden actualizar la información de cualquier usuario.  

📌 **Parámetros de la URL**  
```
`uid_req` _(string)_: ID del usuario a actualizar.  
```
📌 **Body (JSON)**  
Debe contener los campos a modificar. Ejemplo:  
```json
{
    "name": "Nuevo Nombre",
    "email": "nuevo_email@example.com",
    "role": "admin"
}
```

---

#### 📍 `DELETE /api/user/:uid_req`  
Permite eliminar un usuario según su rol.  

- **Usuarios estándar**: Solo pueden eliminar su propia cuenta.  
- **Administradores**: Pueden eliminar cualquier cuenta.  

📌 **Parámetros de la URL**  
```
`uid_req` _(string)_: ID del usuario a eliminar.  
```
📌 **Body (JSON)**  
```
No requiere cuerpo en la solicitud.
```
---
### 🔹 **Productos**

---

#### 📍 `POST /products`  
Permite crear un producto, pero solo si el usuario está autenticado como **ADMIN**.  

- El **título** es el único campo obligatorio.  
- El **owner_id** se obtiene automáticamente del token del usuario autenticado.  
- Los demás campos tienen valores por defecto o son opcionales.  

📌 **Body (JSON)**  
```json
{
    "title": "Nombre del Producto",
    "description": "Descripción opcional",
    "category": "Laptops",
    "price": 1000,
    "stock": 10,
    "photo": "https://i.postimg.cc/kX8PKZpq/ipad.jpg",
    "onsale": true,
    "state": "reserved"
}
```
📌 **Categorías permitidas:**  
- Tablets  
- Smartphones  
- Laptops  
- Smartwatches  
- Headphones  
- Speakers  
- Desktops  
- Streaming Devices  
- Keyboards  
- Accessories  
- Virtual Reality  
- Fitness  
- Cameras  
- Gaming  
- Televisions  
- Soundbars  

📌 **Estados permitidos:**  
- Reserved  
- Paid  
- Delivered  

---

#### 📍 `GET /api/products`  
Obtiene una lista paginada de productos con filtros opcionales. Esta ruta es **pública**.  

📌 **Parámetros opcionales:**  
- `limit` _(número)_: Límite de productos por página _(default: `10`)_  
- `page` _(número)_: Página actual _(default: `1`)_  
- `sort` _(asc | desc)_: Ordenar por precio _(ascendente o descendente)_  
- `query` _(string)_: Filtro por categoría o estado  

📌 **Ejemplo de uso:**  
```sh
GET /api/products?limit=5&page=2&sort=asc&query=uva
```

---

#### 📍 `GET /api/products/:pid`  
Obtiene un producto por su **ID**. Esta ruta es **pública**, solo se necesita proporcionar el ID del producto en la URL y el objeto con los nuevos campos.  

📌 **Ejemplo de uso:**  
```sh
GET /products/65f3a2b5e2b0e3c8a7d4e1f9
```
---

#### 📍 `PUT /products/:pid`
Actualiza un producto por su **ID**, pero solo el **administrador** tiene permiso para hacerlo.  
 
📌 **Body (JSON)**  
```json
{
  "price": 1400
}
```
📌 **Ejemplo de uso:**  
```sh
PUT /products/65f3a2b5e2b0e3c8a7d4e1f9
```
---

#### 📍 `DELETE /products/:pid`  
Elimina un producto por su **ID**. Solo los **administradores** tienen permiso para eliminar productos.  

📌 **Ejemplo de uso:**  
```sh
DELETE /products/65f3a2b5e2b0e3c8a7d4e1f9
```
---
### 🔹 **Carrito de Compras**
---
#### 📍 `GET api/api/cart`  
Obtiene todos los carritos de compras. Solo los **administradores** pueden acceder a esta información.  

📌 **Ejemplo de uso:**  
```sh
GET /api/cart
```
---

#### 📍 `POST /api/cart`  
Permite crear un carrito de compras. Solo los usuarios **autenticados** pueden realizar esta acción.  

📌 **Ejemplo de uso:**  
```sh
POST /api/cart
```
📌 **Body**  
```sh
No requiere body
```
---
## 📍 `GET /api/cart/:cid`  
Obtiene un carrito de compras según el rol del usuario.  

- Como **usuario**, puedes recuperar únicamente tu propio carrito.  
- Como **administrador**, puedes obtener cualquier carrito.  

📌 **Parámetros de la URL**  
- `cid` _(string)_: ID del carrito.  

📌 **Ejemplo de uso:**  
```sh
GET /api/cart/65f3a2b5e2b0e3c8a7d4e1f9
```
----
## 📍 `PUT /api/cart/:cid/add/one/product/:pid`  
Añade una unidad de un producto al carrito.  
Solo los **usuarios registrados** pueden realizar esta acción.  

📌 **Parámetros de la URL**  
- `cid` _(string)_: ID del carrito.  
- `pid` _(string)_: ID del producto.  

📌 **Ejemplo de uso:**  
```sh
PUT /api/cart/65f3a2b5e2b0e3c8a7d4e1f9/add/one/product/45d3b5c8e1a2f9
```
---
## 📍 `PUT /api/cart/:cid/remove/one/product/:pid`  
Elimina una unidad de un producto del carrito.  
Solo los **usuarios registrados** pueden realizar esta acción.  

📌 **Parámetros de la URL**  
- `cid` _(string)_: ID del carrito.  
- `pid` _(string)_: ID del producto.  

📌 **Ejemplo de uso:**  
```sh
PUT /api/cart/65f3a2b5e2b0e3c8a7d4e1f9/remove/one/product/45d3b5c8e1a2f9
```
---
## 📍 `PUT /api/cart/:cid/remove/product/:pid`  
Elimina completamente un producto del carrito.  
Solo los **usuarios registrados** pueden realizar esta acción.  

📌 **Parámetros de la URL**  
- `cid` _(string)_: ID del carrito.  
- `pid` _(string)_: ID del producto.  

📌 **Ejemplo de uso:**  
```sh
PUT /api/cart/65f3a2b5e2b0e3c8a7d4e1f9/remove/product/45d3b5c8e1a2f9
```
---
## 📍 `PUT /api/cart/:cid`  
Elimina todos los productos del carrito del usuario.  

📌 **Parámetros de la URL**  
- `cid` _(string)_: ID del carrito.  

📌 **Ejemplo de uso:**  
```sh
PUT /api/cart/65f3a2b5e2b0e3c8a7d4e1f9
```
----
## 📍 `DELETE /api/cart/:cid`  
Elimina un carrito de compras.  

- **Usuarios**: Pueden eliminar únicamente su propio carrito.  
- **Administradores**: Pueden eliminar cualquier carrito.  

📌 **Parámetros de la URL**  
- `cid` _(string)_: ID del carrito.  

📌 **Ejemplo de uso:**  
```sh
DELETE /api/cart/65f3a2b5e2b0e3c8a7d4e1f9
```

---

## 📌 Tecnologías Utilizadas  

- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **Arquitectura MVC**  




