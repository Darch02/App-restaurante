async function verpedido(navigateTo) {
  const response = await fetch('/Verpedido.html'); // Carga el HTML externo
  const htmlText = await response.text(); // Convierte la respuesta en texto HTML
  const container = document.createElement('div'); // Crear un contenedor temporal
  container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

  const botonComandar = container.querySelector('#comandar');
  botonComandar.addEventListener('click', Comandar);

  const stringMesa = localStorage.getItem("MesaSeleccionada");
  const mesa = JSON.parse(stringMesa);

  // Obtener el pedido en proceso desde localStorage
  let pedido_en_proceso = JSON.parse(localStorage.getItem("pedido_en_proceso")) || [];

  // Definir el pedido que se guardará en la mesa
  const pedido = {
      alimentos: pedido_en_proceso, // Agregamos los alimentos del pedido en proceso
      estado: 'activo'
  };

  // Función para guardar el pedido en la mesa seleccionada
  function Comandar() {
      console.log("Se está guardando el pedido");

      if (!mesa) {
          console.error("No hay mesa seleccionada.");
          return;
      }

      // Añadir pedido
      mesa.pedidos.push(pedido);
      mesa.Estado = "ocupada";
      let mesas = JSON.parse(localStorage.getItem('Mesas')) || [];

      let index = mesas.findIndex(m => m.nombre === mesa.nombre);
      if (index !== -1) {
          console.log("Antes de actualizar:", mesas[index]); // Verifica antes
          mesas[index] = mesa;
          console.log("Después de actualizar:", mesas[index]); // Verifica después

          localStorage.setItem('Mesas', JSON.stringify(mesas));
          console.log("Se pudo guardar el pedido");

          // Limpiar pedido en proceso después de comandar
          localStorage.removeItem("pedido_en_proceso");

          // Recargar la vista para actualizar
          pintarVerPedido();
      }
  }

  // Función para pintar el pedido en la pantalla
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
  }

  // Llamar a la función para mostrar el pedido al cargar la página
  pintarVerPedido();

  return container;
}

export default verpedido;
