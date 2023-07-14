<script setup>
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
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
      <CircleProgress
        :percent="50"
        :size="250"
        :border-width="30"
        :border-bg-width="30"
        fill-color="#3b82f6"
        empty-color="#e1e1e1"
      />
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
