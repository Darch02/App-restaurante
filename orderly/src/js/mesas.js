

async function Mesas(navigateTo) {
    const response = await fetch('/Mesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const edit= container.getElementsByClassName("icono-editar-grande")[0]
;    edit.addEventListener('click',() => {navigateTo('/editarMesas')});

    return container;
  }
  
  export default Mesas;