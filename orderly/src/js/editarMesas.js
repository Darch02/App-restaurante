async function editarMesas(navigateTo) {
    const response = await fetch('/EditarMesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    // se abre el pop up de añadir mesa al dar click en el icono correspondiente
    const añadir = container.querySelector(".icono-añadir");
    añadir.addEventListener('click', () => navigateTo('/popUpAñadirMesa') );

    
    const ContenedorMesas = container.querySelector('#contenedor-mesas');
    // pinta cada una de las mesas dentro de la variable mesas.
    function pintarMesas(mesas) {
    let ContenedorMesa;
    mesas.forEach(mesa => {
        ContenedorMesa= document.createElement('div');
        ContenedorMesa.innerHTML= `
        <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
        <div>
            <p>`+ mesa.nombre +`</p>
            <img class="icono-editar" src="./src/assets/icono-edit.svg"/>
        </div>`;
        ContenedorMesa.classList.add("mesa");
        ContenedorMesa.addEventListener('click', () => navigateTo('/popUpEditarMesa'));
        ContenedorMesas.appendChild(ContenedorMesa);
    });
   }

   const stringMesas = localStorage.getItem('Mesas'); // se obtienen las mesas del localstorage
   const Mesas =JSON.parse(stringMesas);

    const selector = container.getElementsByClassName("selector-sector")[0];

    // muestra distintas mesas dependiendo del sector
    selector.addEventListener("change", (event) => {
        pintarSector(event.target.value)
    });

    let mesasSector;
    // función para pintar las mesas dependiendo del sector
    function pintarSector(seleccion){
        mesasSector= Mesas.filter((mesa) => mesa.sector === seleccion);
        ContenedorMesas.replaceChildren();
        pintarMesas(mesasSector);
    };

    // inicialización:
    pintarSector("Piso 1");

    return container;
  }
  
  export default editarMesas;