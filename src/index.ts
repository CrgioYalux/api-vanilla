import { createServer } from 'http';
import { readFile } from 'fs';
import { join } from 'path';
import {
	getAllProducts,
	getOneProduct,
	createProduct,
} from './Product/ProductController';
import RouteTo from './routes';

const PORT = process.env.PORT || 5000;

const server = createServer((request, response) => {
	const id: string = request.url?.split('/')[3] + '';
	if (RouteTo.GET_ALL(request)) {
		getAllProducts(response);
	} else if (RouteTo.GET_ONE(request)) {
		getOneProduct(response, id);
	} else if (RouteTo.POST(request)) {
		createProduct(request, response);
	} else if (RouteTo.PUT(request)) {
	} else if (RouteTo.DELETE(request)) {
	} else {
		readFile(join('src', 'views', 'PAGE404.html'), (err, page) => {
			response.writeHead(404, { 'Content-Type': 'text/html' });
			response.write(page);
			return response.end();
		});
	}
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
