async function menu_aniadir(navigateTo) {
  const response = await fetch('/Menu_aniadir.html'); // Carga el HTML externo
  const htmlText = await response.text(); // Convierte la respuesta en texto HTML
  const container = document.createElement('div'); // Crear un contenedor temporal
  container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

  const botonver = container.getElementsByClassName("ver-pedido")[0];
  botonver.addEventListener('click', () => { navigateTo('/verpedido'); });


  // datos del menu aniadir
  const menuAniadir = [
      {
          nombreProducto: 'Jugo de uva',
          precio: '7.000',
          categoria: 'Jugos',
          descripcion: 'Jugo en agua de mora sin azúcar',
          imagen: './src/assets/imagen-mondongo.jpg',
      },
      {
          nombreProducto: 'Tiramisu',
          precio: '15.000',
          categoria: 'Postres',
          descripcion: 'Postre de chocolate',
          imagen: './src/assets/imagen-mondongo.jpg',
      }
  ];


  localStorage.setItem("menu_aniadir", JSON.stringify(menuAniadir));

  let contenedorMenuAniadir = container.querySelector('#contenedor-menu');
  let botonesCategoria = container.querySelectorAll('.categoria');

  let pedido_en_proceso = JSON.parse(localStorage.getItem('pedido_en_proceso')) || [];

  // funcion para pintar en el contenedor los datos y guardar en la variable los datos de alimento
  function pintarMenu(menuAniadir) {
    contenedorMenuAniadir.innerHTML = ''; 

    menuAniadir.forEach((item, index) => {
        let ContenedorItemMenuAniadir = document.createElement('div');
        ContenedorItemMenuAniadir.innerHTML = `
            <div class="producto">
                <img src="${item.imagen}" alt="Imagen-producto">
                <h3 class="nombre-producto">${item.nombreProducto}</h3>
                <p class="precio-producto">$${item.precio}</p>
                <button class="add">Añadir</button>
            </div>
        `;
        ContenedorItemMenuAniadir.classList.add("menu_aniadir");
        
        // crea el botón y agrega rl evento aquí
        let botonAgregar = ContenedorItemMenuAniadir.querySelector('.add');
        botonAgregar.addEventListener('click', () => {
            let producto = menuAniadir[index];

            // recupera el pedido en proceso de nuevo en caso de que haya cambios recientes
            let pedidoActualizado = JSON.parse(localStorage.getItem('pedido_en_proceso')) || [];

            // condicional para ver si el pedido ya existe y aumentar la cantidad o agregar el item
            let itemExistente = pedidoActualizado.find(p => p.nombreProducto === producto.nombreProducto);
            if (itemExistente) {
                itemExistente.cantidad += 1;
            } else {
                pedidoActualizado.push({ ...producto, cantidad: 1 });
            }
            localStorage.setItem('pedido_en_proceso', JSON.stringify(pedidoActualizado));
        });

        contenedorMenuAniadir.appendChild(ContenedorItemMenuAniadir);
    });
}

botonesCategoria.forEach(boton => {
  boton.addEventListener('click', () => {
      let categoriaSeleccionada = boton.textContent.trim();

      if (categoriaSeleccionada === 'Todos') {
          pintarMenu(menuAniadir); // Muestra todo el menú
      } else {
          let productosFiltrados = menuAniadir.filter(p => p.categoria === categoriaSeleccionada);
          pintarMenu(productosFiltrados);
      }
  });
});

pintarMenu(menuAniadir);

  return container;
}

export default menu_aniadir;
