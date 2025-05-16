import {sender} from "../../../utils/sender.js";

const productApi = {

    createProduct: async (newProduct) => {
        return await sender({
            url: "http://localhost:8000/api/product/",
            method: "POST",
            data: newProduct,
        });
    },

    fetchAllProducts: async (search)  => {
        const url = new URL("http://localhost:8000/api/product");
        if(search.trim().length > 0) url.searchParams.append("search", search);
        return await sender({
            url: url,
            method: "GET"
        });
    }
}


export default productApi;