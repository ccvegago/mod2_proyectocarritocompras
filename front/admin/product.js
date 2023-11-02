

// ------------------------ OBTENER PRODUCTOS Y BOTON ELIMINAR---------------------

// aca hacemos el dom con el html
let loadProductsButton = document.getElementById('load-products-button');
let producUl = document.getElementById('product-list');


//Cuando se da clic en el boton
loadProductsButton.addEventListener('click', () => {
    getProducts();
});

function getProducts(){
    fetch('http://localhost:3000/product')
    .then(response => response.json())
    .then(data => {
        let productTable = document.getElementById('table');
        productTable.innerHTML = ''; // Limpia el contenido anterior.

        //crea la tabla y su estructura
        let table = document.createElement('table');
        table.className = 'product-list';

        //crea cabeceras de la tabla y sus columnas
        let tableHeader = document.createElement('thead'); // thead agrupa el contenido del encabezado en una tabla html
        tableHeader.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
                
            </tr>
        `;
        productTable.appendChild(tableHeader);
        
        //Reccorre los productos, agrega cada uno a la tabla.
        data.forEach(Product => {
            let row = document.createElement('tr');

            //Se crean la celdas para cada columna
            let nameCell = document.createElement('td');
            nameCell.textContent = Product.name;

            let descriptionCell = document.createElement('td');
            descriptionCell.textContent = Product.description;

            let priceCell = document.createElement('td');
            priceCell.textContent = Product.price;

            let categoryCell = document.createElement('td');
            categoryCell.textContent = Product.Category.name;

            //Creamos el boton Eliminar
            let deleteCell = document.createElement('td');
            let deleteButton = document.createElement('button');
            deleteButton.className = 'eliminarBoton';
            deleteButton.textContent = 'Eliminar';
            deleteButton.setAttribute('data-productid', Product.id);

            //Agrega el evento de eliminación al boton
            deleteButton.addEventListener('click', () => {
                deleteProduct(Product.id);
            });

            deleteCell.appendChild(deleteButton);

            //Creamos el boton Actualizar
            let updateCell = document.createElement('td');
            let updateButton = document.createElement('button');
            updateButton.className = 'actualizarBoton';
            updateButton.textContent = 'Actualizar';
            updateButton.setAttribute('data-productid', Product.id);

            //Agrega el evento de Actualizar boton
            updateButton.addEventListener('click', () =>{
                const updateUrl= `product.update.html?id=${Product.id}&name=${Product.name}&description=${Product.description}&price=${Product.price}&categoryId=${Product.categoryId}`;
                 window.location.href = updateUrl;
            })
            updateCell.appendChild(updateButton);

            //Agrega las celdas a la fila
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(priceCell);
            row.appendChild(categoryCell);
            row.appendChild(updateCell);
            row.appendChild(deleteCell);

            //agrega la fila a la tabla
            productTable.appendChild(row);
        });

        document.body.appendChild(productTable);
    })
    .catch(error => console.error(error));
}

// --------------- ELMINAR PRODUCTO--------
function deleteProduct(productId) {
    //cuando los datos se pasan directamente por la url no se usa el body, se usa el params en las rutas.
    fetch(`http://localhost:3000/product/${productId}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.status === 204) {
            alert('Producto eliminado con exito');
            getProducts(); // actualiza la lista despues de eliminar.
        } else if (response.status === 404) {
            alert('Producto no encontrado en la funcion');
            return null;
        } else {
            alert('Error al eliminar el producto');
            return null;
        }
    })
    .catch((error) => console.error(error));
}


//---------------------CREATE PRODUCT --------------

// DOMContetnLoaded asegura que una vez se ejecute el form en el html ejecute la funcion createProduct
document.addEventListener('DOMContentLoaded', () => {
    let productForm = document.getElementById('product-form');
    let categorySelect = document.getElementById('categoryId');
    
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
                let data = await response.json();
                alert(data.message);
                // se restablce los campos del formularios es decir se dejan vacios..
                document.getElementById('name').value = '';
                document.getElementById('description').value = '';
                document.getElementById('price').value = '';
                document.getElementById('categoryId').value = '';
            }else {
                let data = await response.json();
                alert('Error al crear producto: ' + data.error)
            }
        } catch (error) {
            console.error(error);
        }
        // aca restablece el form ..
        /*name.value = '';
        description.value = '';
        price.value = '';
        categoryId.value = '';*/
    }
});


// ------- ACTUALIZAR PRODUCTO--------------
// El parametro updateData, contiene la información actualizada del producto, para enviarlo al servidor.
function updateProduct(productId, updatedData) {
    fetch(`http://localhost:3000/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => {
        if (response.status === 200) {
            alert('Producto actualizado con exito');
            getProducts();
        } else if (response.status === 404) {
            alert('Producto no encontrado');
        } else {
            alert('Error al actualizar el producto');
        }
    })
    .catch(error => console.error(error))
}


