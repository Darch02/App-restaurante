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

    function pintarBotones(){
        const contenedorBtns = container.querySelector('#contenedor-botones-mesa');
        if(MesaActual.Estado === 'ocupada'){
            contenedorBtns.innerHTML = `
            <button id = 'añadir-pedido' class= "boton-negro">Añadir nuevo pedido</button>
            <button id = 'finalizar-servicio' class= "boton-negro">Finalizar servicio</button>
            `
            const btnAñadirPedido = contenedorBtns.querySelector("#añadir-pedido");
            btnAñadirPedido.addEventListener('click', () => {
                if (container.parentElement) {
                    document.body.removeChild(container.parentElement);
                }
                navigateTo('/menu_aniadir');
            });
            const btnFinalizarServicio = contenedorBtns.querySelector('#finalizar-servicio');
            btnFinalizarServicio.addEventListener('click', () => {
                if (container.parentElement) {
                    document.body.removeChild(container.parentElement);
                }
                navigateTo('/factura');
            });
        }else{
            contenedorBtns.innerHTML = `
            <button id = 'comenzar-servicio' class= "boton-negro">Comenzar servicio</button>
            <button id = 'eliminar-mesa' class= "boton-negro">Eliminar mesa</button>
            `
            const btnEliminarMesa = contenedorBtns.querySelector('#eliminar-mesa');
            btnEliminarMesa.addEventListener('click', ()=>EliminarMesa());
            const btnComenzarServicio = contenedorBtns.querySelector('#comenzar-servicio');
            btnComenzarServicio.addEventListener('click', ()=> ComenzarServicio());
        }
    }
    // funcionalidad del botón de añadir pedido
    

    function EliminarMesa(){
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
    }

    function ComenzarServicio(){
        let index = Mesas.findIndex(m => m.nombre === MesaActual.nombre);
        if (index !== -1) {
            Mesas[index].Estado = 'ocupada';
            localStorage.setItem('Mesas', JSON.stringify(Mesas));
            if (container.parentElement) {
                document.body.removeChild(container.parentElement);
            }
            alert('se ha cambiado el estado de la mesa');
            navigateTo('/mesas');
        }
    }
    
    pintarBotones();
    
    return container;
}
export default PopUpMesa;