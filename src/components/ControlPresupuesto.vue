<script setup>
import imagen from "../assets/img/grafico.jpg";
import { formatearCantidad } from "../helpers";

defineEmits(["reset-app"]);

const props = defineProps({
  presupuesto: {
    type: Number,
    required: true,
  },
  disponible: {
    type: Number,
    required: true,
  },
  gastado: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img :src="imagen" alt="imagen loader" />
    </div>
    <div class="contenedor-presupuesto">
      <button type="button" class="reset-app" @click="$emit('reset-app')">
        Resetear app
      </button>
      <p><span>Presupuesto:</span> {{ formatearCantidad(presupuesto) }}</p>
      <p><span>Disponible:</span> {{ formatearCantidad(disponible) }}</p>
      <p><span>Gastado: </span>{{ formatearCantidad(gastado) }}</p>
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
