import { createServer } from 'http';
import { readFile } from 'fs';
import { join } from 'path';

const PORT = process.env.PORT || 5000;

const server = createServer((req, res) => {
	if (req.url === '/' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write('<h1>working</h1>');
		return res.end();
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
