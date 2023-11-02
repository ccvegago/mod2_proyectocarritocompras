document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productDescription = urlParams.get('description');
    const productPrice = urlParams.get('price');
    const productCategoryId = urlParams.get('categoryId');

    document.getElementById('name').value = productName;
    document.getElementById('description').value = productDescription;
    document.getElementById('price').value = productPrice;


});