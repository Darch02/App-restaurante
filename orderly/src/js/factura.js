async function Factura(navigateTo) {
    const response = await fetch('/Factura.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    // se obtiene la mesa seleccionada
    const mesaSeleccionada = JSON.parse(localStorage.getItem('MesaSeleccionada'));

    const nombreMesa = container.querySelector('#nombre-mesa');
    nombreMesa.innerHTML= mesaSeleccionada.nombre
    const ContenedorPedidos = container.querySelector('#contenedor-pedidos');

    const contTotal = container.querySelector('#total');
    
    function calcularTotal(mesa) {  
        let total = mesa.pedidos.reduce((acc, item) => {
            let precioNumerico = item.total;
            return acc + precioNumerico;
        }, 0);
  
        // Formatear como moneda y actualizar en el DOM
        contTotal.textContent = `$${total.toLocaleString()}`
    }

    function pintarPedidos(mesa){
        let ContenedorPedido;
        ContenedorPedidos.innerHTML='';
        mesa.pedidos.forEach((pedido,index) => {
            ContenedorPedido= document.createElement('div');
            ContenedorPedido.innerHTML= `
            <div>
                <h3>Id pedido : `+index+`</h3>
                <h3>Alimentos</h3>
                <div class='alimentos'>
                </div>
            </div>
            `;
            
            const listaAlimentos =ContenedorPedido.getElementsByClassName('alimentos')[0];
            let alimento;
            pedido.alimentos.forEach(item =>{
                alimento= document.createElement('div')
                alimento.innerHTML=`
                <p>`+item.nombreProducto+`</p><p>`+item.precio+`</p>
                <p>`+item.cantidad+`</p>
                `
                listaAlimentos.appendChild(alimento);
            })

            ContenedorPedidos.appendChild(ContenedorPedido)
            
        })
    }

    function finalizarPedido(mesa){
        let mesas = JSON.parse(localStorage.getItem('Mesas')) || [];

        let index = mesas.findIndex(m => m.nombre === mesa.nombre);
        if (index !== -1) {
            mesas[index].pedidos= [];
            mesas[index].Estado = 'libre';
            localStorage.setItem('Mesas', JSON.stringify(mesas));
            alert('se ha finalizado el servicio correctamente');
            navigateTo('/mesas');
        }
    }

    const btnFinalizar = container.getElementsByTagName('button')[0];
    btnFinalizar.addEventListener('click', ()=> finalizarPedido(mesaSeleccionada));
    pintarPedidos(mesaSeleccionada);
    calcularTotal(mesaSeleccionada);

    return container
}
export default Factura