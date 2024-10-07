<template>
  <div class="sobre-nosotros container mt-4">
    <h2 class="text-center">Sobre Nosotros</h2>

    <div class="row mt-4 align-items-stretch">
      <!-- Columna izquierda con información -->
      <div class="col-md-6 d-flex flex-column justify-content-between">
        <div>
          <h3>Sobre nosotros:</h3>
          <p>
            Ven y descubre por qué Hotel Solaris es más que un lugar para quedarse, más bien es tu hogar lejos de casa.
          </p>
          
          <h4>Nuestra Misión:</h4>
          <p>
            En Hotel Solaris, nos comprometemos a brindar una estancia que supere las expectativas de nuestros huéspedes. 
            Nos esforzamos por ofrecer un servicio personalizado y atento, creando un ambiente acogedor y relajante en el que cada detalle cuenta.
          </p>
          
          <h4>Nuestra Visión:</h4>
          <p>
            Hotel Solaris nació con la visión de crear un espacio donde la hospitalidad y el confort se encuentren con la sofisticación. 
            Inspirados en la belleza natural y la rica cultura de nuestra ubicación, cada rincón del hotel ha sido diseñado para reflejar una experiencia única y auténtica.
          </p>

          <h4>Nuestros Valores:</h4>
          <ul>
            <li>Excelencia</li>
            <li>Hospitalidad</li>
            <li>Sostenibilidad</li>
          </ul>
          
          <h4>¿Por qué elegirnos?</h4>
          <p>
            <strong>Ubicación Privilegiada:</strong> Situados cerca de las principales atracciones de la ciudad, ofrecemos la combinación perfecta entre accesibilidad y tranquilidad.<br>
            <strong>Amenidades de Primera Clase:</strong> Desde nuestras habitaciones lujosamente equipadas hasta nuestro restaurante gourmet y spa de vanguardia, cada aspecto de Hotel Solaris está diseñado para su comodidad y disfrute.<br>
            <strong>Atención Personalizada:</strong> Nuestro equipo está siempre disponible para atender cualquier solicitud, asegurándose de que cada huésped se sienta especial y bienvenido.
          </p>
        </div>
      </div>

      <!-- Columna derecha con imágenes -->
      <div class="col-md-6 d-flex flex-column justify-content-between">
        <img src="@/assets/habitacion.jpg" class="img-fluid mb-3 flex-grow-1" alt="Imagen 1">
        <img src="@/assets/servicio_cliente.jpg" class="img-fluid mb-3 flex-grow-1" alt="Imagen 2">
        <img src="@/assets/habitacion2.jpg" class="img-fluid flex-grow-1" alt="Imagen 3">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SobreNosotros'
};
</script>

<style scoped>
.sobre-nosotros {
  background-color: #F5F5F5;
  color: #002642;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Estilo para el título */
h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* Espaciado y estilo para los subtítulos */
h3, h4 {
  margin-top: 15px;
}

/* Estilo para los párrafos */
p {
  line-height: 1.6;
}

/* Lista sin viñetas */
ul {
  list-style-type: none;
  padding: 0;
}

/* Estilo para los elementos de la lista */
ul li {
  margin: 5px 0;
}

/* Estilo para las imágenes */
img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

/* Asegura que el contenido de ambas columnas esté alineado */
.align-items-stretch {
  align-items: stretch;
}

/* Controla que las imágenes y los textos ocupen el mismo espacio vertical */
.flex-grow-1 {
  flex-grow: 1;
}
</style>