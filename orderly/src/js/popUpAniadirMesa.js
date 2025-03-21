import Mesas from "./mesas";

async function PopUpAñadirMesa(navigateTo) {
    const response = await fetch('/PopUpAniadirMesa.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const Mesas = JSON.parse(localStorage.getItem('Mesas')) || [];
    const Sectores = JSON.parse(localStorage.getItem('sectores')) || [];
    // elemento del selector
    const selector = container.getElementsByTagName('select')[0];
   
    function OpcionesSelector(sectores){
    
        // Agregamos los sectores disponibles
        sectores.forEach(sector => {
            const option = document.createElement("option");
            option.value = sector;
            option.textContent = sector;
            selector.appendChild(option);
        });
    
    }
    
    container.getElementsByTagName('form')[0].addEventListener("submit", (e) => {
        e.preventDefault(); // 🔥 Evita la recarga
        let mesaNueva;
        const nombreMesa = document.getElementById("nombre-mesa").value;
        const sector = selector.value;


        const mesaExiste = Mesas.some(mesa => mesa.nombre.toLowerCase() === nombreMesa.toLowerCase());

        if (mesaExiste) {
        alert("El nombre de la mesa ya existe. Por favor, elige otro nombre.");
        return; // Detiene la ejecución para evitar que se agregue la mesa duplicada
        };

        mesaNueva= {
            nombre: nombreMesa,
            Estado: 'libre',
            sector: sector,
            pedidos: []
        }
        Mesas.push(mesaNueva);
        localStorage.setItem('Mesas', JSON.stringify(Mesas));
        alert("la mesa ha sido creada");
        if (container.parentElement) {
            document.body.removeChild(container.parentElement);
        }
        navigateTo('/mesas');
    });
    

    return container;
}
export default PopUpAñadirMesa;