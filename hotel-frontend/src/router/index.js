import { createRouter, createWebHistory } from 'vue-router'; // Importa funciones para crear el enrutador y la historia web
import Inicio from '../views/InicioVista.vue';
import Login from '../views/LoginVista.vue';
import Registro from '../views/RegistroVista.vue';
import SobreNosotros from '../views/SobreNosotros.vue';
import Ubicacion from '../views/UbicacionVista.vue';
import Habitaciones from '../views/HabitacionesVista.vue';

// Define las rutas de la aplicación
const routes = [
  { path: '/', component: Inicio }, // Ruta para la vista de inicio
  { path: '/login', component: Login }, // Ruta para la vista de inicio de sesión
  { path: '/registro', component: Registro }, // Ruta para la vista de registro
  { path: '/sobrenosotros', component: SobreNosotros }, // Ruta para la vista "Sobre Nosotros"
  { path: '/ubicacion', component: Ubicacion }, // Ruta para la vista de ubicación
  { path: '/habitaciones', component: Habitaciones, meta: { requiresAuth: true } } // Ruta para la vista de habitaciones
];

// Crea el enrutador con createRouter
const router = createRouter({
  history: createWebHistory(), // Establece el modo de historia web para el enrutador
  routes, // Asigna las rutas definidas
});

// Verificar autenticación antes de acceder a rutas protegidas
router.beforeEach((to, from, next) => {
  // Si la ruta requiere autenticación y no hay token en el localStorage
  if (to.matched.some(record => record.meta.requiresAuth) && !localStorage.getItem('token')) {
    next({ path: '/login' }); // Redirige a la página de login
  } else {
    next();
  }
});

export default router; // Exporta el enrutador configurado