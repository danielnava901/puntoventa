import {sender} from "../../../utils/sender.js";

const productApi = {
    fetchAllProducts: async (search, token)  => {
        const url = new URL("http://localhost:8000/api/product");
        if(search.trim().length > 0) url.searchParams.append("search", search);
        return await sender({
            url: url,
            token,
            method: "GET"
        });
    }
}


export default productApi;