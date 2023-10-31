// DOMContetnLoaded asegura que una vez se ejecute el form en el html ejecute la funcion createProduct
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const categorySelect = document.getElementById('categoryId');

    //Realiza una solicitud para obetener las categorias
    fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(categories => {
            //Muestra todas las categorias de la bd
            categories.forEach(categories => {
                let option = document.createElement('option');
                option.value = categories.id;
                option.textContent = categories.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));
    
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        createProduct();
    });

    async function createProduct() {
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let price = document.getElementById('price').value;
        let categoryId = document.getElementById('categoryId').value;
      
        try {
            let response = await fetch('http://localhost:3000/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, price, categoryId}),
            });

            if (response.status === 201) {
                alert('Producto creado exitosamente');
                productForm.reset();
            }else {
                let data = await response.json();
                alert('Error al crear producto: ' + data.error)
            }
        } catch (error) {
            console.error(error);
        }
    }
});



