document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del menú
    const menuItems = document.querySelectorAll('.menu ul li');
    const toggleInstitucional = document.getElementById('toggle-submenu-institucional');
    const toggleServicios = document.getElementById('toggle-submenu-servicios');
    const toggleNoticias = document.getElementById('toggle-submenu-noticias');
    const submenuInstitucional = document.getElementById('submenu-institucional');
    const submenuServicios = document.getElementById('submenu-servicios');
    const submenuNoticias = document.getElementById('submenu-noticias');
    const menu = document.querySelector('#menu-reducido');
    const abrirMenu = document.querySelector('#abrir-menu');
    const cerrarMenu = document.querySelector('#cerrar-menu');

    // Función para cerrar todos los submenús
    function closeAllSubmenus() {
        submenuInstitucional.classList.remove('show');
        submenuServicios.classList.remove('show');
        submenuNoticias.classList.remove('show');
    }

    // Eventos hover para todos los tamaños de pantalla
    menuItems.forEach(item => {
        if (item.querySelector('ul')) {
            item.addEventListener('mouseenter', function() {
                closeAllSubmenus();
                this.querySelector('ul').classList.add('show');
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('ul').classList.remove('show');
            });
        }
    });

    // Eventos click para submenús (móvil)
    if (toggleInstitucional) {
        toggleInstitucional.addEventListener('click', function(event) {
            event.preventDefault();
            closeAllSubmenus();
            submenuInstitucional.classList.toggle('show');
        });
    }

    if (toggleServicios) {
        toggleServicios.addEventListener('click', function(event) {
            event.preventDefault();
            closeAllSubmenus();
            submenuServicios.classList.toggle('show');
        });
    }

    if (toggleNoticias) {
        toggleNoticias.addEventListener('click', function(event) {
            event.preventDefault();
            closeAllSubmenus();
            submenuNoticias.classList.toggle('show');
        });
    }

    // Menú hamburguesa
    if (abrirMenu) {
        abrirMenu.addEventListener('click', () => {
            menu.classList.add('visible');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cerrarMenu) {
        cerrarMenu.addEventListener('click', () => {
            menu.classList.remove('visible');
            document.body.style.overflow = '';
        });
    }

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function(event) {
        // Para el menú hamburguesa
        if (menu && !menu.contains(event.target) && abrirMenu && !abrirMenu.contains(event.target)) {
            menu.classList.remove('visible');
            document.body.style.overflow = '';
        }
        
        // Para los submenús
        if (!event.target.closest('.menu ul li')) {
            closeAllSubmenus();
        }
    });
});