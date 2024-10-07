<template>
  <header class="hotel-header">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Logo del Hotel -->
      <img src="@/assets/Logo Hotel.png" alt="Logo del Hotel" class="logo" />
      
      <!-- Menú de navegación -->
      <nav class="nav">
        <router-link to="/">Inicio</router-link>
        <router-link to="/habitaciones">Habitaciones</router-link>
        <router-link to="/sobrenosotros">Sobre Nosotros</router-link>
        <router-link to="/ubicacion">Ubicación</router-link>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <router-link v-if="isLoggedIn" @click="logout">Cerrar Sesión</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HotelHeader',
  computed: {
    isLoggedIn() {
      // Verifica si el usuario ha iniciado sesión comprobando el token en localStorage
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    async logout() {
      try {
        // Solicitud para eliminar el token de la base de datos
        await axios.post('http://localhost:3000//api/auth/logout', {
          token: localStorage.getItem('token'), // Envía el token que se quiere eliminar
        });
        // Limpia el token de localStorage y cierra sesión
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Maneja el error, mostrando un mensaje al usuario
      }

      this.$router.push('/'); // Redirige a la página principal o login
    },
  },
};
</script>

<style scoped>
.hotel-header {
  background-color: #002642;
  color: #F5F5F5;
  padding: 10px;
}

/* Estilo para el logo */
.logo {
  max-width: 100px;
}

/* Estilo para la barra de navegación */
.nav {
  display: flex; /* Utiliza flexbox para alinear los elementos */
  justify-content: space-around; /* Espaciado equilibrado entre los elementos */
  list-style-type: none;
  padding: 0;
}

/* Estilo para los enlaces del menú */
.nav a {
  color: #F5F5F5;
  text-decoration: none; /* Elimina el subrayado de los enlaces */
  padding: 0 15px; /* Espaciado horizontal entre las opciones */
}

/* Cambia el color del texto al pasar el ratón por encima */
.nav a:hover {
  text-decoration: underline; /* Subraya el texto al pasar el ratón */
}
</style>