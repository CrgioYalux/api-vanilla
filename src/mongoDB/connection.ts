import dotenv from 'dotenv';
import mongoose from 'mongoose';

const result = dotenv.config();

export const connectToDB = () => {
	if (
		result.parsed?.CONNECTION_STRING &&
		typeof result.parsed?.CONNECTION_STRING === 'string'
	) {
		let connectionString: string = result.parsed.CONNECTION_STRING;

		if (process.env.CONNECTION_STRING) {
			connectionString = process.env.CONNECTION_STRING;
		}
		return new Promise<boolean>((resolve, reject) => {
			mongoose
				.connect(connectionString, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false,
					useCreateIndex: false,
				})
				.then(() => {
					resolve(true);
				})
				.catch(reject);
		});
	} else {
		console.error(
			'Unable to connect to the databse. CONNECTION_STRING needed.',
		);
	}
};
