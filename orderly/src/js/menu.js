async function Menu(navigateTo) {
  const response = await fetch('/Menu.html'); // Carga el HTML externo
  const htmlText = await response.text(); // Convierte la respuesta en texto HTML
  const container = document.createElement('div'); // Crear un contenedor temporal
  container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

  // Definir los productos del menú
  const menu = [
      {
          nombreProducto: 'Jugo de mora',
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

  // Guardar el menú en localStorage
  localStorage.setItem("menu", JSON.stringify(menu));

  let contenedorMenu = container.querySelector('#contenedor-menu');
  let btnsCategoria = container.querySelectorAll('.categoria');

  // Función para pintar productos en el menú
  function pintarMenu(productos) {
      contenedorMenu.innerHTML = ''; // Limpiar antes de renderizar

      productos.forEach(item => {
          let ContenedorItemMenu = document.createElement('div');
          ContenedorItemMenu.innerHTML = `
              <div class="producto">
                  <img src="${item.imagen}" alt="Imagen-producto">
                  <h3 class="nombre-producto">${item.nombreProducto}</h3>
                  <p class="precio-producto">$${item.precio}</p>
              </div>
          `;
          ContenedorItemMenu.classList.add("menu");
          contenedorMenu.appendChild(ContenedorItemMenu);
      });
  }

  // Filtrar por categoría cuando se haga clic en un botón
  btnsCategoria.forEach(boton => {
      boton.addEventListener('click', () => {
          let categoriaSeleccionada = boton.textContent.trim();

          if (categoriaSeleccionada === 'Todos') {
              pintarMenu(menu); // Muestra todo el menú
          } else {
              let productosFiltrados = menu.filter(p => p.categoria === categoriaSeleccionada);
              pintarMenu(productosFiltrados);
          }
      });
  });

  // Obtener el menú almacenado y pintarlo
  const MenuString = localStorage.getItem("menu");
  pintarMenu(JSON.parse(MenuString));

  return container;
}

export default Menu;
