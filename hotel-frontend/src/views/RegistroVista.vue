<template>
  <!-- Contenedor principal que ocupa todo el espacio del cuerpo -->
  <div class="registro-wrapper">
    <!-- Contenedor del formulario de registro -->
    <div class="registro-container">
      <h2 class="text-center">Registro</h2>
      <form @submit.prevent="registrarUsuario" class="registro-form">
        <!-- Campo para ingresar el nombre -->
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nombre" class="form-control" required />
        </div>
        <!-- Campo para ingresar el correo -->
        <div class="form-group">
          <label for="correo">Correo:</label>
          <input type="email" id="correo" v-model="correo" class="form-control" required />
        </div>
        <!-- Campo para ingresar la contraseña -->
        <div class="form-group">
          <label for="contraseña">Contraseña:</label>
          <input type="password" id="contraseña" v-model="contraseña" class="form-control" required />
        </div>
        <!-- Botón para registrarse -->
        <button type="submit" class="btn btn-primary">Registrarse</button>
      </form>

      <!-- Enlace para iniciar sesión si ya tiene una cuenta -->
      <p class="text-center">
        ¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
      </p>

      <!-- Mostrar mensaje de error si existe -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

export default {
  data() {
    return {
      nombre: '', // Almacena el nombre del usuario
      correo: '', // Almacena el correo del usuario
      contraseña: '', // Almacena la contraseña del usuario
      error: '', // Almacena el mensaje de error si ocurre
    };
  },
  methods: {
    // Método para manejar el registro de usuarios
    async registrarUsuario() {
      try {
        // Realiza la solicitud POST para registrar un nuevo usuario
        await axios.post('http://localhost:3000//api/auth/registro', {
          nombre: this.nombre,
          correo: this.correo,
          password: this.contraseña,
        });
        // Redirige a la página de inicio de sesión tras el registro exitoso
        this.$router.push('/login');
      } catch (error) {
        // Muestra el mensaje de error si ocurre un problema durante el registro
        this.error = error.response.data.error || 'Error al registrar. Intente nuevamente.';
      }
    },
  },
};
</script>

<style scoped>
.registro-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 60px 20px;
  background-color: #f8f9fa;
}

/* Estilos para el contenedor del formulario */
.registro-container {
  max-width: 400px;
  width: 100%;
  padding: 20px; /* Espaciado interno */
  background-color: #002642;
  color: #F5F5F5;
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
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
  border: 1px solid #ccc; /* Borde ligero */
  border-radius: 4px;
}

/* Efecto de enfoque en los campos de entrada */
input:focus {
  border-color: #007bff; /* Cambia el color del borde cuando se enfoca */
  outline: none;
}

/* Estilos para el botón de registro */
.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer; /* Cambia el cursor a una mano */
}

/* Cambia el color del botón cuando se pasa el ratón */
.btn:hover {
  background-color: #0056b3; /* Color más oscuro al pasar el ratón */
}

/* Estilos para el mensaje de error */
.alert-danger {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
}
</style>