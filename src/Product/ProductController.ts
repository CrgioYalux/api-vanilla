import { IncomingMessage, ServerResponse } from 'http';
import ProductUtils, { ProductType } from './ProductModel';

type ExpectedProducts = ProductType[] | undefined;
type ExpectedProduct = ProductType | undefined;

export const getAllProducts = async (response: ServerResponse) => {
	try {
		let products = await ProductUtils.getAll();
		response.writeHead(200, { 'Content-Type': 'application/json' });
		return response.end(JSON.stringify(products));
	} catch (error) {
		console.error(error);
	}
};

export const getOneProduct = async (response: ServerResponse, id: string) => {
	try {
		const product = await ProductUtils.getOne(id);
		if (!product) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify({ message: 'Product not found' }));
		} else {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify({ product }));
		}
	} catch (error) {
		console.error(error);
	}
};
