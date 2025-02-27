async function Mesas(navigateTo) {
    const response = await fetch('/Mesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado


    // navegación a la página de editar
    const edit= container.getElementsByClassName("icono-editar-grande")[0];
    edit.addEventListener('click',() => {navigateTo('/editarMesas')});

    // Agregar evento a cada mesa
    const mesas = container.querySelectorAll(".mesa");
    mesas.forEach(mesa => {
        mesa.addEventListener('click', () => navigateTo('/menu_aniadir'));
    });

    // navegación al pop up de la mesa
    // const mesa= container.getElementsByClassName('mesa')[0];
    // mesa.addEventListener('click',() => {} );
    return container;
  }
  
  export default Mesas;