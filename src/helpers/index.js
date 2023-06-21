export const formatearCantidad = (cantidad) => {
  return Number(cantidad).toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};
