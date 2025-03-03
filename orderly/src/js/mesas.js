async function Mesas(navigateTo) {

    const response = await fetch('/Mesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const mesas= ['1','2','3','4','5' ];
    const ContenedorMesas = container.querySelector('#contenedor-mesas');
    let ContenedorMesa;

   
    mesas.forEach(mesa => {
        ContenedorMesa= document.createElement('div');
        ContenedorMesa.classList.add(".mesa");
        ContenedorMesa.classList.add('#mesa'+ mesa);
        ContenedorMesa.addEventListener('click', () => navigateTo('/menu_aniadir'));
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