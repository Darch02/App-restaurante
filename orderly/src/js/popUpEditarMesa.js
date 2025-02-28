async function PopUpEditarMesa(navigateTo) {
    const response = await fetch('/PopUpEditarMesa.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado
    
    // container.querySelector(".popup-close").addEventListener("click", () => {
    //     document.body.removeChild(container.parentElement);
    //     window.history.back(); // Volver a la pantalla anterior
    // });

    return container;
}
export default PopUpEditarMesa;