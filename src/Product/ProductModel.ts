import data from '../data/products.json';

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

const ProductUtils = {
	getAll,
	getOne,
};

export default ProductUtils;
