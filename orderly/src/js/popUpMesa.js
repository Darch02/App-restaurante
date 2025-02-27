async function PopUpMesa(navegateTo) {
    const response = await fetch('/PopUpMesa.html'); // Carga el HTML externo
    const htmlText = await response.text(); // Convierte la respuesta en texto HTML
    const container = document.createElement('div'); // Crear un contenedor temporal
    container.innerHTML = htmlText.trim(); // Insertar el HTML cargado

    function openModal(id) {
        document.getElementById(id).classList.add('open');
        document.body.classList.add('jw-modal-open');
    }
    
    // close currently open modal
    function closeModal() {
        document.querySelector('popUp1').classList.remove('open');
        document.body.classList.remove('jw-modal-open');
    }
    
    window.addEventListener('load', function() {
        // close modals on background click
        document.addEventListener('click', event => {
            if (event.target.classList.contains('jw-modal')) {
                PopUpMesa.closeModal();
            }
        });
    })
    return container;
  return container;
}
export default PopUpMesa;