<script setup>
import { ref, reactive, watch } from "vue";
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import Gasto from "./components/Gasto.vue";
import Filtros from "./components/Filtros.vue";
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Modal from "./components/Modal.vue";
import { generarID } from "./helpers";
import Swal from "sweetalert2";

const modal = reactive({
  mostrar: false,
  animar: false,
});
const presupuesto = ref(0);
const disponible = ref(0);
const gastado = ref(0);
const filtro = ref("");

const gasto = reactive({
  nombre: "",
  cantidad: "",
  categoria: "",
  id: null,
  fecha: Date.now(),
});
const gastos = ref([]);

watch(
  gastos,
  () => {
    const totalGastado = gastos.value.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );

    gastado.value = totalGastado;
    disponible.value = presupuesto.value - gastado.value;
  },
  {
    deep: true,
  }
);

watch(
  modal,
  () => {
    if (!modal.mostrar) {
      reiniciarStateGasto();
    }
  },
  {
    deep: true,
  }
);

const reiniciarStateGasto = () => {
  // Reiniciar el objeto
  Object.assign(gasto, {
    nombre: "",
    cantidad: "",
    categoria: "",
    id: null,
    fecha: Date.now(),
  });
};

const definiPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = cantidad;
};

const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300);
};

const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 300);
};

const guardarGasto = () => {
  if (gasto.id) {
    // editando
    const { id } = gasto;
    const i = gastos.value.findIndex((gasto) => gasto.id === id);
    gastos.value[i] = { ...gasto };
  } else {
    // registro nuevo
    gastos.value.push({
      ...gasto,
      id: generarID(),
    });
  }

  ocultarModal();
  reiniciarStateGasto();
};

const seleccionarGasto = (id) => {
  // console.log(id);
  const gastoEditar = gastos.value.find((gasto) => gasto.id === id);
  Object.assign(gasto, gastoEditar);
  mostrarModal();
};

const eliminarGasto = (id) => {
  // console.log("Eliminando: ", id);
  Swal.fire({
    title: "Está seguro?",
    text: "La selección es irreversible, se eliminará el gasto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      gastos.value = gastos.value.filter((gasto) => gasto.id !== id);
      ocultarModal();
      Swal.fire("Eliminado!", "El gasto se ha eliminado con éxito!", "success");
    }
  });
};
</script>

<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto
          v-if="presupuesto === 0"
          @definir-presupuesto="definiPresupuesto"
        />
        <ControlPresupuesto
          v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
        />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <Filtros v-model:filtro="filtro" />
      <div class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? "Gastos" : "No hay gastos aún" }}</h2>
        <Gasto
          v-for="gasto in gastos"
          :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>

      <div class="crear-gasto">
        <img
          :src="iconoNuevoGasto"
          alt="Icono de nuevo gasto"
          @click="mostrarModal"
        />
      </div>
      <Modal
        v-if="modal.mostrar"
        @ocultar-modal="ocultarModal"
        @guardar-gasto="guardarGasto"
        @eliminar-gasto="eliminarGasto"
        :modal="modal"
        :disponible="disponible"
        :id="gasto.id"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
      />
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
header {
  background-color: var(--azul);
}
header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}
.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}
.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}
.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}
.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img {
  width: 5rem;
}
.crear-gasto img:hover {
  cursor: pointer;
}
.listado-gastos {
  margin-top: 10rem;
}
.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
.fijar {
  overflow: hidden;
  height: 100vh;
}
</style>
