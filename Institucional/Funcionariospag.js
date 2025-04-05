
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const pagButtons = document.querySelectorAll(".pag-button");
    const funcionarioContainers = document.querySelectorAll(".funcionario-container");
    const resultadoContainer = document.querySelector("#resultado .resultado-container");
    const resultsTabButton = document.querySelector('.pag-button-ocultar');
    const resultsTab = document.getElementById("resultado");

    // Función para cambiar de página
    function changePage(pageId) {
        funcionarioContainers.forEach((container) => container.classList.add("hidden"));
        document.getElementById(pageId).classList.remove("hidden");

        pagButtons.forEach((button) => button.classList.remove("active"));
        document.querySelector(`.pag-button[data-pag="${pageId}"]`).classList.add("active");
    }

    // Escuchar clics en los botones de página
    pagButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!button.classList.contains("hidden")) {
                changePage(button.getAttribute("data-pag"));
            }
        });
    });

    // Función para buscar en todas las páginas
    function searchAllPages() {
        const searchTerm = searchInput.value.toLowerCase();
        resultadoContainer.innerHTML = ""; // Limpiar resultados previos

        // Si el campo de búsqueda está vacío, mostrar la página 1
        if (!searchTerm.trim()) {
            resultsTabButton.classList.add("hidden");
            resultsTab.classList.add("hidden");
            changePage("pag1"); // Cambiar automáticamente a la página 1
            return;
        }

        let hasResults = false;

        // Usar un Set para evitar duplicados
        const uniqueResults = new Set();

        funcionarioContainers.forEach((container) => {
            const items = container.querySelectorAll(".funcionario-card");

            items.forEach((item) => {
                const name = item.querySelector("h3").textContent.toLowerCase();
                const position = item.querySelector("p").textContent.toLowerCase();

                if (name.includes(searchTerm) || position.includes(searchTerm)) {
                    const itemId = item.querySelector("p").textContent; // Identificador único basado en el nombre
                    if (!uniqueResults.has(itemId)) {
                        uniqueResults.add(itemId);
                        const clonedItem = item.cloneNode(true); // Clonar el elemento encontrado
                        resultadoContainer.appendChild(clonedItem);
                        hasResults = true;
                    }
                }
            });
        });

        // Mostrar u ocultar la pestaña de resultados
        if (hasResults) {
            resultsTabButton.classList.remove("hidden");
            resultsTab.classList.remove("hidden");
            changePage("resultado"); // Cambiar automáticamente a la pestaña de resultados
        } else {
            resultsTabButton.classList.add("hidden");
            resultsTab.classList.add("hidden");
            resultadoContainer.innerHTML = "<p class='no-results'>No se encontraron resultados.</p>";
        }
    }

    // Escuchar cambios en el campo de búsqueda
    searchInput.addEventListener("input", searchAllPages);

    //Funcionarios-card al dar click
        const funcionariosCard = document.querySelectorAll('.funcionario-card');
        
        funcionariosCard.forEach(funcionario => {
            funcionario.addEventListener('click', function() {
                // Cierra todos los demás divs primero
                funcionariosCard.forEach(otherFuncionario => {
                    if (otherFuncionario !== this) {
                        otherFuncionario.classList.remove('seleccionar');
                    }
                });
                // Abre/cierra al clickear
                this.classList.toggle('seleccionar');
            });
        });
});
