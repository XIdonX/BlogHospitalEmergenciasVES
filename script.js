document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar los enlaces que activan los submenús
    const toggleInstitucional = document.getElementById('toggle-submenu-institucional');
    const toggleServicios = document.getElementById('toggle-submenu-servicios');
    const toggleNoticias = document.getElementById('toggle-submenu-noticias');

    // Seleccionar los submenús
    const submenuInstitucional = document.getElementById('submenu-institucional');
    const submenuServicios = document.getElementById('submenu-servicios');
    const submenuNoticias = document.getElementById('submenu-noticias');

    // Función para cerrar todos los submenús
    function closeAllSubmenus() {
        submenuInstitucional.classList.remove('show');
        submenuServicios.classList.remove('show');
        submenuNoticias.classList.remove('show');
    }

    // Evento para el menú "Institucional"
    toggleInstitucional.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        closeAllSubmenus(); // Cierra todos los submenús
        submenuInstitucional.classList.toggle('show'); // Abre o cierra este submenú
    });

    // Evento para el menú "Servicios"
    toggleServicios.addEventListener('click', function (event) {
        event.preventDefault();
        closeAllSubmenus(); 
        submenuServicios.classList.toggle('show'); 
    });

    // Evento para el menú "Noticias y campañas"
    toggleNoticias.addEventListener('click', function (event) {
        event.preventDefault();
        closeAllSubmenus(); 
        submenuNoticias.classList.toggle('show'); 
    });

    // Cerrar los submenús al hacer clic fuera de ellos
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.menu ul li')) {
            closeAllSubmenus();
        }
    });
});