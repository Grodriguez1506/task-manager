export function calcularEdad(fechaNacimiento) {
  const hoy = new Date(); // Fecha actual
  const fechaNac = new Date(fechaNacimiento); // Fecha de nacimiento como objeto Date

  let edad = hoy.getFullYear() - fechaNac.getFullYear(); // Restar años
  const mes = hoy.getMonth() - fechaNac.getMonth(); // Diferencia de meses

  // Ajustar si aún no ha cumplido años este año
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--; // Reducir la edad en 1 si no cumplió años aún
  }

  return edad; // Devolver la edad
}
