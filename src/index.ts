import { createServer } from 'http';
import { readFile } from 'fs';
import { join } from 'path';
import { getAllProducts, getOneProduct } from './Product/ProductController';
import RouteTo from './routes';

const PORT = process.env.PORT || 5000;

const server = createServer((req, res) => {
	const id: string = req.url?.split('/')[3] + '';
	if (RouteTo.GET_ALL(req)) {
		getAllProducts(res);
	} else if (RouteTo.GET_ONE(req)) {
		getOneProduct(res, id);
	} else if (RouteTo.POST(req)) {
	} else if (RouteTo.PUT(req)) {
	} else if (RouteTo.DELETE(req)) {
	} else {
		readFile(join('src', 'views', 'PAGE404.html'), (err, page) => {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.write(page);
			return res.end();
		});
	}
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
