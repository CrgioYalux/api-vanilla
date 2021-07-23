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
}): Promise<ProductType> => {
	return new Promise<ProductType>((resolve, reject) => {
		const newProduct: ProductType = { name, description, price, id: v4() };
		products.push(newProduct);
		writeDataToFile(join(__dirname, '..', 'data', 'products.json'), products);
		resolve(newProduct);
	});
};

export const Delete = (id: string) => {
	return new Promise((resolve, reject) => {
		const newProducts = products.filter(
			(product: ProductType) => product.id !== id,
		);
		writeDataToFile(
			join(__dirname, '..', 'data', 'products.json'),
			newProducts,
		);
	});
};

export const Update = (product: ProductType) => {
	return new Promise<ProductType>((resolve, reject) => {
		const index: number = products.findIndex((p) => p.id === product.id);
		products[index] = product;
		writeDataToFile(join(__dirname, '..', 'data', 'products.json'), products);
	});
};

const ProductUtils = {
	GetAll,
	GetOne,
	Create,
	Delete,
	Update,
};

export default ProductUtils;
