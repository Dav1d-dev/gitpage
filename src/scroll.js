document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('a[data-scroll]');

    secciones.forEach(function(seccion) {
        seccion.addEventListener('click', function(e) {
            e.preventDefault();
            const objetivo = this.getAttribute('data-scroll');
            const targetElement = document.getElementById(objetivo);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});