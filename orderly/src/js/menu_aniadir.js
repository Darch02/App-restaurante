async function menu_aniadir(navegateTo) {
    const response = await fetch('/Menu_aniadir.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    return container;
  }
  
  export default menu_aniadir;