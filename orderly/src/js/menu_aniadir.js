async function menu_aniadir(navigateTo) {
    const response = await fetch('/Menu_aniadir.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const botonver = container.getElementsByClassName("ver-pedido")[0];
    botonver.addEventListener('click', () => { navigateTo('/verpedido'); });


    const menuAniadir= [{
      nombreProducto: 'Jugo de uva',
      precio: '7.000',
      categoria: 'Jugos',
      descripcion: 'Jugo en agua de mora sin azucar',
      imagen: './src/assets/imagen-mondongo.jpg',
    },
    {
      nombreProducto: 'Tiramisu',
      precio: '15.000',
      categoria: 'Postres',
      descripcion: 'Postre de chocolate',
      imagen: './src/assets/imagen-mondongo.jpg',
    }];


    localStorage.setItem("menu_aniadir",JSON.stringify(menuAniadir));
    let contenedorMenuAniadir = container.querySelector('#contenedor-menu');


    function pintarMenu(menuAniadir) {
      let ContenedorItemMenuAniadir;
      menuAniadir.forEach(item => {
          ContenedorItemMenuAniadir= document.createElement('div');
          ContenedorItemMenuAniadir.innerHTML= `
                <div class="producto">
                <img src="`+ item.imagen +`" alt="Imagen-producto">
                <h3 class="nombre-producto">`+ item.nombreProducto +`</h3>
                <p class="precio-producto">`+'$'+ item.precio +`</p>
                <button class="add">Añadir</button>
                </div>
          `;
          ContenedorItemMenuAniadir.classList.add("menu_aniadir");
          contenedorMenuAniadir.appendChild(ContenedorItemMenuAniadir);
      });
    }
    
    const MenuString = localStorage.getItem("menu_aniadir");
    pintarMenu(JSON.parse(MenuString));


    //para obtener la mesa seleccionada del pedido a hacer
    let MesaSeleccionada = JSON.parse(localStorage.getItem('MesaSeleccionada'));
    let mesas = JSON.parse(localStorage.getItem('Mesas')) || [];

    const botonesAgregar = container.querySelectorAll('.add');


    botonesAgregar.forEach(boton => {

      boton.addEventListener('click', () => {

        const producto = boton.closest('.producto');
        const nombreAlimento = producto.querySelector('.nombre-producto').textContent;
        const precio = producto.querySelector('.precio-producto').textContent;


        // creacion de la variable alimento

        const nuevoAlimento ={
          alimento: nombreAlimento,
          cantidad: '1',
          precio: precio,
        };

        // busca la mesa seleccionada para saber a cual añadir el pedido

        let mesaIndex =mesas.findIndex(m => m.nombre === MesaSeleccionada.nombre);
        if(mesaIndex !== -1){
          let mesa = mesa[mesaIndex];

          // antes de seguir se debe verificar si ya hay un pedido activo
          let pedidoActivo = mesa.pedidos.find(p => p.estado === 'activo');
          if (!pedidoActivo){

            // si no encuentra un pedido activo crea uno
            pedidoActivo = {alimentos: [], estado: 'activo'};
            mesa.pedidos.push(pedidoActivo);

          }


          // se busca si el alimento ya esta agregado para aumentar su cantidad o añadirlo
          let alimentoExistente = pedidoActivo.alimentos.find(a => a.alimento === nombreAlimento);
          if (alimentoExistente){
            alimentoExistente.cantidad += 1;

          } else{
            pedidoActivo.alimentos.push(nuevoAlimento);
          }

          // actualizacion en localstorage

          mesas[mesaIndex] = mesa;
          localStorage.setItem('Mesa', JSON.stringify(mesas));
          localStorage.setItem('MesaSeleccionada', JSON.stringify(mesa));

          alert('se añadio ${nombreAlimento}');

        }

      });

    });

    // este es el botn para ver el pedido actual
    const verpedido = container.querySelector('.ver-pedido');
    verpedido.addEventListener('click', () => {
      navigateTo('/Pedidos.html'); // se va a los pedidos
    });

    return container;
  }
  
  export default menu_aniadir;
