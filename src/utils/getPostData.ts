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
			});
		} catch (error) {
			console.error(error);
		}
	});
};
