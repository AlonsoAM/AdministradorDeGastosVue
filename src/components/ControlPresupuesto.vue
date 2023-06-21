<script setup>
import imagen from "../assets/img/grafico.jpg";
</script>
<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img :src="imagen" alt="imagen loader" />
    </div>
    <div class="contenedor-presupuesto">
      <button class="reset-app">Resetear app</button>
      <p><span>Presupuesto:</span> S/0.00</p>
      <p><span>Disponible:</span> S/0.00</p>
      <p><span>Gastado:</span> S/0.00</p>
    </div>
  </div>
</template>

<style scoped>
.dos-columnas {
  display: flex;
  flex-direction: column;
}
.dos-columnas > :first-child {
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .dos-columnas {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }
  .dos-columnas > :first-child {
    margin-bottom: 0;
  }
}

.reset-app {
  background-color: #db2777;
  color: var(--blanco);
  border: none;
  border-radius: 1rem;
  padding: 2rem;
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  transition-property: background-color;
  transition-duration: 300ms;
  width: 100%;
}

.reset-app:hover {
  background-color: #b43870;
  cursor: pointer;
}

.contenedor-presupuesto {
  width: 100%;
}
.contenedor-presupuesto p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--gris-oscuro);
}

@media (min-width: 768px) {
  .contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: left;
    color: var(--gris-oscuro);
  }
}
.contenedor-presupuesto span {
  font-weight: 900;
  color: var(--azul);
}
</style>
