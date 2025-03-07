async function PopUpPedido(navigateTo) {
    const response = await fetch('/PopUpPedido.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const pedido = JSON.parse(localStorage.getItem('PedidoSeleccionado'))
    const precioElemento = container.querySelector('#precio');

    function calcularTotal() {
        if (!precioElemento) {
            console.error("No se encontró el elemento #precio.");
            return;
        }
  
        let total = pedido.alimentos.reduce((acc, item) => {
            let precioNumerico = parseFloat(item.precio.replace('.', '').replace(',', '').replace('$', '')) || 0;
            return acc + (precioNumerico * item.cantidad);
        }, 0);
  
        // Formatear como moneda y actualizar en el DOM
        precioElemento.textContent = `Total: $${total.toLocaleString()}`;
    }
  
    // Pintar los productos en la pantalla
    function pintarVerPedido(pedido) {
        const contenedorPedido = container.getElementsByClassName('contenedor-pedido')[0];
        contenedorPedido.innerHTML = ''; // Limpiar antes de renderizar
  
        if (pedido.alimentos.length === 0) {
            contenedorPedido.innerHTML = "<p>No hay productos en el pedido.</p>";
            return;
        }
  
        pedido.alimentos.forEach(item => {
            let divPedido = document.createElement('div');
            divPedido.classList.add("pedido-item");
  
            divPedido.innerHTML = `
                <p><strong>Producto:</strong> ${item.nombreProducto}</p>
                <p><strong>Precio:</strong> $${item.precio}</p>
                <p><strong>Cantidad:</strong> ${item.cantidad}</p>
            `;
  
            contenedorPedido.appendChild(divPedido);
        });
  
        calcularTotal(); // Calcular total al pintar los productos
    }

    const stringMesas = localStorage.getItem('Mesas') || []; // se obtienen las mesas del localstorage
    const Mesas =JSON.parse(stringMesas);

    function terminarPedido(pedido,mesa){
      let index = Mesas.findIndex(m => m.nombre === mesa.nombre);
      if (index !== -1) {
          let indexPedido = Mesas[index].pedidos.findIndex(p => p === pedido) ;
          Mesas[index].pedidos[indexPedido].estado = 'terminado';
          console.log(Mesas[index]);
          localStorage.setItem('Mesas', JSON.stringify(Mesas));
          console.log("se pudo guardar el pedido");
        }
    }

    pintarVerPedido(pedido);
    return container;
}
export default PopUpPedido;