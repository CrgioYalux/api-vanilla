import { IncomingMessage, ServerResponse } from 'http';
import ProductUtils, { ProductType } from './ProductModel';
import { getPostData } from '../utils/getPostData';

export const getAllProducts = async (response: ServerResponse) => {
	try {
		let products = await ProductUtils.GetAll();
		response.writeHead(200, { 'Content-Type': 'application/json' });
		return response.end(JSON.stringify(products));
	} catch (error) {
		console.error(error);
	}
};

export const getOneProduct = async (response: ServerResponse, id: string) => {
	try {
		const product = await ProductUtils.GetOne(id);
		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify({ message: 'Product not found' }));
		} else {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify(product));
		}
	} catch (error) {
		console.error(error);
	}
};

export const createProduct = async (
	request: IncomingMessage,
	response: ServerResponse,
) => {
	try {
		const { name, description, price } = await getPostData(request);
		if (!name || !description || !price) {
			response.writeHead(406, { 'Content-Type': 'application/json' });
			return response.end(
				JSON.stringify({
					message: "There's empty fields of needed information",
				}),
			);
		} else {
			const newProduct = await ProductUtils.Create({
				name,
				description,
				price,
			});
			response.writeHead(201, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify(newProduct));
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteProduct = async (response: ServerResponse, id: string) => {
	try {
		const product = await ProductUtils.GetOne(id);
		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			return response.end(
				JSON.stringify({ message: 'The product does not exist' }),
			);
		} else {
			await ProductUtils.Delete(id);
			response.writeHead(200, { 'Content-Type': 'application/json' });
			return response.end(
				JSON.stringify({ message: 'Product deleted correctly' }),
			);
		}
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async (
	request: IncomingMessage,
	response: ServerResponse,
	id: string,
) => {
	try {
		const product = await ProductUtils.GetOne(id);
		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			return response.end(
				JSON.stringify({ message: 'The product does not exist' }),
			);
		} else {
			const { name, description, price } = await getPostData(request);
			const newProduct = {
				name: name || product.name,
				description: description || product.description,
				price: price || product.price,
			};
			await ProductUtils.Update({ id, ...newProduct });
			response.writeHead(200, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify(newProduct));
		}
	} catch (error) {
		console.error(error);
	}
};
