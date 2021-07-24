const getProducts = () => {
	return fetch('/api/products')
		.then((data) => data.json())
		.catch(console.error);
};
window.onload = async function () {
	const productsList = await getProducts();
	const productsContainer = document.getElementById('productsContainer');

	productsList.length !== 0 &&
		productsList.forEach((product) => {
			const productContainer = document.createElement('li');
			const productName = document.createElement('h3');
			const productDescription = document.createElement('p');
			const productPrice = document.createElement('strong');

			productName.textContent = product.name;
			productDescription.textContent = product.description;
			productPrice.textContent = `$${product.price}`;

			productContainer.appendChild(productName);
			productContainer.appendChild(productDescription);
			productContainer.appendChild(productPrice);

			productsContainer.appendChild(productContainer);
		});
};
