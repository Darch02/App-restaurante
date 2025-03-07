async function Pedidos(navigateTo) {
    const response = await fetch('/Pedidos.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado


    //pedido.total.toLocaleString()

    const ContenedorPedidos = container.querySelector('#contenedor-pedidos');
    // pinta cada uno de los pedidos de las mesas.
    function pintarPedidos(mesas,estado) {
      let ContenedorPedido;
      ContenedorPedidos.innerHTML='';
      mesas.forEach(mesa => {
        mesa.pedidos.forEach((pedido,index) => {
          if(pedido.estado === estado){
            ContenedorPedido= document.createElement('div');
            ContenedorPedido.innerHTML= `
            <div>
              <p class="numero-mesa">`+mesa.nombre+`</p><p class="estado-pedido">`+pedido.estado+`</p>
            </div>
            <p><strong>Id: </strong>`+index+`<p>
            <p>total: $`+ pedido.total.toLocaleString()+`</p>
            <button>terminar pedido</button>
            `;
            ContenedorPedido.classList.add("pedido");
            ContenedorPedido.addEventListener('click', () => {
              localStorage.setItem('PedidoSeleccionado',pedido)
              navigateTo('/popUpPedido');
            });
            const btnTerminar = ContenedorPedido.getElementsByTagName('button')[0];
            btnTerminar.addEventListener('click', () => terminarPedido(pedido,mesa));
            ContenedorPedidos.appendChild(ContenedorPedido);
          }
        })
     });
    }
    // se cambia el estado de la variable según el botón seleccionado
    let selecciónEstado = 'activo'
    const btnActivos = container.getElementsByClassName('boton-activo')[0];
    btnActivos.addEventListener('click', ()=> {
      selecciónEstado='activo';
      btnActivos.classList.add('estado-seleccionado');
      btnTerminados.classList.remove('estado-seleccionado');
      pintarPedidos(mesasSector,selecciónEstado);
    })

    const btnTerminados = container.getElementsByClassName('boton-terminado')[0];
    btnTerminados.addEventListener('click', ()=> {
      selecciónEstado='terminado';
      btnTerminados.classList.add('estado-seleccionado');
      btnActivos.classList.remove('estado-seleccionado');
      pintarPedidos(mesasSector,selecciónEstado);
    })

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
    const selector = container.getElementsByClassName("selector-sector")[0];

    // muestra los pedidos de los diferentes sectores
    selector.addEventListener("change", (event) => {
        pintarPedidosSector(event.target.value)
    });

    // función para pintar las mesas dependiendo del sector
    let mesasSector;
    function pintarPedidosSector(seleccion){
        mesasSector = Mesas.filter((mesa) => mesa.sector === seleccion);
        pintarPedidos(mesasSector,selecciónEstado);
    };


    pintarPedidosSector('Piso 1');
    return container;

  }
  
  export default Pedidos;