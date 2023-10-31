document.addEventListener('DOMContentLoaded', () => {
    const loadProductsButton = document.getElementById('load-products-button');
    const productList = document.getElementById('product-list');

    loadProductsButton.addEventListener('click', async () => {
        try {
            const products = await getProducts();
            displayProducts(products);
        } catch (error){
            console.error(error);
        }
    });

    async function getProducts() {
        const response = await fetch('http://localhost:3000/product');
        if (!response.ok) {
            throw new Error(`Error al cargar los productos. Codigo de estado: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    function displayProducts(products) {
        // limpia la lsita de productos.
        productList.innerHTML = '';

        //Muestra los productos en la pagina
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Descripcrión:</strong> ${product.description} </p>
            <p><strong>Categoria:</strong> ${product.Category.name} </p>
            <p><strong>Precio:</strong> $${product.price} </p>

            <input type="number" id="amount-${product.id}" value="1" min="1">
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productList.appendChild(productCard);
        });
    }
});

async function addToCart(productId) {
    let amount = document.getElementById(`amount-${productId}`).value;
    let token = localStorage.getItem('token');

    try{
        const response = await fetch('http://localhost:3000/carproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ amount, productId}),
        });
        if (response.status === 200) {
            alert('Producto agregado al carrito');
        } else {
            alert('No se pudo agregar el producto al carrtio');
        }
    } catch (error) {
        console.error(error);
    }
}
/*
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
*/


/*
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
        let productUl = document.getElementById('product-list');

        // se limpia la lista de productos existente, en caso de que se halla actualizado un product.
        productUl.innerHTML = '';

        //Trae los productos de la bd
        data.forEach(Product => {
            let listItem = document.createElement('table');
            listItem.textContent = `Nombre: ${Product.name}, Descripcion: ${Product.description},Precio: ${Product.price}, Categoria: ${Product.categoryId}`;
            productUl.appendChild(listItem);
        });
    })
    .catch(error => console.error(error));
}*/