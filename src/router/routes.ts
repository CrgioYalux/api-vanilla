import { IncomingMessage } from 'http';

const RouteToProducts: string = '/api/products';
const RouteToProductsView: string = '/public';

export const GET_ALL = (request: IncomingMessage): boolean => {
	return request.url === RouteToProducts && request.method === 'GET';
};

export const GET_ONE = (request: IncomingMessage): boolean => {
	return (
		Boolean(request.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		request.method === 'GET'
	);
};

export const POST = (request: IncomingMessage): boolean => {
	return request.url === RouteToProducts && request.method === 'POST';
};

export const PUT = (request: IncomingMessage): boolean => {
	return (
		Boolean(request.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		request.method === 'PUT'
	);
};

export const DELETE = (request: IncomingMessage): boolean => {
	return (
		Boolean(request.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		request.method === 'DELETE'
	);
};

export const VIEW_GET_ALL = (request: IncomingMessage): boolean => {
	return (
		request.url === `${RouteToProductsView}/products` &&
		request.method === 'GET'
	);
};

export const VIEW_POST = (request: IncomingMessage): boolean => {
	return (
		request.url === `${RouteToProductsView}/create` && request.method === 'GET'
	);
};

const RouteTo = {
	GET_ALL,
	GET_ONE,
	POST,
	PUT,
	DELETE,
	VIEW_GET_ALL,
	VIEW_POST,
};

export default RouteTo;
