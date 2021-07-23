import { IncomingMessage } from 'http';

const PATH_JSFILES = (PAGE: string): string => `/resources/${PAGE}/scripts`;
const PATH_CSSFILES = (PAGE: string): string => `/resources/${PAGE}/styles`;

export const GET_JSFILE = (request: IncomingMessage, page: string): boolean => {
	return request.url === PATH_JSFILES(page) && request.method === 'GET';
};

export const GET_CSSFILE = (
	request: IncomingMessage,
	page: string,
): boolean => {
	return request.url === PATH_CSSFILES(page) && request.method === 'GET';
};

const RouteTo = {
	GET_JSFILE,
	GET_CSSFILE,
};

export default RouteTo;
