async function verPedido(navigateTo) {
  const response = await fetch('/Verpedido.html'); // Carga el HTML externo
  const htmlText = await response.text(); // Convierte la respuesta en texto HTML
  const container = document.createElement('div'); // Crear un contenedor temporal
  container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

  // Seleccionar el elemento #precio dentro del container
  const precioElemento = container.querySelector('#precio');

  // Obtener el pedido en proceso desde localStorage
  let pedido_en_proceso = JSON.parse(localStorage.getItem("pedido_en_proceso")) || {};
  let total_pedido;

  // Función para calcular el total del pedido
  function calcularTotal() {
      if (!precioElemento) {
          console.error("No se encontró el elemento #precio.");
          return;
      }

      let total = pedido_en_proceso.alimentos.reduce((acc, item) => {
          let precioNumerico = parseFloat(item.precio.replace('.', '').replace(',', '').replace('$', '')) || 0;
          return acc + (precioNumerico * item.cantidad);
      }, 0);

      // Formatear como moneda y actualizar en el DOM
      precioElemento.textContent = `Total: $${total.toLocaleString()}`;
      total_pedido = total;
      console.log(total_pedido);
  }

  // Pintar los productos en la pantalla
  function pintarVerPedido() {
      const contenedorPedido = container.getElementsByClassName('contenedor-pedido')[0];
      contenedorPedido.innerHTML = ''; // Limpiar antes de renderizar

      if (pedido_en_proceso.alimentos.length === 0) {
          contenedorPedido.innerHTML = "<p>No hay productos en el pedido.</p>";
          return;
      }

      pedido_en_proceso.alimentos.forEach((item,index) => {
          let divPedido = document.createElement('div');
          divPedido.classList.add("pedido-item");

          divPedido.innerHTML = `
              <p><strong>Producto:</strong> ${item.nombreProducto}</p>
              <p><strong>Precio:</strong> $${item.precio}</p>
              <p><strong>Cantidad:</strong> <img id='icono-eliminar' src="/assets/icono-eliminar.svg" > ${item.cantidad}</img></p>
          `;
         const btnEliminarItem = divPedido.querySelector('#icono-eliminar');
         btnEliminarItem.addEventListener('click', () => EliminarItem(index));

          contenedorPedido.appendChild(divPedido);
      });

      calcularTotal(); // Calcular total al pintar los productos
  }
  // Pintar el pedido en pantalla
  pintarVerPedido();

  // función para comandar el pedido
  function Comandar(mesa) {
    console.log("mesa - comandar",mesa);
    if (!mesa) {
        console.error("No hay mesa seleccionada.");
        return;
    }
    // Añadir pedido
    pedido_en_proceso.total= total_pedido;
    console.log(pedido_en_proceso);
    mesa.pedidos.push(pedido_en_proceso);
    let mesas = JSON.parse(localStorage.getItem('Mesas')) || [];

    let index = mesas.findIndex(m => m.nombre === mesa.nombre);
    if (index !== -1) {
        mesas[index] = mesa;
        localStorage.setItem('Mesas', JSON.stringify(mesas));
        alert('El pedido ha sido guardado correctamente');
        navigateTo('/mesas')
    }
  }

  function EliminarItem(index){
    let cantidad = pedido_en_proceso.alimentos[index].cantidad;
    if(cantidad > 1){
        pedido_en_proceso.alimentos[index].cantidad --;
    }
    else{
        pedido_en_proceso.alimentos.splice(index,1);
    }
    localStorage.setItem("pedido_en_proceso",JSON.stringify(pedido_en_proceso));
    pintarVerPedido();
  }
    // Botón "Comandar"
  const botonComandar = container.querySelector('#comandar');
  let mesa = JSON.parse(localStorage.getItem("MesaSeleccionada")) || [];
  if (botonComandar) {
      botonComandar.addEventListener('click', () => Comandar(mesa));
  } else {
      console.error("No se encontró el botón #comandar.");
  }
  

  return container;
}

export default verPedido;
