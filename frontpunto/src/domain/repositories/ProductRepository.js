import productApi from "../infra/api/productApi.js";

export default class ProductRepository {

    async createProduct(product) {
        return await productApi.createProduct(product);
    }

    async getAllProducts(search) {
        return await productApi.fetchAllProducts(search);
    }
}