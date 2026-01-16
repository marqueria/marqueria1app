function calcular() {

  let cliente = document.getElementById("cliente").value || "";

  // A
  let largo = +document.getElementById("largo").value || 0;
  let ancho = +document.getElementById("ancho").value || 0;
  let cotillaje = +document.getElementById("cotillaje").value || 0;
  let costoMarco = +document.getElementById("costoMarco").value || 0;
  let manoObra = +document.getElementById("manoObra").value || 0;

  // B
  let pulgAncho = +document.getElementById("pulgAncho").value || 0;
  let pulgAlto = +document.getElementById("pulgAlto").value || 0;

  let precioA = 0, precioB = 0;
  let usaA = false, usaB = false;

  if (largo>0 && ancho>0 && costoMarco>0) {
    usaA = true;
    let perimetro = (largo + ancho) * 2;
    let costo = (perimetro + cotillaje) * costoMarco;
    precioA = (costo * 3) + manoObra;
  }

  let sumaMateriales = 0;
  document.querySelectorAll(".material:checked").forEach(m => {
    sumaMateriales += +m.value;
  });
  sumaMateriales += +document.getElementById("materialOtro").value || 0;

  if (pulgAncho>0 && pulgAlto>0 && sumaMateriales>0) {
    usaB = true;
    let area = (pulgAncho * pulgAlto) / 144;
    precioB = ((area * sumaMateriales) + 5) * 6;
  }

  if (!usaA && !usaB) {
    alert("Ingrese datos de Marco y/o Vidrio");
    return;
  }

  let total = Math.ceil(precioA + precioB);

  let r = `Cliente: ${cliente}`;
  if (usaA) r += `\nMarco + Mano de obra: S/ ${precioA.toFixed(2)}`;
  if (usaB) r += `\nVidrio / Materiales: S/ ${precioB.toFixed(2)}`;
  r += `\n--------------------\nTOTAL FINAL: S/ ${total}`;

  document.getElementById("resultado").innerText = r;

  let hist = JSON.parse(localStorage.getItem("historial") || "[]");
  hist.push({fecha:new Date().toLocaleDateString(), cliente, precioA, precioB, total});
  localStorage.setItem("historial", JSON.stringify(hist));
}

function generarReporte() {
  let hist = JSON.parse(localStorage.getItem("historial") || "[]");
  if (!hist.length) return alert("No hay cotizaciones");

  let w = window.open("");
  let html = `<h2>Reporte</h2><table border="1" width="100%">
  <tr><th>Fecha</th><th>Cliente</th><th>Marco</th><th>Vidrio</th><th>Total</th></tr>`;
  hist.forEach(h=>{
    html += `<tr><td>${h.fecha}</td><td>${h.cliente}</td>
    <td>${h.precioA||0}</td><td>${h.precioB||0}</td><td>${h.total}</td></tr>`;
  });
  html += `</table><script>window.print()</script>`;
  w.document.write(html);
}

function limpiarFormulario() {
  document.querySelectorAll("input").forEach(i=>{
    if(i.type==="checkbox") i.checked=false;
    else i.value="";
  });
  document.getElementById("resultado").innerText="";
}

function borrarHistorial() {
  if(confirm("¿Borrar todo el historial?")) {
    localStorage.removeItem("historial");
    alert("Historial borrado");
  }
}
