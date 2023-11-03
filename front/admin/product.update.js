document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    let categorySelect = document.getElementById('categoryId');
    console.log(categorySelect);

    //Realiza una solicitud para obetener las categorias
    const responseCategory = await fetch('http://localhost:3000/categories')
    const resCategory = await responseCategory.json();

    //Muestra todas las categorias de la bd
    resCategory.forEach(categories => {
        let option = document.createElement('option');
        option.value = categories.id;
        option.textContent = categories.name;
        categorySelect.appendChild(option);
    });


    const response = await fetch(`http://localhost:3000/product/${productId}`);

    if (response.status === 200) {
        const productData = await response.json();
        // Rellena los campos del formulario con los datos actuales
        document.getElementById('name').value = productData.name;
        document.getElementById('description').value = productData.description;
        document.getElementById('price').value = productData.price;
        document.getElementById('categoryId').value = productData.CategoryId;

    } else {
        alert('Producto no encontrado');
    }
});


// ------- ACTUALIZAR PRODUCTO--------------

async function updateProduct(productId) {
    try {
        // Realiza una solicitud PUT para actualizar el producto en el servidor
        const response = await fetch(`http://localhost:3000/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.status === 200) {
            alert('Producto actualizado con éxito');
            // Redirige a la vista principal o realiza alguna otra acción necesaria
        } else if (response.status === 404) {
            alert('Producto no encontrado');
        } else {
            alert('Error al actualizar el producto');
        }
    } catch (error) {
        console.error(error);
    }
}


// ----


