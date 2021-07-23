import { ServerResponse, IncomingMessage } from 'http';
import { readFile } from 'fs';
import { join } from 'path';
import RouteTo from './routes';

export const RouterViews = (
	request: IncomingMessage,
	response: ServerResponse,
) => {
	if (RouteTo.VIEW_GET_ALL(request)) {
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
