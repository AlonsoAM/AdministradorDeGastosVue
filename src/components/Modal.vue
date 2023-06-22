<script setup>
import iconoCerrar from "../assets/img/cerrar.svg";
const emit = defineEmits(["ocultar-modal"]);
</script>
<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img
        :src="iconoCerrar"
        alt="Cerrar Modal"
        @click="$emit('ocultar-modal')"
      />
    </div>
    <div class="contenedor">
      <!-- Aquí va el formulario -->
      <form>
        <legend>Añadir Gasto</legend>
        <div class="campo">
          <label for="nombre">Nombre Gasto:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
          />
        </div>
        <div class="campo">
          <label for="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto, ej. 300"
          />
        </div>
        <div class="campo">
          <label for="categoria">Categoría:</label>
          <select id="categoria">
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorros</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.cerrar-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.cerrar-modal img {
  width: 3rem;
  cursor: pointer;
}
</style>
