import Mesas from "./mesas";
import Pedidos from "./pedidos";

const routes = [
    { path: '/mesas', component: Mesas },
    { path: '/pedidos', component: Pedidos },
];

const root = document.getElementById("contenido-principal");
const defaultRoute = '/mesas';

async function navigateTo(hash) {
    const route = routes.find((routeFound) => routeFound.path === hash);
    
    if (route && route.component) {
      window.history.pushState(
        {},
        route.path,
        window.location.origin + route.path,
      );
  
      if (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      const newComponent = await route.component(); // 🔹 Esperamos la carga del componente
        if (newComponent instanceof Node) {
            root.appendChild(newComponent);
        } else {
            console.error("Error: route.component() no devolvió un nodo válido.");
        }
     }
}

const currentPath = window.location.pathname || defaultRoute;
navigateTo(defaultRoute);
const iconoPedidos = document.getElementById('icono-pedidos')
const iconoMesas = document.getElementById('icono-mesas')

iconoPedidos.addEventListener('click', () => {navigateTo('/pedidos')})
iconoMesas.addEventListener('click',() => {navigateTo('/mesas')})
