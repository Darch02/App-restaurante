async function Mesas(navigateTo) {

    const response = await fetch('/Mesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    // variable en la cual se guardaría toda la información de las mesas. esto despúes se debe guardar en local storage
    const mesas= [{
        nombre: 'Mesa 1',
        Estado: 'libre',
        sector: 'Piso 1',
        pedidos: []
    },
    {
        nombre: 'Mesa 2',
        Estado: 'ocupada',
        sector: 'Piso 1',
        pedidos: [{
            alimentos:[],
            estado: 'activo'
        }]
    },
    {
        nombre: 'Mesa 3',
        Estado: 'ocupada',
        sector: 'Piso 2',
        pedidos: [{
            alimentos:[],
            estado: 'activo'
        }]
    }];
   
    //localStorage.setItem("Mesas",JSON.stringify(mesas)); // se guarda en localstorage

    /* todo el codigo anterior comentado es en el que se guardan las variables iniclamente. como ya las guardé una vez en en local storage
    no lo tengo que volver a hacer, ya que el almacenamieto es persistente*/
    
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
            ContenedorMesa.addEventListener('click', () => {
                navigateTo('/popUpMesa');
                localStorage.setItem('MesaSeleccionada', JSON.stringify(mesa)); // guarda la mesa seleccionada en en localstorage
            }); 
        }else{
            ContenedorMesa.addEventListener('click', () => {
                navigateTo('/menu_aniadir');
                localStorage.setItem('MesaSeleccionada', JSON.stringify(mesa)); // guarda la mesa seleccionada en en localstorage
            }); // la navegación del click debe cambiar segun el estado de la mesa
        }
        ContenedorMesa.id = `mesa-${mesa}`;
        ContenedorMesas.appendChild(ContenedorMesa);
    });
   }

   const stringMesas = localStorage.getItem('Mesas'); // se obtienen las mesas del localstorage
   const Mesas =JSON.parse(stringMesas);

    // navegación a la página de editar
    const edit= container.getElementsByClassName("editar")[0];
    edit.addEventListener('click',() => navigateTo('/editarMesas'));

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
  
  export default Mesas;