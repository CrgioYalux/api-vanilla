import { IncomingMessage } from 'http';

const BASEPATH: string = '/api/products';

export const GET_ALL = (request: IncomingMessage): boolean => {
	return request.url === BASEPATH && request.method === 'GET';
};

export const GET_ONE = (request: IncomingMessage): boolean => {
	return (
		Boolean(request.url?.match(/\/api\/products\/([a-z0-9-]+)/)) &&
		request.method === 'GET'
	);
};

export const POST = (request: IncomingMessage): boolean => {
	return request.url === BASEPATH && request.method === 'POST';
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

const RouteTo = {
	GET_ALL,
	GET_ONE,
	POST,
	PUT,
	DELETE,
};

export default RouteTo;
