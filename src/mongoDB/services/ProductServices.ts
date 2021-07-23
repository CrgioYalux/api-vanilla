import { Product } from '../models/ProductModel';
import { ProductType } from '../models/ProductModel';
import { ServerResponse, IncomingMessage } from 'http';
import { getPostData } from '../../utils/getPostData';
import { v4 } from 'uuid';
import { CallbackError } from 'mongoose';

// GET /api/products
// returns ProductsType[]
export const getAllProducts = (response: ServerResponse) => {
	Product.find({}, (errorFinding: CallbackError, products: ProductType[]) => {
		if (errorFinding) {
			response.writeHead(409, { 'Content-Type': 'application/json' });
			return response.end(
				JSON.stringify({
					message: `Error finding the products : ${errorFinding}`,
				}),
			);
		}
		response.writeHead(302, { 'Content-Type': 'application/json' });
		return response.end(JSON.stringify(products));
	});
};

// GET /api/products/:id
// returns ProductsType
export const getProductById = (response: ServerResponse, id: string) => {
	Product.findOne(
		{ id },
		(errorFinding: CallbackError, foundProduct: ProductType) => {
			if (errorFinding) {
				response.writeHead(409, { 'Content-Type': 'application/json' });
				return response.end(
					JSON.stringify({
						message: `Error finding the product : ${errorFinding}`,
					}),
				);
			}
			if (!foundProduct) {
				response.writeHead(404, { 'Content-Type': 'application/json' });
				return response.end(JSON.stringify({ message: 'Product not found' }));
			}
			response.writeHead(302, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify(foundProduct));
		},
	);
};

// POST /api/products
// returns ProductType
export const createProduct = async (
	request: IncomingMessage,
	response: ServerResponse,
) => {
	const { name, description, price } = await getPostData(request);
	if (!name || !description || !price) {
		response.writeHead(406, { 'Content-Type': 'application/json' });
		return response.end(
			JSON.stringify({
				message: "There's empty fields of needed information",
			}),
		);
	} else {
		const newProduct = new Product({
			name,
			description,
			price,
			id: v4(),
		});
		newProduct
			.save()
			.then((createdProduct) => {
				response.writeHead(201, { 'Content-Type': 'application/json' });
				return response.end(JSON.stringify(createdProduct));
			})
			.catch((errorCreating: Error) => {
				response.writeHead(409, { 'Content-Type': 'application/json' });
				return response.end(
					JSON.stringify({
						message: `Error creating the product: ${errorCreating}`,
					}),
				);
			});
	}
};

// DELETE /api/products/:id
// returns message
export const deleteProduct = (response: ServerResponse, id: string) => {
	Product.findOneAndDelete({ id }, {}, (errorFinding, deletedProduct) => {
		if (errorFinding) {
			response.writeHead(409, { 'Content-Type': 'application/json' });
			return response.end(
				JSON.stringify({
					message: `Error finding the product : ${errorFinding}`,
				}),
			);
		}
		if (!deletedProduct) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify({ message: 'Product not found' }));
		}
		response.writeHead(200, { 'Content-Type': 'application/json' });
		return response.end(
			JSON.stringify({ message: 'Product deleted correctly' }),
		);
	});
};

// PUT /api/products/:id
// returns ProductType
export const updateProduct = async (
	request: IncomingMessage,
	response: ServerResponse,
	id: string,
) => {
	const newProps = await getPostData(request);
	Product.findOne(
		{ id },
		(errorFinding: CallbackError, foundProduct: ProductType) => {
			if (errorFinding) {
				response.writeHead(409, { 'Content-Type': 'application/json' });
				return response.end(
					JSON.stringify({
						message: `Error finding the product : ${errorFinding}`,
					}),
				);
			}
			if (!foundProduct) {
				response.writeHead(404, { 'Content-Type': 'application/json' });
				return response.end(JSON.stringify({ message: 'Product not found' }));
			}
			const newProduct: ProductType = {
				name: newProps.name || foundProduct.name,
				description: newProps.description || foundProduct.description,
				price: newProps.price || foundProduct.price,
				id,
			};
			Product.findOneAndUpdate(
				{ id },
				newProduct,
				{ new: true },
				(errorUpdating, updatedProduct) => {
					if (errorUpdating) {
						response.writeHead(409, { 'Content-Type': 'application/json' });
						return response.end(
							JSON.stringify({
								message: `Error updating the product : ${errorUpdating}`,
							}),
						);
					}
					response.writeHead(200, { 'Content-Type': 'application/json' });
					return response.end(
						JSON.stringify({
							message: 'Product updated correctly',
							updatedProduct,
						}),
					);
				},
			);
		},
	);
};
