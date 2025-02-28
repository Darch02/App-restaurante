async function editarMesas(navigateTo) {
    const response = await fetch('/EditarMesas.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const mesas = container.querySelectorAll(".mesa");
    mesas.forEach(mesa => {
        mesa.addEventListener('click', () => navigateTo('/popUpEditarMesa'));
    });

    return container;
  }
  
  export default editarMesas;