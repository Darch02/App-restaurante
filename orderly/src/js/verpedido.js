async function verpedido(navigateTo) {
    const response = await fetch('/Verpedido.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado
    
    const botonComandar = container.querySelector('#comandar');
    botonComandar.addEventListener('click',Comandar);

    const stringMesa = localStorage.getItem("MesaSeleccionada");
    const mesa = JSON.parse(stringMesa)
    //const stringPedido = localStorage.getItem("PedidoEnCurso") La idea es guardar todos los items del pedido en una variable en localstorage
    const pedido = {
      alimentos: [],
      estado: 'activo'
    }

    function Comandar() {
      console.log("se está guardando el pedido");
  
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
          console.log("se pudo guardar el pedido");
      }
    }

    return container;
  }
  
  export default verpedido;