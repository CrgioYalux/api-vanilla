import { IncomingMessage } from 'http';

const BASEPATH: string = '/public';

export const VIEW_GET_ALL = (request: IncomingMessage): boolean => {
	return request.url === `${BASEPATH}/products` && request.method === 'GET';
};

export const VIEW_POST = (request: IncomingMessage): boolean => {
	return request.url === `${BASEPATH}/create` && request.method === 'GET';
};

const RouteTo = {
	VIEW_GET_ALL,
	VIEW_POST,
};

export default RouteTo;
