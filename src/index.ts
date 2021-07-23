import { createServer } from 'http';
import { connectToDB } from './mongoDB/connection';
import { router } from './router/router';
const PORT = process.env.PORT || 5000;

const server = createServer(router);

connectToDB()
	?.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	})
	.catch(console.error);
