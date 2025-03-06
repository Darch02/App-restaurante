async function Menu(navigateTo) {
      const response = await fetch('/Menu.html'); // Carga el HTML externo
      const htmlText = await response.text(); // Convierte la respuesta en texto HTML
      const container = document.createElement('div'); // Crear un contenedor temporal
      container.innerHTML = htmlText.trim(); // Insertar el HTML cargado


      const menu= [{
        nombreProducto: 'Jugo de mora',
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


      localStorage.setItem("menu",JSON.stringify(menu));
      let contenedorMenu = container.querySelector('#contenedor-menu');


      function pintarMenu(menu) {
        let ContenedorItemMenu;
        menu.forEach(item => {
            ContenedorItemMenu= document.createElement('div');
            ContenedorItemMenu.innerHTML= `
                  <div class="producto">
                  <img src="`+ item.imagen +`" alt="Imagen-producto">
                  <h3 class="nombre-producto">`+ item.nombreProducto +`</h3>
                  <p class="precio-producto">`+'$'+ item.precio +`</p>
                  </div>
            `;
            ContenedorItemMenu.classList.add("menu");
            contenedorMenu.appendChild(ContenedorItemMenu);
        });
      }
      
      const MenuString = localStorage.getItem("menu");
      pintarMenu(JSON.parse(MenuString));
      return container;
}
  
  export default Menu;