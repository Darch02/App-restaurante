async function menu_aniadir(navigateTo) {
    const response = await fetch('/Menu_aniadir.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const botonver = container.getElementsByClassName("ver-pedido")[0];
    botonver.addEventListener('click', () => { navigateTo('/verpedido'); });


    return container;
  }
  
  export default menu_aniadir;