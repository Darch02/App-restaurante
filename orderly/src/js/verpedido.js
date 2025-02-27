async function verpedido(navigateTo) {
    const response = await fetch('/Verpedido.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    return container;
  }
  
  export default verpedido;