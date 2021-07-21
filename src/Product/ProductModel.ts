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

const posts: ProductType[] = data;

export const getAll = (): Promise<ProductType[]> => {
	return new Promise<ProductType[]>((resolve, reject) => {
		resolve(posts);
	});
};

export const getOne = (id: string): Promise<ProductType | undefined> => {
	return new Promise<ProductType | undefined>((resolve, reject) => {
		const post = posts.find((p: ProductType) => p.id === id);
		resolve(post);
	});
};

export const create = ({
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
		posts.push(newProduct);
		writeDataToFile(join(__dirname, '..', 'data', 'products.json'), posts);
		resolve(newProduct);
	});
};

const ProductUtils = {
	getAll,
	getOne,
	create,
};

export default ProductUtils;
