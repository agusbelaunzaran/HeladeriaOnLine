const iluminarCarrito = () =>{
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Tu pedido:</h2>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML= `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio}</p>
        <span class="delete-product"> ❎ </span>
        `;
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (product.cantidad !==1) {
            product.cantidad--;
            }
            saveLocal();
            iluminarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            iluminarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () =>{
        eliminarProducto(product.id);
    });

    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.clasName = "total-content"
    totalCompra.innerHTML=`Total a pagar: ${total} $`;
    modalContainer.append(totalCompra);


    const btnConfirmarPedido = document.getElementById("btnConfirmarPedido");

btnConfirmarPedido.addEventListener("click", () => {
   
    Swal.fire({
        title: 'Confirmar Pedido',
        text: '¿Estás seguro de que deseas confirmar el pedido?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Compra exitosa",
                icon:"success",
            })
        }
    });
});
  modalContainer.append(btnConfirmarPedido);
};

verCarrito.addEventListener("click", iluminarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoContador();
    saveLocal();
    iluminarCarrito();
};

const carritoContador = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem ("carritoLength", JSON.stringify(carrito.length))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
 


carritoContador()