async function PopUpAniadirSector(navigateTo) {
    const response = await fetch('/PopUpAniadirSector.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const Sectores = JSON.parse(localStorage.getItem('sectores')) || [];

    container.getElementsByTagName('form')[0].addEventListener("submit", (e) => {
        e.preventDefault(); // 🔥 Evita la recarga
        let sectorNuevo;
        const nombreSector = document.getElementById("nombre-sector").value;

        const sectorExiste = Sectores.some(sector => sector.toLowerCase() === nombreSector.toLowerCase());

        if (sectorExiste) {
        alert("El nombre del sector ya existe. Por favor, elige otro nombre.");
        return; // Detiene la ejecución para evitar que se agregue la mesa duplicada
        };
        sectorNuevo = nombreSector;
        Sectores.push(sectorNuevo);
        localStorage.setItem('sectores', JSON.stringify(Sectores));
        alert("El sector ha sido creado");
        if (container.parentElement) {
            document.body.removeChild(container.parentElement);
        }
        navigateTo('/mesas');
    });
    return container;
}
export default PopUpAniadirSector;