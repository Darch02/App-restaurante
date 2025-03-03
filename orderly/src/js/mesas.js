async function Mesas(navigateTo) {

    const response = await fetch('/Mesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    // variable en la cual se guardaría toda la información de las mesas. esto despúes se debe guardar en local storage
    const mesas= [{
        nombre: 'Mesa 1',
        Estado: 'activa',
        sector: 'piso 1',
        pedidos: [{
            alimentos:[],
            estado: 'activo'
        }]
    },
    {
        nombre: 'Mesa 2',
        Estado: 'activa',
        sector: 'piso 2',
        pedidos: [{
            alimentos:[],
            estado: 'activo'
        }]
    }];
    const ContenedorMesas = container.querySelector('#contenedor-mesas');
    let ContenedorMesa;

   // pinta cada una de las mesas dentro de la variable mesas.
    mesas.forEach(mesa => {
        ContenedorMesa= document.createElement('div');
        ContenedorMesa.innerHTML= `
        <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
        <p>`+ mesa.nombre + `</p>
    `
        ContenedorMesa.classList.add("mesa");
        ContenedorMesa.id = `mesa-${mesa}`;
        ContenedorMesa.addEventListener('click', () => navigateTo('/menu_aniadir')); // la navegación del click debe cambiar segun el estado de la mesa
        ContenedorMesas.appendChild(ContenedorMesa);
    });


    // navegación a la página de editar
    const edit= container.getElementsByClassName("icono-editar-grande")[0];
    edit.addEventListener('click',() => navigateTo('/editarMesas'));


    // const mesas = container.querySelectorAll(".mesa");
    // mesas.forEach(mesa => {
    //     mesa.addEventListener('click', () => navigateTo('/popUpMesa'));
    // });

    return container;
  }
  
  export default Mesas;