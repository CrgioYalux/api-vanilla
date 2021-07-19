import { createServer } from 'http';

const PORT = process.env.PORT || 5000;

const server = createServer((req, res) => {});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
