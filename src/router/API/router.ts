import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from '../../mongoDB/services/ProductServices';

import RouteTo from './routes';
import { IncomingMessage, ServerResponse } from 'http';

export const RouterAPI = (
	request: IncomingMessage,
	response: ServerResponse,
) => {
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
	}
};
