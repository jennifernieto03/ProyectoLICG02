<template>
  <footer class="footer">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 d-flex justify-content-between">
          <div class="social">
            <img src="@/assets/instagram.png" alt="Instagram" class="icon" />
            <span>Instagram: @hotel_solaris</span>
          </div>
          <div class="social">
            <img src="@/assets/facebook.png" alt="Facebook" class="icon" />
            <span>Facebook: Hotel Solaris</span>
          </div>
          <div class="social">
            <img src="@/assets/whatsapp.png" alt="WhatsApp" class="icon" />
            <span>WhatsApp: +503 7777-7777</span>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <img src="@/assets/Logo Hotel.png" alt="Hotel Solaris" class="logo-footer" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'HotelFooter',
};
</script>

<style scoped>
.footer {
  background-color: #002642;
  color: #F5F5F5;
  padding: 20px 0; /* Espaciado superior e inferior */
  position: relative; /* Para asegurar que el footer esté siempre en la parte inferior */
  bottom: 0; /* Asegura que esté anclado al fondo */
  width: 100%;
}

.social {
  display: flex;
  align-items: center;
  margin: 0 20px; /* Espacio uniforme a la izquierda y derecha */
}

.social:not(:last-child) {
  margin-right: 40px; /* Espacio adicional entre las redes sociales */
}

.icon {
  max-width: 100%; /* Permite que la imagen sea responsiva */
  height: auto;
  width: 40px; /* Tamaño base de la imagen */
  margin-right: 10px; /* Espacio entre el icono y el texto */
}

.logo-footer {
  width: 150px;
}

span {
  font-size: 1rem; 
  color: #F5F5F5;
}
</style>