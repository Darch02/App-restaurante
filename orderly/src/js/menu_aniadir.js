async function menu_aniadir(navigateTo) {
  const response = await fetch('/Menu_aniadir.html'); // Carga el HTML externo
  const htmlText = await response.text(); // Convierte la respuesta en texto HTML
  const container = document.createElement('div'); // Crear un contenedor temporal
  container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

  const botonver = container.getElementsByClassName("ver-pedido")[0];
  botonver.addEventListener('click', () => { navigateTo('/verpedido'); });

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

  let pedido_en_proceso = JSON.parse(localStorage.getItem('pedido_en_proceso')) || [];

  function pintarMenu(menuAniadir) {
    contenedorMenuAniadir.innerHTML = ''; // Limpiar antes de renderizar

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
        
        // Crear botón y agregar evento aquí
        let botonAgregar = ContenedorItemMenuAniadir.querySelector('.add');
        botonAgregar.addEventListener('click', () => {
            let producto = menuAniadir[index];

            // Recuperar pedido en proceso de nuevo en caso de que haya cambios recientes
            let pedidoActualizado = JSON.parse(localStorage.getItem('pedido_en_proceso')) || [];

            // Buscar si el producto ya está en el pedido
            let itemExistente = pedidoActualizado.find(p => p.nombreProducto === producto.nombreProducto);
            if (itemExistente) {
                itemExistente.cantidad += 1; // Aumentar cantidad si ya está en el pedido
            } else {
                // Agregar nuevo producto con cantidad inicial 1
                pedidoActualizado.push({ ...producto, cantidad: 1 });
            }

            // Guardar en localStorage para persistencia
            localStorage.setItem('pedido_en_proceso', JSON.stringify(pedidoActualizado));
        });

        contenedorMenuAniadir.appendChild(ContenedorItemMenuAniadir);
    });
}

  // Obtener el menú almacenado y pintarlo
  const MenuString = localStorage.getItem("menu_aniadir");
  pintarMenu(JSON.parse(MenuString));

  return container;
}

export default menu_aniadir;
