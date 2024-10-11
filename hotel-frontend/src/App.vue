<template>
  <div id="app">
    <HotelHeader />
    <router-view />
    <HotelFooter />
  </div>
</template>

<script>
import HotelHeader from './components/HotelHeader.vue'; // Importa lo componentes
import HotelFooter from './components/HotelFooter.vue';

export default {
  name: 'App', // Define el nombre del componente
  components: {
    HotelHeader, // Registra los componentes
    HotelFooter
  }
};
</script>