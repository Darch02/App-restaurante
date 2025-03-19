import Mesas from "./mesas";
import Pedidos from "./pedidos";
import Menu from "./menu";
import editarMesas from "./editarMesas";
import Menu_aniadir from "./menu_aniadir";
import PopUpMesa from "./popUpMesa";
import verpedido from "./verpedido";
import PopUpDescrMenu from "./popUpDescrMenu";
import PopUpEditarMesa from "./popUpEditarMesa";
import PopUpAniadirMesa from "./popUpAniadirMesa";
import Factura from "./factura";
import PopUpPedido from "./popUpPedido";


window.onload = init;
let root ;
const routes = [
    { path: '/mesas', component: Mesas },
    { path: '/pedidos', component: Pedidos },
    { path: '/menu', component: Menu},
    { path: '/editarMesas', component: editarMesas},
    { path: '/menu_aniadir', component: Menu_aniadir},
    { path: '/popUpMesa', component:PopUpMesa ,isPopup: true },
    { path: '/verpedido', component: verpedido},
    { path: '/popUpEditarMesa', component:PopUpEditarMesa, isPopup: true},
    { path: '/popUpAniadirMesa', component:PopUpAniadirMesa, isPopup:true},
    { path: '/popUpDescrMenu', component:PopUpDescrMenu, isPopup: true},
    { path: '/factura', component:Factura },
    { path: '/popUpPedido', component: PopUpPedido, isPopup:true}
];

function init(){
    root = document.getElementById("contenido-principal");
    const defaultRoute = '/mesas';
    let ruta = window.location.hash.substring(1) || defaultRoute; // Quita el "#" y usa la ruta
    navigateTo(ruta);
}

async function navigateTo(hash,addToHistory = true) {
    const route = routes.find((routeFound) => routeFound.path === hash);
  
    if (route && route.component) {
        if (addToHistory) {
            window.history.pushState({}, route.path, window.location.origin + `#${route.path}`);
          }
  
        if (route.isPopup) {
            abrirPopUp(route);
        } else {
            abrir(route);
        }
    }
}

window.onpopstate = () => {
    cerrarPopUp();
    navigateTo(window.location.hash.substring(1), false);
};

function abrirPopUp(route) {

    const popUpContainer = document.createElement("div");
    popUpContainer.classList.add("popup-container"); // Aplica estilos CSS para el fondo del pop-up
    
    const getcomponet = new Promise((resolve,reject)=>{resolve(route.component(navigateTo));})
    getcomponet.then((newComponent) => {
        if (newComponent instanceof Node) {
            popUpContainer.appendChild(newComponent);
            document.body.appendChild(popUpContainer);
            
            // 🔹 Cerrar pop-up al hacer clic fuera del contenido
            popUpContainer.addEventListener("click", (e) => {
                if (e.target === popUpContainer) {
                    cerrarPopUp();
                    window.history.back(); // Volver a la pantalla anterior
                }
            });
        };
    });
}
function cerrarPopUp() {
    const popUpContainer = document.getElementsByClassName('popup-container')[0];
    if (document.body.contains(popUpContainer)) {
        document.body.removeChild(popUpContainer);
    }
}
function abrir(route){

    if (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    const getcomponet = new Promise((resolve,reject)=>{resolve(route.component(navigateTo));})
    getcomponet.then((newComponent) =>{
        if (newComponent instanceof Node) {
            root.appendChild(newComponent);
        } else {
            console.error("Error: route.component() no devolvió un nodo válido.");
        }
    });
}


const footerItems = document.querySelectorAll('.footer-item');

// Función para cambiar la clase "active" en el footer
function activarFooterItem(elemento) {
    // Remueve la clase "active" de todos los elementos del footer
    footerItems.forEach(item => item.classList.remove('active'));
    // Agrega la clase "active" solo al elemento clicado
    elemento.classList.add('active');
}

// Agrega el evento click a cada ítem del footer
footerItems.forEach(item => {
    item.addEventListener('click', function () {
        activarFooterItem(this);
    });
});

const iconoPedidos = document.getElementById('icono-pedidos')
const iconoMesas = document.getElementById('icono-mesas')
const iconoMenu = document.getElementById('icono-menu')

iconoPedidos.addEventListener('click', () => {navigateTo('/pedidos')})
iconoMesas.addEventListener('click',() => {navigateTo('/mesas')})
iconoMenu.addEventListener('click',() => {navigateTo('/menu')})


