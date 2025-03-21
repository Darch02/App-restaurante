async function PopUpEliminar(navigateTo) {
    const response = await fetch('/PopUpEliminar.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    const Sectores = JSON.parse(localStorage.getItem('sectores')) || [];

    const sectorActual = localStorage.getItem('sectorActual');

    const btnEliminarSector = container.getElementsByClassName('boton-eliminar')[0];
    function EliminarSector(sector){
        let index = Sectores.findIndex(se => se === sector);
        if (index !== -1) {
            Sectores.splice(index,1);
            localStorage.setItem('sectores', JSON.stringify(Sectores));
            alert('el sector se ha eliminado correctamente');
            if (container.parentElement) {
                document.body.removeChild(container.parentElement);
            }
            navigateTo('/mesas')
        }
    }

    btnEliminarSector.addEventListener('click',() =>  EliminarSector(sectorActual));
    return container;
}
export default PopUpEliminar;