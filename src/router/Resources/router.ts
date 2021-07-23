import { readFile } from 'fs';
import { join } from 'path';
import RouteTo from './routes';
import { IncomingMessage, ServerResponse } from 'http';

export const RouterResources = (
	request: IncomingMessage,
	response: ServerResponse,
) => {
	const page: string = request.url?.split('/')[2] + '';
	if (RouteTo.GET_JSFILE(request, page)) {
		readFile(join('src', 'views', page, 'script.js'), (err, file) => {
			response.writeHead(200, {
				'Content-Type': 'application/javascript',
			});
			return response.end(file);
		});
	} else if (RouteTo.GET_CSSFILE(request, page)) {
		readFile(join('src', 'views', page, 'style.css'), (err, file) => {
			response.writeHead(200, {
				'Content-Type': 'text/css',
			});
			return response.end(file);
		});
	}
};
