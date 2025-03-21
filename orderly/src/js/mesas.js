async function Mesas(navigateTo) {

    const response = await fetch('/Mesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const Sectores = JSON.parse(localStorage.getItem('sectores')) || [];

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
    
        const optionAniadir = document.createElement("option");
        optionAniadir.value = "Añadir sector ..";
        optionAniadir.textContent = "Añadir sector ..";

        selector.appendChild(optionAniadir);

        selector.addEventListener("change", (event) => {
            if(event.target.value !== 'Añadir sector ..'){
                pintarSector(event.target.value);
            }else{
                navigateTo('/popUpAniadirSector');
            }
        });
    
    }
    
    const ContenedorMesas = container.querySelector('#contenedor-mesas');
   // pinta cada una de las mesas dentro de la variable mesas.
   function pintarMesas(mesas) {
    let ContenedorMesa;
    mesas.forEach(mesa => {
        ContenedorMesa= document.createElement('div');
        ContenedorMesa.innerHTML= `
        <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
        <p>`+ mesa.nombre + `</p>
        `;
        
        ContenedorMesa.classList.add("mesa");

        if(mesa.Estado == 'ocupada'){
            ContenedorMesa.classList.add('mesa-ocupada'); // si esta ocupada, cambia el estilo del contenedor
        }else{
            ContenedorMesa.classList.remove('mesa-ocupada');
        }
        ContenedorMesa.addEventListener('click', () => {
            navigateTo('/popUpMesa');
            localStorage.setItem('MesaSeleccionada', JSON.stringify(mesa)); // guarda la mesa seleccionada en en localstorage
            localStorage.setItem("pedido_en_proceso",JSON.stringify(pedido_en_proceso)); // el pedido en curso se pone vacio
        }); 
        ContenedorMesa.id = `mesa-${mesa}`;
        ContenedorMesas.appendChild(ContenedorMesa);
    });
   }

    const stringMesas = localStorage.getItem('Mesas'); // se obtienen las mesas del localstorage
    const Mesas =JSON.parse(stringMesas) || [];

    let mesasSector;
    // función para pintar las mesas dependiendo del sector
    function pintarSector(seleccion){
        mesasSector= Mesas.filter((mesa) => mesa.sector === seleccion);
        ContenedorMesas.replaceChildren();
        pintarMesas(mesasSector);
    };

    // navegación pop up añadir mesa
    const aniadir_mesa= container.getElementsByClassName("aniadir")[0];
    aniadir_mesa.addEventListener('click',() => navigateTo('/popUpAniadirMesa'));

    // navegación al pup up eliminar sector
    const eliminar_sector = container.getElementsByClassName("eliminar-sector")[0];
    eliminar_sector.addEventListener('click',() => navigateTo('/popUpEliminar'));

    // inicialización:
    function init(){
        OpcionesSelector(Sectores);
        if( Sectores.length === 0){
            ContenedorMesas.innerHTML='No hay sector seleccionado';
            // si no hay sectores creados estos botones no se deberían ver
            aniadir_mesa.style.display = 'none'
            eliminar_sector.style.display = 'none'
        }else{
            
            aniadir_mesa.style.display = 'flex'
            eliminar_sector.style.display = 'inline'

            // muestra distintas mesas dependiendo del sector
            pintarSector(Sectores[0]);
        }
        const tituloPagina = document.getElementsByClassName('titulo-encabezado')[0];
        tituloPagina.innerHTML = 'Mesas'
    }
    init();
    return container;
  }
  
  export default Mesas;

  