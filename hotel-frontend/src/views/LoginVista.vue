<template>
  <div class="login-wrapper">
    <!-- Contenedor del formulario de inicio de sesión -->
    <div class="login-container">
      <h2 class="text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login" class="form-center">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nombre" required />
        </div>
        <div class="form-group">
          <label for="contraseña">Contraseña:</label>
          <input type="password" id="contraseña" v-model="contraseña" required />
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        <p>¿No tienes una cuenta? <router-link to="/registro">Regístrate aquí</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

export default {
  name: 'LoginVista',
  data() {
    return {
      nombre: '', // Almacena el nombre del usuario
      contraseña: '', // Almacena la contraseña del usuario
      errorMessage: '', // Almacena mensajes de error si ocurren
    };
  },
  methods: {
    // Método para manejar el inicio de sesión
    async login() {
      try {
        // Realiza la solicitud POST al servidor
        const response = await axios.post('http://localhost:3000//api/auth/login', {
          nombre: this.nombre,
          password: this.contraseña,
        });
        // Almacena el token en el localStorage
        localStorage.setItem('token', response.data.token);
        // Redirige a la vista de habitaciones
        this.$router.push('/habitaciones'); 
      } catch (error) {
        // Muestra un mensaje de error si la solicitud falla
        this.errorMessage = 'Información incorrecta, por favor intenta de nuevo.';
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 60px 20px;
  background-color: #f8f9fa;
}

/* Estilos para el contenedor del formulario */
.login-container {
  max-width: 400px;
  width: 100%;
  padding: 20px; /* Espaciado interno */
  background-color: #002642;
  color: #F5F5F5;
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad */
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

/* Estilos para cada grupo de campos de entrada */
.form-group {
  margin-bottom: 15px;
}

/* Estilos para los campos de entrada */
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Estilos para el efecto de enfoque en los campos de entrada */
input:focus {
  border-color: #007bff; /* Color del borde al enfocar */
  outline: none; /* Sin contorno */
}

/* Estilos para el botón de inicio de sesión */
.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer; /* Cursor de mano al pasar el ratón */
}

/* Estilos para el botón al pasar el ratón */
.btn:hover {
  background-color: #0056b3; /* Color del botón al pasar el ratón */
}

/* Estilo para el mensaje de error */
.text-danger {
  color: red; /* Color para el mensaje de error */
  margin-top: 10px;
}
</style>