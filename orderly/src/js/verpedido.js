async function verpedido(navigateTo) {
  const response = await fetch('/Verpedido.html'); // Carga el HTML externo
  const htmlText = await response.text(); // Convierte la respuesta en texto HTML
  const container = document.createElement('div'); // Crear un contenedor temporal
  container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

  // Seleccionar el elemento #precio dentro del container
  const precioElemento = container.querySelector('#precio');

  // Obtener el pedido en proceso desde localStorage
  let pedido_en_proceso = JSON.parse(localStorage.getItem("pedido_en_proceso")) || [];

  // Función para calcular el total del pedido
  function calcularTotal() {
      if (!precioElemento) {
          console.error("No se encontró el elemento #precio.");
          return;
      }

      let total = pedido_en_proceso.reduce((acc, item) => {
          let precioNumerico = parseFloat(item.precio.replace('.', '').replace(',', '').replace('$', '')) || 0;
          return acc + (precioNumerico * item.cantidad);
      }, 0);

      // Formatear como moneda y actualizar en el DOM
      precioElemento.textContent = `Total: $${total.toLocaleString()}`;
  }

  // Pintar los productos en la pantalla
  function pintarVerPedido() {
      const contenedorPedido = container.querySelector('#contenedor-pedido');
      contenedorPedido.innerHTML = ''; // Limpiar antes de renderizar

      if (pedido_en_proceso.length === 0) {
          contenedorPedido.innerHTML = "<p>No hay productos en el pedido.</p>";
          return;
      }

      pedido_en_proceso.forEach(item => {
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

  // Botón "Comandar"
  const botonComandar = container.querySelector('#comandar');
  if (botonComandar) {
      botonComandar.addEventListener('click', () => {
          console.log("Pedido enviado");
      });
  } else {
      console.error("No se encontró el botón #comandar.");
  }

  // Pintar el pedido en pantalla
  pintarVerPedido();

  return container;
}

export default verpedido;
