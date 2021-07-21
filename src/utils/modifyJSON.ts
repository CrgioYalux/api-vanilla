import { writeFileSync } from 'fs';
import { ProductType } from '../Product/ProductModel';

export const writeDataToFile = (filename: string, content: ProductType[]) => {
	writeFileSync(filename, JSON.stringify(content), 'utf-8');
};
