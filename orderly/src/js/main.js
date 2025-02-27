import Mesas from "./mesas";
import Pedidos from "./pedidos";
import Menu from "./menu";
import editarMesas from "./editarMesas";
import menu_aniadir from "./menu_aniadir";
import PopUpMesa from "./popUpMesa";
import verpedido from "./verpedido";

const routes = [
    { path: '/mesas', component: Mesas },
    { path: '/pedidos', component: Pedidos },
    { path: '/menu', component: Menu},
    { path: '/editarMesas', component: editarMesas},
    { path: '/menu_aniadir', component: menu_aniadir},
    { path: '/popUpMesa', component:PopUpMesa ,isPopup: true },
    { path: '/verpedido', component: verpedido},
];

const root = document.getElementById("contenido-principal");
const defaultRoute = '/mesas';

async function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);
  
  if (route && route.component) {
      window.history.pushState({}, route.path, window.location.origin + route.path);
      
      if (route.isPopup) {
          // 🔹 Manejar como pop-up
          const popUpContainer = document.createElement("div");
          popUpContainer.classList.add("popup-container"); // Aplica estilos CSS para el fondo del pop-up
          
          const newComponent = await route.component(navigateTo);
          if (newComponent instanceof Node) {
              popUpContainer.appendChild(newComponent);
              document.body.appendChild(popUpContainer);
              
              // 🔹 Cerrar pop-up al hacer clic fuera del contenido
              popUpContainer.addEventListener("click", (e) => {
                  if (e.target === popUpContainer) {
                      document.body.removeChild(popUpContainer);
                      window.history.back(); // Volver a la pantalla anterior
                  }
              });
          }
      } else {
          // 🔹 Pantallas normales (no pop-ups)
          if (root.firstChild) {
              root.removeChild(root.firstChild);
          }
          const newComponent = await route.component(navigateTo);
          if (newComponent instanceof Node) {
              root.appendChild(newComponent);
          } else {
              console.error("Error: route.component() no devolvió un nodo válido.");
          }
      }
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

const currentPath = window.location.pathname || defaultRoute;
navigateTo(defaultRoute);
const iconoPedidos = document.getElementById('icono-pedidos')
const iconoMesas = document.getElementById('icono-mesas')
const iconoMenu = document.getElementById('icono-menu')


iconoPedidos.addEventListener('click', () => {navigateTo('/pedidos')})
iconoMesas.addEventListener('click',() => {navigateTo('/mesas')})
iconoMenu.addEventListener('click',() => {navigateTo('/menu')})
