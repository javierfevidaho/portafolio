document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos de código
    const codeBlocks = document.querySelectorAll('pre code');

    // Ajustar el ancho de los contenedores de código para evitar el desplazamiento horizontal
    codeBlocks.forEach(block => {
        const parentPre = block.parentElement;
        const parentContainer = parentPre.parentElement;

        // Ajustar el ancho máximo del bloque de código al contenedor padre
        block.style.maxWidth = '100%';
        parentPre.style.maxWidth = '100%';
        parentPre.style.overflowX = 'auto';
    });
});
