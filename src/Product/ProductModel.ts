import data from '../data/products.json';
import { v4 } from 'uuid';
import { writeDataToFile } from '../utils/modifyJSON';
import { join } from 'path';

export type ProductType = {
	id: string;
	name: string;
	description: string;
	price: number;
};

const products: ProductType[] = data;

export const GetAll = (): Promise<ProductType[]> => {
	return new Promise<ProductType[]>((resolve, reject) => {
		resolve(products);
	});
};

export const GetOne = (id: string): Promise<ProductType | undefined> => {
	return new Promise<ProductType | undefined>((resolve, reject) => {
		const post = products.find((p: ProductType) => p.id === id);
		resolve(post);
	});
};

export const Create = ({
	name,
	description,
	price,
}: {
	name: string;
	description: string;
	price: number;
}) => {
	return new Promise((resolve, reject) => {
		const newProduct: ProductType = { name, description, price, id: v4() };
		products.push(newProduct);
		writeDataToFile(join(__dirname, '..', 'data', 'products.json'), products);
		resolve(newProduct);
	});
};

const ProductUtils = {
	GetAll,
	GetOne,
	Create,
};

export default ProductUtils;
