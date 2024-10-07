<template> 
  <div class="inicio">
    <!-- Carrusel de imágenes -->
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicadores del carrusel -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <!-- Contenedor de las imágenes del carrusel -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="carouselImages[0]" class="d-block w-100 carousel-image" alt="Banner 1">
        </div>
        <div class="carousel-item">
          <img :src="carouselImages[1]" class="d-block w-100 carousel-image" alt="Banner 2">
        </div>
        <div class="carousel-item">
          <img :src="carouselImages[2]" class="d-block w-100 carousel-image" alt="Banner 3">
        </div>
      </div>
      <!-- Controles del carrusel -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- Sección de características -->
    <div class="features row mt-4">
      <div class="col text-center" v-for="feature in features" :key="feature.name">
        <img :src="feature.icon" class="feature-icon" alt="Icono de {{ feature.name }}">
        <p>{{ feature.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InicioVista',
  data() {
    return {
      // Arreglo de imágenes para el carrusel
      carouselImages: [
        require('@/assets/banner1.jpg'),
        require('@/assets/banner2.jpg'),
        require('@/assets/banner3.jpg'),
      ],
      // Características del hotel
      features: [
        { name: 'Pet Friendly', icon: require('@/assets/pet_friendly.png') },
        { name: 'Free Wifi', icon: require('@/assets/wifi.png') },
        { name: 'Piscinas', icon: require('@/assets/piscina.png') },
        { name: 'Room Service', icon: require('@/assets/room_service.png') },
      ],
    };
  },
};
</script>

<style scoped>
.inicio {
  background-color: #f8f9fa;
  padding: 20px; /* Espaciado interno */
  min-height: calc(100vh - 160px);
}

.carousel-inner {
  height: 400px;
}

/* Estilo para las imágenes del carrusel */
.carousel-image {
  width: 100%; /* Asegura que la imagen llene el ancho del contenedor */
  height: 400px; /* Ajusta la altura automáticamente */
  object-fit: cover; /* Asegura que la imagen cubra completamente el contenedor */
}

/* Estilo para la sección de características */
.features {
  margin-top: 20px; /* Espaciado superior */
}

/* Estilo para los iconos de características */
.feature-icon {
  width: 80px; /* Ancho base */
  height: auto; /* Altura automática para mantener la proporción */
  max-width: 100%; /* Permite que la imagen sea responsiva */
}

/* Estilos para los controles del carrusel */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #002642; /* Color de fondo de los controles */
}

.carousel-control-prev,
.carousel-control-next {
  filter: invert(1); /* Invertir el color para mejorar la visibilidad */
}
</style>