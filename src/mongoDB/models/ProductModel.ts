import { Schema, model, Model } from 'mongoose';
import { ProductType } from '../../Product/ProductModel';

// Schemes creation

const productSchema = new Schema<ProductType, Model<ProductType>, ProductType>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	id: { type: String, required: true },
});

type ProductSchema = {
	name: string;
	description: string;
	price: number;
	id: string;
	_id?: string;
	__v?: string;
};

productSchema.set('toJSON', {
	transform: (document: ProductSchema, returnedObject: ProductSchema) => {
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export const Product = model('Product', productSchema);
