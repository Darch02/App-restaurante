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
        imagen: './src/assets/jugo-de-mora.png',
    },
    {
        nombreProducto: 'Cazuela de frijoles',
        precio: '22.000',
        categoria: 'Sopas',
        descripcion: 'Deliciosa sopa de frijoles con ripio de papa, maiz, chicharron y adiciones al gusto',
        imagen: './src/assets/cazuela-de-frijoles.jpg',
    },
    {
        nombreProducto: 'Asado de pollo',
        precio: '30.000',
        categoria: 'Carnes',
        descripcion: 'Asado 300gr de pollo acompañado de ensalada, papas a la francesa y arepa de queso',
        imagen: './src/assets/asado-de-pollo.png',
    },
    {
        nombreProducto: 'Almuerzo del dia',
        precio: '18.000',
        categoria: 'Almuerzo',
        descripcion: 'Acompañado de la sopa y el jugo del día',
        imagen: './src/assets/almuerzo-del-dia.jpg',
    },
    {
        nombreProducto: 'Desayuno del dia',
        precio: '18.000',
        categoria: 'Desayuno',
        descripcion: 'Acompañado de chocolate o cafe y huevos al gusto',
        imagen: './src/assets/desayuno-del-dia.jpg',
    },
    {
        nombreProducto: 'Pasta a la bolognesa',
        precio: '15.000',
        categoria: 'Pasta',
        descripcion: 'Postre de chocolate',
        imagen: './src/assets/pasta-bolognesa.jpg',
    },
    {
        nombreProducto: 'Sopa de lentejas',
        precio: '15.000',
        categoria: 'Sopas',
        descripcion: 'Deliciosa sopa de lentejas, acompañado de arroz y aguacate',
        imagen: './src/assets/sopa-de-lentejas.jpg',
    },
    {
        nombreProducto: 'Sopa de pasta',
        precio: '15.000',
        categoria: 'Sopas',
        descripcion: 'Deliciosa sopa de pastas, acompañado de arroz y aguacate',
        imagen: './src/assets/sopa-de-pasta.jpg',
    },
    {
        nombreProducto: 'Pasta con champiñones',
        precio: '28.000',
        categoria: 'Pasta',
        descripcion: 'Pasta con salsa de la casa y champiñones, acompañado de queso parmesano',
        imagen: './src/assets/pasta-con-champinones.jpg',
    },
    {
        nombreProducto: 'Jugo de mango',
        precio: '7.000',
        categoria: 'Jugos',
        descripcion: 'Jugo de mango en agua sin azúcar',
        imagen: './src/assets/jugo-de-mango.png',
    },
    {
        nombreProducto: 'Jugo de maracuya',
        precio: '7.000',
        categoria: 'Jugos',
        descripcion: 'Jugo de maracuyá en agua sin azúcar',
        imagen: './src/assets/jugo-de-maracuya.jpg',
    },
    {
        nombreProducto: 'Asado de cerdo',
        precio: '32.000',
        categoria: 'Carnes',
        descripcion: 'Asado de cerdo 300gr acompañado de papas a la francesa, ensalada y arepa de queso',
        imagen: './src/assets/asado-de-cerdo.jpg',
    },
    {
        nombreProducto: 'Sopa de verduras',
        precio: '15.000',
        categoria: 'Sopas',
        descripcion: 'Sopa de verduras acompañado de arroz y aguacate',
        imagen: './src/assets/sopa-de-verduras.jpg',
    },
    {
        nombreProducto: 'Tiramisú',
        precio: '15.000',
        categoria: 'Postres',
        descripcion: 'Rico postre de chocolate y tres leches',
        imagen: './src/assets/tiramusi.jpg',
    },

  ];

  // Guardar el menú en localStorage
  localStorage.setItem("menu", JSON.stringify(menu));

  let contenedorMenu = container.querySelector('#contenedor-menu');
  let btnsCategoria = container.querySelectorAll('.categoria');
  let inputBuscar = container.querySelector('#s');

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

          ContenedorItemMenu.addEventListener('click', () => {
            navigateTo('/popUpDescrMenu');
        }); 

          ContenedorItemMenu.classList.add("menu");

          // Guardar el producto seleccionado en localStorage y abrir el pop-up
          ContenedorItemMenu.addEventListener('click', () => {
            localStorage.setItem("productoSeleccionado", JSON.stringify(item)); // Guardar el producto clicado
            navigateTo('/popUpDescrMenu'); // Navegar al pop-up
        });
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

  // Función de búsqueda por nombre del producto
  inputBuscar.addEventListener('input', () => {
    let textoBusqueda = inputBuscar.value.trim().toLowerCase(); // Convertir texto a minúsculas
    let productosFiltrados = menu.filter(p => 
        p.nombreProducto.toLowerCase().includes(textoBusqueda)
    );
    pintarMenu(productosFiltrados);
});

  // Obtener el menú almacenado y pintarlo
  const MenuString = localStorage.getItem("menu");
  pintarMenu(JSON.parse(MenuString));

  return container;
}

export default Menu;
