document.addEventListener("DOMContentLoaded", () => {
    const convertirMoneda = async () => {
        const montoCLP = document.getElementById("monto-clp").value;
        const moneda = document.getElementById("select").value;

        if (!montoCLP || !moneda) {
            alert("ingrese un monto y seleccione una moneda.");
            return;
        }

        try {
            const response = await fetch("https://mindicador.cl/api");
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            let tipoCambio;
            if (moneda === "usd") {
                tipoCambio = data.dolar.valor;
            } else if (moneda === "eur") {
                tipoCambio = data.euro.valor;
            } else {
                document.getElementById("resultado").innerText = "Moneda no valida.";
                return;
            }

            const resultado = montoCLP / tipoCambio;
            document.getElementById("resultado").innerText = `Resultado: ${resultado.toFixed(2)} ${moneda.toUpperCase()}`;
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
            document.getElementById("resultado").innerText = `Error: ${error.message}`;
        }
    };

    document.querySelector(".btn-conversor").addEventListener("click", convertirMoneda);
});
