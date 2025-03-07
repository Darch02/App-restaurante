async function PopUpMesa(navigateTo) {
    const response = await fetch('/PopUpMesa.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado
    
    // container.querySelector(".popup-close").addEventListener("click", () => {
    //     document.body.removeChild(container.parentElement);
    //     window.history.back(); // Volver a la pantalla anterior
    // });

    // se pinta el numero de la mesa
    const MesaActual = JSON.parse(localStorage.getItem('MesaSeleccionada')) || {};
    const Mesas = JSON.parse(localStorage.getItem('Mesas')) || [];
    const tituloMesa = container.getElementsByTagName('h1')[0];
    tituloMesa.innerHTML= MesaActual.nombre;

    // funcionalidad del botón de añadir pedido
    const btnAñadirPedido = container.querySelector("#añadir-pedido");
    btnAñadirPedido.addEventListener('click', () => {
        if (container.parentElement) {
            document.body.removeChild(container.parentElement);
        }
        navigateTo('/menu_aniadir');
    });

    const btnFinalizarServicio = container.querySelector('#finalizar-servicio');
    btnFinalizarServicio.addEventListener('click', () => {
        if (container.parentElement) {
            document.body.removeChild(container.parentElement);
        }
        navigateTo('/factura');
    });

    const btnEliminarMesa = container.querySelector('#eliminar-mesa')
    btnEliminarMesa.addEventListener('click', ()=>{
        let index = Mesas.findIndex(m => m.nombre === MesaActual.nombre);
        if (index !== -1) {
            Mesas.splice(index,1);
            localStorage.setItem('Mesas', JSON.stringify(Mesas));
            alert('la mesa se ha eliminado correctamente');
            if (container.parentElement) {
                document.body.removeChild(container.parentElement);
            }
            navigateTo('/mesas')
        }
    });

    return container;
}
export default PopUpMesa;