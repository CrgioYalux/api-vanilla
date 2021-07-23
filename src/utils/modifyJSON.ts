import { writeFileSync } from 'fs';
import { ProductType } from '../mongoDB/models/ProductModel';

export const writeDataToFile = (filename: string, content: ProductType[]) => {
	writeFileSync(filename, JSON.stringify(content), 'utf-8');
};
