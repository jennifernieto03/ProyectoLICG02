<template>
  <div class="habitaciones-container">
    <h2 class="text-center">Habitaciones</h2>

    <!-- Mensaje que se muestra si no hay habitaciones disponibles -->
    <div v-if="habitaciones.length === 0" class="text-center">
      <p>No hay habitaciones disponibles en este momento.</p>
    </div>

    <!-- Contenedor de las habitaciones -->
    <div class="row">
      <!-- Bucle a través de las habitaciones para mostrarlas en tarjetas separadas -->
      <div v-for="habitacion in habitaciones" :key="habitacion.id_habitacion" class="col-md-4 col-sm-6 habitacion-card">
        <div class="card">
          <!-- Imagen de la habitación según su tipo -->
          <img :src="getImagen(habitacion.tipo)" class="card-img-top" alt="Imagen de habitación"/>
          <div class="card-body">
            <!-- Tipo de habitación -->
            <h5 class="card-title">{{ habitacion.tipo }}</h5>
            <!-- Descripción según el tipo de habitación -->
            <p class="card-text">{{ getDescripcion(habitacion.tipo) }}</p>
            <!-- Estado de la habitación -->
            <p class="card-text">Estado: {{ habitacion.estado }}</p>

            <!-- Botón para reservar si la habitación está disponible -->
            <button v-if="habitacion.estado === 'Disponible'" class="btn btn-success" @click="mostrarFormularioReserva(habitacion.id_habitacion)">
              Reservar
            </button>
            <!-- Mensaje si la habitación está reservada -->
            <p v-if="habitacion.estado === 'Reservada'" class="text-danger">Esta habitación ya está reservada.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para realizar la reserva de una habitación -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="isModalVisible = false">&times;</span>
        <h5 class="modal-title">Reservar Habitación</h5>

        <!-- Formulario para ingresar las fechas de reserva -->
        <form @submit.prevent="reservarHabitacion">
          <div class="form-group">
            <label for="fechaInicio">Fecha de Entrada:</label>
            <input type="date" id="fechaInicio" v-model="fechaInicio" class="form-control" required/>
          </div>
          <div class="form-group">
            <label for="fechaFin">Fecha de Salida:</label>
            <input type="date" id="fechaFin" v-model="fechaFin" class="form-control" required/>
          </div>
          <button type="submit" class="btn btn-primary">Confirmar Reserva</button>
        </form>

        <!-- Mensaje de error si ocurre algún problema con la reserva -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      habitaciones: [], // Arreglo para almacenar las habitaciones obtenidas de la API
      isModalVisible: false, // Controla la visibilidad del modal
      idHabitacionReserva: null, // Almacena el ID de la habitación que se quiere reservar
      fechaInicio: '', // Fecha de inicio de la reserva
      fechaFin: '', // Fecha de fin de la reserva
      error: '' // Mensaje de error en caso de que ocurra un problema al reservar
    };
  },
  async created() {
    await this.obtenerHabitaciones(); // Obtiene las habitaciones al cargar la vista
  },
  methods: {
    // Obtiene la lista de habitaciones desde la API
    async obtenerHabitaciones() {
      const response = await axios.get('http://localhost:3000/api/habitaciones/');
      this.habitaciones = response.data;
    },
    // Muestra el formulario para realizar la reserva
    mostrarFormularioReserva(id_habitacion) {
      this.idHabitacionReserva = id_habitacion; // Almacena el ID de la habitación
      this.isModalVisible = true; // Muestra el modal
    },
    // Realiza la reserva de la habitación
    async reservarHabitacion() {
      try {
        // Envía la reserva a la API
        await axios.post('http://localhost:3000/api/reservas/', {
          id_habitacion: this.idHabitacionReserva,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        });
        this.isModalVisible = false; // Oculta el modal
        await this.obtenerHabitaciones(); // Actualiza la lista de habitaciones
      } catch (err) {
        // Muestra el mensaje de error si ocurre un problema con la reserva
        if (err.response && err.response.data) {
          this.error = err.response.data;
        } else {
          this.error = 'Error al reservar, intente de nuevo.';
        }
      }
    },
    // Devuelve la imagen correspondiente según el tipo de habitación
    getImagen(tipo) {
      switch (tipo) {
        case 'Individual':
          return '@/assets/Individual.jpg';
        case 'DobleDC':
          return '@/assets/DobleDC.jpeg';
        case 'DobleUC':
          return '@/assets/DobleUC.jpeg';
        case 'Suite':
          return '@/assets/Suite.jpg';
      }
    },
    // Devuelve la descripción correspondiente según el tipo de habitación
    getDescripcion(tipo) {
      switch (tipo) {
        case 'Individual':
          return 'Una habitación individual ideal para una persona, equipada con todas las comodidades.';
        case 'DobleDC':
          return 'Habitación doble con una cama doble, perfecta para parejas.';
        case 'DobleUC':
          return 'Habitación doble con dos camas individuales, adecuada para amigos o familiares.';
        case 'Suite':
          return 'Una lujosa suite que ofrece un espacio amplio y comodidades de alta gama.';
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para el contenedor principal */
.habitaciones-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Estilos para las tarjetas de las habitaciones */
.habitacion-card {
  margin-bottom: 20px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .habitacion-card {
    margin-bottom: 15px;
  }
}

@media (max-width: 576px) {
  .modal-content {
    width: 95%;
  }
}
</style>