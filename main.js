document.addEventListener('DOMContentLoaded', function() {
    // Código para ajustar el ancho de los bloques de código, si es necesario.
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const parentPre = block.parentElement;
        const parentContainer = parentPre.parentElement;

        block.style.maxWidth = parentContainer.offsetWidth + 'px';
        parentPre.style.maxWidth = parentContainer.offsetWidth + 'px';
        parentPre.style.overflowX = 'hidden';
    });
});
