<script setup>
import imagen from "../assets/img/grafico.jpg";
</script>
<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img :src="imagen" alt="imagen loader" />
    </div>
    <div class="contenedor-presupuesto">
      <button class="reset-up">Resetear app</button>
      <p><span>Presupuesto:</span> S/0.00</p>
      <p><span>Disponible:</span> S/0.00</p>
      <p><span>Gastado:</span> S/0.00</p>
    </div>
  </div>
</template>

<style scoped></style>
