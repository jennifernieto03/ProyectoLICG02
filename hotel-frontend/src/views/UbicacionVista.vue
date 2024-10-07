<template>
  <div class="ubicacion container-fluid d-flex align-items-center justify-content-center">
    <!-- Contenedor principal para la vista de ubicación -->
    <div class="row w-100">
      <h2 class="text-center w-100">Ubicación</h2>

      <!-- Columna del mapa -->
      <div class="col-md-6">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9949723276465!2d-89.20655048447084!3d13.707636221207496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6341d6b1ff3589%3A0xc7e0a9f15e80d1c2!2sBoulevard%20del%20Hip%C3%B3dromo%2C%20San%20Salvador%2C%20El%20Salvador!5e0!3m2!1ses-419!2sus!4v1634873005245!5m2!1ses-419!2sus" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>

      <!-- Columna con información -->
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h4>¿Dónde encontrarnos?</h4>
        <p>
          San Salvador, San Salvador sobre el Boulevard del Hipódromo en la colonia San Benito.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UbicacionVista'
};
</script>

<style scoped>
.ubicacion {
  background-color: #F5F5F5;
  color: #002642;
  padding: 20px;
  height: calc(100vh - 100px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Estilo para el título */
h2 {
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}

/* Estilo para el mapa */
iframe {
  height: 450px;
}

/* Estilo para el texto */
h4 {
  margin-top: 15px;
}

p {
  line-height: 1.6;
}

/* Para alinear verticalmente el texto en su contenedor */
.col-md-6.d-flex {
  height: 100%;
}
</style>