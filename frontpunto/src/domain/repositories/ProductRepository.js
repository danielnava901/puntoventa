import productApi from "../infra/api/productApi.js";

export default class ProductRepository {

    async getAllProducts(search, token) {
        return await productApi.fetchAllProducts(search, token);
    }
}