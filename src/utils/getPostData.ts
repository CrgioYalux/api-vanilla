import { IncomingMessage } from 'http';

type ExpectedData = {
	name: string | undefined;
	description: string | undefined;
	price: number | undefined;
};

export const getPostData = (
	request: IncomingMessage,
): Promise<ExpectedData> => {
	return new Promise<ExpectedData>((resolve, reject) => {
		try {
			let body: string = '';
			request.on('data', (chunk) => {
				body += chunk.toString();
			});
			request.on('end', () => {
				resolve(JSON.parse(body));
				// const parsedUrl = querystring.parse(body);
				// const product: ExpectedData = {
				// 	name: parsedUrl.name?.toString(),
				// 	description: parsedUrl.description?.toString(),
				// 	price: Number(parsedUrl.price),
				// }
			});
		} catch (error) {
			console.error(error);
		}
	});
};
