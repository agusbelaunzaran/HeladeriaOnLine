const heladosContent = document.getElementById("heladosContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
    `;

    heladosContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Agregar al carrito";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

    const repite = carrito.some((repiteProducto) => repiteProducto.id === product.id);

    if (repite) {
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        });
    } else {
            carrito.push({
            id:  product.id, 
            nombre: product.nombre,
            precio: product.precio,
            img: product.img,
            cantidad: product.cantidad,
        });
    }
    console.log(carrito);
    carritoContador();
    saveLocal();
    });
});

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}