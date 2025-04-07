
document.addEventListener("DOMContentLoaded", function() {
    
    //Selecciona todos los elementos que necesitamos
    const buscador = document.getElementById("searchInput");
    const botonesPaginas = document.querySelectorAll(".pag-button");
    const contenedoresFuncionarios = document.querySelectorAll(".funcionario-container");
    const contenedorResultados = document.querySelector("#resultado .resultado-container");
    const botonResultados = document.querySelector('.pag-button-ocultar');
    const pestañaResultados = document.getElementById("resultado");
    const tarjetasFuncionarios = document.querySelectorAll('.funcionario-card');

    //Función para cambiar de página
    function cambiarPagina(idPagina) {
        // Oculta todos los contenedores
        contenedoresFuncionarios.forEach(function(contenedor) {
            contenedor.classList.add("hidden");
        });
        
        // Muestra solo el contenedor que queremos
        document.getElementById(idPagina).classList.remove("hidden");
        
        // Quita el activo de todos los botones
        botonesPaginas.forEach(function(boton) {
            boton.classList.remove("active");
        });
        
        // Marca como activo el botón de la página actual
        document.querySelector(`.pag-button[data-pag="${idPagina}"]`).classList.add("active");
    }

    //Añade eventos a los botones de página
    botonesPaginas.forEach(function(boton) {
        boton.addEventListener("click", function() {
            if (!boton.classList.contains("hidden")) {
                cambiarPagina(boton.getAttribute("data-pag"));
            }
        });
    });

    //Función para buscar funcionarios
    function buscarFuncionarios() {
        const textoBusqueda = buscador.value.toLowerCase();
        contenedorResultados.innerHTML = ""; // Limpiamos resultados anteriores
        
        // Si no hay texto de búsqueda, muestra la página 1
        if (!textoBusqueda.trim()) {
            botonResultados.classList.add("hidden");
            pestañaResultados.classList.add("hidden");
            cambiarPagina("pag1");
            return;
        }
        
        let encontramosResultados = false;
        const resultadosUnicos = new Set(); // Para evitar duplicados
        
        // Busca en todos los contenedores
        contenedoresFuncionarios.forEach(function(contenedor) {
            const tarjetas = contenedor.querySelectorAll(".funcionario-card");
            
            tarjetas.forEach(function(tarjeta) {
                const nombre = tarjeta.querySelector("h3").textContent.toLowerCase();
                const puesto = tarjeta.querySelector("p").textContent.toLowerCase();
                
                if (nombre.includes(textoBusqueda) || puesto.includes(textoBusqueda)) {
                    const idUnico = tarjeta.querySelector("p").textContent;
                    if (!resultadosUnicos.has(idUnico)) {
                        resultadosUnicos.add(idUnico);
                        const tarjetaClonada = tarjeta.cloneNode(true);
                        contenedorResultados.appendChild(tarjetaClonada);
                        encontramosResultados = true;
                    }
                }
            });
        });
        
        // Muestra u oculta los resultados
        if (encontramosResultados) {
            botonResultados.classList.remove("hidden");
            pestañaResultados.classList.remove("hidden");
            cambiarPagina("resultado");
        } else {
            botonResultados.classList.add("hidden");
            pestañaResultados.classList.add("hidden");
            contenedorResultados.innerHTML = "<p class='no-results'>No se encontraron resultados.</p>";
        }
    }

    //Evento para el buscador
    buscador.addEventListener("input", buscarFuncionarios);

    //Eventos para las tarjetas de funcionarios
    tarjetasFuncionarios.forEach(function(tarjeta) {
        tarjeta.addEventListener('click', function() {
            // Cierra todas las demás tarjetas
            tarjetasFuncionarios.forEach(function(otraTarjeta) {
                if (otraTarjeta !== tarjeta) {
                    otraTarjeta.classList.remove('seleccionar');
                }
            });
            // Abre/cierra la tarjeta clickeada
            tarjeta.classList.toggle('seleccionar');
        });
    });
});
