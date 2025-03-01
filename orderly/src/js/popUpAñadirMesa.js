async function PopUpAñadirMesa(navigateTo) {
    const response = await fetch('/PopUpAñadirMesa.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado
    
    container.getElementsByTagName('form')[0].addEventListener("submit", (e) => {
        e.preventDefault(); // 🔥 Evita la recarga
    });
    

    return container;
}
export default PopUpAñadirMesa;