// Función para mostrar la tabla al iniciar el sitio
function showTable() {
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            const inventoryBody = document.getElementById('inventoryBody');
            inventoryBody.innerHTML = ''; // Limpiar la tabla antes de añadir los productos
            data.forEach(product => {
                const productRow = document.createElement('tr');
                productRow.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td><button class="delete">Eliminar</button></td>
                `;
                inventoryBody.appendChild(productRow);

                // Agregar un event listener para el botón de eliminar en la nueva fila
                productRow.querySelector('.delete').addEventListener('click', function() {
                    // Eliminar el producto de la base de datos
                    fetch('/products', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: product.name })
                    })
                    .then(() => {
                        // Eliminar la fila del producto cuando se hace clic en el botón de eliminar
                        productRow.remove();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Llamar a la función showTable al cargar la página
document.addEventListener('DOMContentLoaded', showTable);

// Agregar un event listener para el evento 'submit' en el formulario con id 'productForm'
document.getElementById('productForm').addEventListener('submit', function(event) {
    // Prevenir el comportamiento por defecto de enviar el formulario
    event.preventDefault();

    // Obtener el valor del campo de entrada con id 'productName'
    const productName = document.getElementById('productName').value;
    // Obtener el valor del campo de entrada con id 'productQuantity'
    const productQuantity = document.getElementById('productQuantity').value;

    // Agregar el nuevo producto a la base de datos
    fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: productName, quantity: productQuantity })
    })
    .then(response => {
        if (response.ok) {
            // Crear una nueva fila de tabla para el producto
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${productName}</td>
                <td>${productQuantity}</td>
                <td><button class="delete">Eliminar</button></td>
            `;

            // Agregar la nueva fila a la tabla de inventario
            document.getElementById('inventoryBody').appendChild(productRow);

            // Agregar un event listener para el botón de eliminar en la nueva fila
            productRow.querySelector('.delete').addEventListener('click', function() {
                // Eliminar el producto de la base de datos
                fetch('/products', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: productName })
                })
                .then(() => {
                    // Eliminar la fila del producto cuando se hace clic en el botón de eliminar
                    productRow.remove();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });

            // Limpiar el formulario después de agregar el producto
            document.getElementById('productForm').reset();
        } else {
            console.error('Error al agregar el producto:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
