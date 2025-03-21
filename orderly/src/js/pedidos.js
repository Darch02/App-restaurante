async function Pedidos(navigateTo) {
    const response = await fetch('/Pedidos.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado


    //pedido.total.toLocaleString()

    const ContenedorPedidos = container.querySelector('#contenedor-pedidos');
    // busca los sectores
    const Sectores = JSON.parse(localStorage.getItem('sectores')) || [];
    // elemento del selector
    const selector = container.getElementsByClassName("selector-sector")[0];
   
    function OpcionesSelector(sectores){
    
        if (sectores.length === 0) {
            // Si no hay sectores, agregamos un mensaje temporal
            const optionEmpty = document.createElement("option");
            optionEmpty.value = "";
            optionEmpty.textContent = "Ningún sector disponible";
            optionEmpty.disabled = true;
            optionEmpty.selected = true;
            selector.appendChild(optionEmpty);
        } else {
            // Agregamos los sectores disponibles
            sectores.forEach(sector => {
                const option = document.createElement("option");
                option.value = sector;
                option.textContent = sector;
                selector.appendChild(option);
            });
        }

        selector.addEventListener("change", (event) => {
          pintarPedidosSector(event.target.value);
        });
    
    }
    // pinta cada uno de los pedidos de las mesas.
    function pintarPedidos(mesas,estado) {
      let ContenedorPedido;
      let Contenedor;
      ContenedorPedidos.innerHTML='';
      if( estado === 'En espera'){
        const mesasEnEspera = mesas.filter(m => (m.Estado === 'ocupada' && m.pedidos.length === 0))
        mesasEnEspera.forEach(mesa =>{
          Contenedor= document.createElement('div');
          Contenedor.innerHTML= `
          <div>
            <p class="numero-mesa">`+mesa.nombre+`</p><p class="estado-pedido">`+estado+`</p>
          </div>`
          Contenedor.classList.add("pedido");
          ContenedorPedidos.appendChild(Contenedor);
        })
      }else{
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
              ${pedido.estado !== 'terminado' ? '<button class="terminar-pedido">Terminar pedido</button>' : ''}
              `;
              ContenedorPedido.classList.add("pedido");
              ContenedorPedido.addEventListener('click', () => {
                localStorage.setItem('PedidoSeleccionado',JSON.stringify(pedido));
                navigateTo('/popUpPedido');
              });
              if (pedido.estado !== 'terminado') {
                const btnTerminar = ContenedorPedido.getElementsByTagName('button')[0];
                btnTerminar.addEventListener('click', (event) => {
                    event.stopPropagation();
                    terminarPedido(pedido, mesa);
                });
            }
              ContenedorPedidos.appendChild(ContenedorPedido);
            }
          })
       });
      }
      
    }
    // se cambia el estado de la variable según el botón seleccionado
    let seleccionEstado = 'En espera'
    const btnActivos = container.getElementsByClassName('boton-activo')[0];
    btnActivos.addEventListener('click', ()=> {
      seleccionEstado='activo';
      btnActivos.classList.add('estado-seleccionado');
      btnTerminados.classList.remove('estado-seleccionado');
      btnEnespera.classList.remove('estado-seleccionado');
      pintarPedidos(mesasSector,seleccionEstado);
    })

    const btnTerminados = container.getElementsByClassName('boton-terminado')[0];
    btnTerminados.addEventListener('click', ()=> {
      seleccionEstado='terminado';
      btnTerminados.classList.add('estado-seleccionado');
      btnActivos.classList.remove('estado-seleccionado');
      btnEnespera.classList.remove('estado-seleccionado');
      pintarPedidos(mesasSector,seleccionEstado);
    })

    const btnEnespera = container.getElementsByClassName('boton-espera')[0];
    btnEnespera.classList.add('estado-seleccionado');
    btnEnespera.addEventListener('click', ()=> {
      seleccionEstado='En espera';
      btnEnespera.classList.add('estado-seleccionado');
      btnTerminados.classList.remove('estado-seleccionado');
      btnActivos.classList.remove('estado-seleccionado');
      pintarPedidos(mesasSector,seleccionEstado);
    })

    const Mesas =JSON.parse(localStorage.getItem('Mesas')) || [];

    function terminarPedido(pedido,mesa){
      let index = Mesas.findIndex(m => m.nombre === mesa.nombre);
      if (index !== -1) {
          let indexPedido = Mesas[index].pedidos.findIndex(p => p === pedido) ;
          Mesas[index].pedidos[indexPedido].estado = 'terminado';
          console.log(Mesas[index]);
          localStorage.setItem('Mesas', JSON.stringify(Mesas));
          console.log("se pudo guardar el pedido");
          navigateTo('/pedidos')
        }
    }

    // función para pintar las mesas dependiendo del sector
    let mesasSector;
    function pintarPedidosSector(seleccion){
        mesasSector = Mesas.filter((mesa) => mesa.sector === seleccion);
        pintarPedidos(mesasSector,seleccionEstado);
    };

    // inicialización
    OpcionesSelector(Sectores);
    pintarPedidosSector('Piso 1');
    const tituloPagina = document.getElementsByClassName('titulo-encabezado')[0];
    tituloPagina.innerHTML = 'Pedidos'

    return container;

  }
  
  export default Pedidos;