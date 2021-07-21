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
