document.getElementById("icono-pedidos").addEventListener("click", function() {
    document.getElementById("contenido-principal").innerHTML = `
    <select class= "selector-sección">
    <option>Piso 1</option>
    <option>Piso 2</option>
    </select>
    <div id="contenedor-pedidos" >
        <div class="pedido">
            <div>
                <p class="numero-mesa">Mesa 1</p><p class="estado-pedido">Activo</p>
            </div>
            <p>descripción pedido</p>
            <button>terminar pedido</button>
        </div>
        <div class="pedido">
            <div>
                <p class="numero-mesa">Mesa 2</p><p class="estado-pedido">Activo</p>
            </div>
            <p>descripción pedido</p>
            <button>terminar pedido</button>
        </div>
        <div class="pedido">
            <div>
                <p class="numero-mesa">Mesa 3</p><p class="estado-pedido">Activo</p>
            </div>
            <p>descripción pedido</p>
            <button>terminar pedido</button>
        </div>
        <div class="pedido">
            <div>
                <p class="numero-mesa">Mesa 4</p><p class="estado-pedido">Activo</p>
            </div>
            <p>descripción pedido</p>
            <button>terminar pedido</button>
        </div>
    </div>`; 
});

document.getElementById("icono-mesas").addEventListener("click", function() {
    document.getElementById("contenido-principal").innerHTML = `
        <select class= "selector-sección">
            <option>Piso 1</option>
            <option>Piso 2</option>
        </select>
        <div id="contenedor-mesas">
            <div class="mesa">
                <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                <p>Mesa 1</p>
            </div>
            <div class="mesa">
                <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                <p>Mesa 2</p>
            </div>
            <div class="mesa">
                <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                <p>Mesa 3</p>
            </div>
            <div class="mesa">
                <img class= "img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                <p>Mesa 4</p>
            </div>
        </div>`
});