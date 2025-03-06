
async function Pedidos(navegateTo) {
    const response = await fetch('/Pedidos.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const ContenedorPedidos = container.querySelector('#contenedor-pedidos');
    // pinta cada uno de los pedidos de las mesas.
    function pintarPedidos(mesas) {
      let ContenedorPedido;
      mesas.forEach(mesa => {
        mesa.pedidos.forEach(pedido => {
          ContenedorPedido= document.createElement('div');
          ContenedorPedido.innerHTML= `
          <div>
            <p class="numero-mesa">`+mesa.nombre+`</p><p class="estado-pedido">`+pedido.estado+`</p>
          </div>
          <p>total: $</p>
          <button>terminar pedido</button>
      `;
        ContenedorPedido.classList.add("pedido");
        ContenedorPedidos.appendChild(ContenedorPedido);
        })
     });
    }

    const stringMesas = localStorage.getItem('Mesas'); // se obtienen las mesas del localstorage
    const Mesas =JSON.parse(stringMesas);

    const selector = container.getElementsByClassName("selector-sector")[0];

    // muestra los pedidos de los diferentes sectores
    selector.addEventListener("change", (event) => {
        pintarPedidosSector(event.target.value)
    });

    let mesasSector;
    // función para pintar las mesas dependiendo del sector
    function pintarPedidosSector(seleccion){
        mesasSector= Mesas.filter((mesa) => mesa.sector === seleccion);
        ContenedorPedidos.replaceChildren();
        pintarPedidos(mesasSector);
    };
    pintarPedidosSector('Piso 1');
    return container;
  }
  
  export default Pedidos;