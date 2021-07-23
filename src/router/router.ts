import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { readFile } from 'fs';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from '../mongoDB/services/ProductServices';
import RouteTo from './routes';

export const router = (request: IncomingMessage, response: ServerResponse) => {
	const id: string = request.url?.split('/')[3] + '';

	if (RouteTo.GET_ALL(request)) {
		getAllProducts(response);
	} else if (RouteTo.GET_ONE(request)) {
		getProductById(response, id);
	} else if (RouteTo.POST(request)) {
		createProduct(request, response);
	} else if (RouteTo.PUT(request)) {
		updateProduct(request, response, id);
	} else if (RouteTo.DELETE(request)) {
		deleteProduct(response, id);
	} else if (RouteTo.VIEW_GET_ALL(request)) {
		readFile(join('src', 'views', 'Storage', 'Index.html'), (err, page) => {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			return response.end(page);
		});
	} else if (RouteTo.VIEW_POST(request)) {
		readFile(join('src', 'views', 'Create', 'Index.html'), (err, page) => {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			return response.end(page);
		});
	} else {
		readFile(join('src', 'views', '404', 'Index.html'), (err, page) => {
			response.writeHead(404, { 'Content-Type': 'text/html' });
			return response.end(page);
		});
	}
};
