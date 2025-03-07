async function PopUpDescrMenu(navigateTo) {
    const response = await fetch('/PopUpDescrMenu.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    // Obtener el producto guardado en localStorage
    const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

    // Si hay un producto, llenar el pop-up con su información
    if (producto) {
        container.querySelector('#popupM-nombre').textContent = producto.nombreProducto;
        container.querySelector('#popupM-descripcion').textContent = producto.descripcion;
        container.querySelector('#popupM-precio').textContent = `Precio: $${producto.precio}`;
    }

    // Evento para cerrar el pop-up si se hace clic fuera del contenido
    container.addEventListener('click', (event) => {
        if (event.target === container) {
            cerrarPopup();
        }
    });

    return container;
}

export default PopUpDescrMenu;
