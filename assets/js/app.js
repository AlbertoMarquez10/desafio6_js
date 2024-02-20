let graf = null
let divisa = ""
const cambio = document.querySelector("#resultado");
const btn = document.querySelector("#convertir");
const nuestraGraf = document.querySelector("#grafico");

console.log(pesos)

const consultaApi = async(divisa) => {
    try {
        let consulta = await fetch(`https://mindicador.cl/api/${divisa}`)
        let respuesta = await consulta.json()
        console.log(respuesta)
        return respuesta
        
    } catch (error) {
        alert("Se acaba de crachear la API...")
    }

}

const graficar = (fechas, datos)=>{
    graf =  new Chart(nuestraGraf, {
        type: "line",
        data: {
          labels: fechas,
          datasets: [
            {
              label: "Divisa",
              data: datos,
              borderWidth: 2,
            },
          ],
        },
      })
}

const mostrarConversion = (respuesta) => {
    const pesos = document.querySelector("#pesos").value;
    let calculo = parseInt(pesos) / respuesta.serie[0].valor;
    cambio.innerHTML = calculo.toFixed(5);
    let series = respuesta.serie.slice(0, 9);
    let fechas = series.map((item) => {
        return new Date(item.fecha).toLocaleDateString("en-GB");
    });
    let datos = series.map((item) => item.valor);
    graficar(fechas, datos);
}
btn.addEventListener("click", async(event) => {
    event.preventDefault();
    if(graf !== null){
        graf.destroy()
      }
    divisa = document.querySelector("#selectMonedas").value;
    let respuesta = await consultaApi(divisa)
    mostrarConversion(respuesta);
})