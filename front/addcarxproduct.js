//const CarProduct = require("../back/model/car_product.model");

//traer el contenido del carrito
async function getCarProducts() {
    try {
      const response = await fetch('http://localhost:3000/carproduct');
      const data = await response.json();
      // Manejar la respuesta del servidor, que es la lista de productos en el carrito
      console.log(data);
    } catch (error) {
      console.error('Error al obtener el contenido del carrito:', error);
    }
  }

 async function getContentCar() {
    try{
        const response = await fetch('http://localhost:3000/carproduct');
        const data = await response.json();
        const carContent = document.getElementById('car-content');

        if (data.length === 0) {
            carContent.innerHTML = 'El carrito esta vacio.';
        } else {
                // Crear un objeto para rastear la cantidad de cada producto en
                // el carrito
                const carrito = {};

                //iterar sobre los productos en el carrito
                data.forEach(carProduct => {
                    const product = carProduct.Product;
                    const amount = carProduct.amount;

                    //verifica si el producto ya esta en el carrito
                    if (carrito[product.id]) {
                        //si ya esta en el carrito, suma la cantidad
                        carrito[product.id] += amount;
                    } else {
                        // si no esta en el carrito, crea una entrada para el producto
                        carrito[product.id] = amount;
                    }
                });

                //crea una lista para mostrar los producto en el carrito
                const listProduct = document.createElement('ul');

                for (const idProduct in carrito) {
                    const product = data.find(carProduct => carProduct.Product.id === parseInt(idProduct));
                    // si product no encuentra productos pues no hara nada, para uque no genere errores si ////hay algun null o undefined
                    
                    if (product) {
                        const item = document.createElement('li');
                        item.textContent = `Producto: ${product.Product.name} x ${carrito[idProduct]}`;
                        
                        //BOTON PARA ELIMINAR PRODUCTO DEL CARRITO
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Eliminar';
                        deleteButton.addEventListener('click', () => deleteProduct(product.Product.id));
                        item.appendChild(deleteButton);

                        listProduct.appendChild(item);
                    }
                }
                carContent.innerHTML = '';
                carContent.appendChild(listProduct);
                
        }
    } catch (error) {
        console.error('Error al obtener el contenido del carrito:', error)
    }
}


//FUNCION BOTON ELIMINAR PRODUCTO DEL CARRITO DE COMPAS
async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/carproduct/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            //si el producto se elimino exitosamente del servidor pasa:
            //acutaliza la vista del carrito
            getContentCar();
        }else {
            console.error('Erro al eliminar el producto de lcarrito de productos', response.statusText);
        }
    } catch (error) {
        console.error('Erro al eliminar el producto del carito de productos', error);
    }
};

 /*
//Agregar un producto al carrito
async function addProductToCart(productId, amount) {
    let token = localStorage.getItem('token');
    const productAdd = {
        product: productId,
        amount: amount
    };
    try{
        const response = await fetch('http://localhost:3000/carproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(productAdd)
        });
        const message = await response.text();
        // Es un mensaje para confimrcación de respuesta al servidor
        console.log(message);
    } catch (error){
        console.error('Error al agregar el producto al carrito:', error);
    }
}
*/
//

