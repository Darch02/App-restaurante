document.addEventListener("DOMContentLoaded", () => {
    const footerItems = document.querySelectorAll("footer p");

    function actualizarNegrilla(elemento) {
        footerItems.forEach(el => el.classList.remove("bold")); // Elimina negrilla de todos
        elemento.classList.add("bold"); // Agrega negrilla solo al seleccionado
    }

    document.getElementById("icono-pedidos").addEventListener("click", function () {
        document.getElementById("contenido-principal").innerHTML = `
            <select class="selector-sección">
                <option>Piso 1</option>
                <option>Piso 2</option>
            </select>
            <div id="contenedor-pedidos">
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

        actualizarNegrilla(document.querySelector("#icono-pedidos + p")); // Aplica negrilla al texto de "Pedidos"
    });

    document.getElementById("icono-mesas").addEventListener("click", function () {
        document.getElementById("contenido-principal").innerHTML = `
            <select class="selector-sección">
                <option>Piso 1</option>
                <option>Piso 2</option>
            </select>
            <div id="contenedor-mesas">
                <div class="mesa">
                    <img class="img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                    <p>Mesa 1</p>
                </div>
                <div class="mesa">
                    <img class="img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                    <p>Mesa 2</p>
                </div>
                <div class="mesa">
                    <img class="img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                    <p>Mesa 3</p>
                </div>
                <div class="mesa">
                    <img class="img-mesas" src="../src/assets/icono-mesa.svg" alt="imagen mesa"/>
                    <p>Mesa 4</p>
                </div>
            </div>`;

        actualizarNegrilla(document.querySelector("#icono-mesas + p")); // Aplica negrilla al texto de "Mesas"
    });

    document.getElementById("icono-menu").addEventListener("click", function(){
        document.getElementById("contenido-principal").innerHTML = `
        <div class="cajabuscar"><form method="get" id="buscarform">
            <input type="text" id="s" value="" placeholder="Buscar"  />
            <button type="button" class="button">🔍</button> 
        <i class="search"></i>
        </form></div>
<div id="contenedor-categoria">
    <div class="categoria-scroll">
        <button class="categoria">Sopas</button>
        <button class="categoria">Jugos</button>
        <button class="categoria">Carnes</button>
        <button class="categoria">Postres</button>
        <button class="categoria">Desayunos</button>
        <button class="categoria">Almuerzos</button>
        <button class="categoria">Pasta</button>
    </div>
    <div id="contenedor-menu" >
        <div class="menu">
            <div class="producto">
                <img src="orderly/src/assetsimagen-mondongo.jpg" alt="Imagen-producto">
                <h3 class="nombre-producto">Sopa de Mondongo</h3>
                <p class="precio-producto">$23.000</p>
            </div>
        </div>
        <div class="menu">
            <div class="producto">
                <img src="imagenes/producto.jpg" alt="Imagen-producto">
                <h3 class="nombre-producto">Sopa de lentejas</h3>
                <p class="precio-producto">$17.000</p>
            </div>
        </div>
        <div class="menu">
            <div class="producto">
                <img src="imagenes/producto.jpg" alt="Imagen-producto">
                <h3 class="nombre-producto">Sopa de Verduras</h3>
                <p class="precio-producto">$22.000</p>
            </div>
        </div>
        <div class="menu">
            <div class="producto">
                <img src="imagenes/producto.jpg" alt="Imagen-producto">
                <h3 class="nombre-producto">Sopa de Pastas</h3>
                <p class="precio-producto">$22.000</p>
            </div>
        </div>
        <div class="menu">
            <div class="producto">
                <img src="imagenes/producto.jpg" alt="Imagen-producto">
                <h3 class="nombre-producto">Frijoles</h3>
                <p class="precio-producto">$17.000</p>
            </div>
        </div>
        <div class="menu">
            <div class="producto">
                <img src="imagenes/producto.jpg" alt="Imagen-producto">
                <h3 class="nombre-producto">Sancocho</h3>
                <p class="precio-producto">$23.000</p>
            </div>
        </div>
    </div>
</div>`;
        actualizarNegrilla(document.querySelector("#icono-menu + p"));
    });
});




