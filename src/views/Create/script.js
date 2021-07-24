window.onload = function () {
	const createProductForm = document.getElementById('createProductForm');

	createProductForm.onsubmit = function (event) {
		event.preventDefault();

		const nameInput = document.getElementById('nameInput');
		const descriptionInput = document.getElementById('descriptionInput');
		const priceInput = document.getElementById('priceInput');

		if (nameInput.value && descriptionInput.value && priceInput.value) {
			const product = {
				name: nameInput.value,
				description: descriptionInput.value,
				price: priceInput.value,
			};

			const request = new XMLHttpRequest();
			request.open('POST', '/api/products', true);
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(product));

			nameInput.value = '';
			descriptionInput.value = '';
			priceInput.value = '';
		}
	};
};
