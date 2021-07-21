import { IncomingMessage } from 'http';

const RouteToProducts: string = '/api/products';

export const GET_ALL = (req: IncomingMessage): boolean => {
	return req.url === RouteToProducts && req.method === 'GET';
};

export const GET_ONE = (req: IncomingMessage): boolean => {
	return (
		Boolean(req.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		req.method === 'GET'
	);
};

export const POST = (req: IncomingMessage): boolean => {
	return req.url === RouteToProducts && req.method === 'POST';
};

export const PUT = (req: IncomingMessage): boolean => {
	return (
		Boolean(req.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		req.method === 'PUT'
	);
};

export const DELETE = (req: IncomingMessage): boolean => {
	return (
		Boolean(req.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		req.method === 'DELETE'
	);
};

const RouteTo = {
	GET_ALL,
	GET_ONE,
	POST,
	PUT,
	DELETE,
};

export default RouteTo;
