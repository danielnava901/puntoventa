import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

const useProducts = (search) => {
    const {token} = useUserStore((state) =>  state);
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        const url = new URL("http://localhost:8000/api/product");
        if(search.trim().length > 0)
        url.searchParams.append("search", search);

        const response = await sender({
            url: url,
            token,
            method: "GET"
        });


        if(!!response) setProducts(response)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            getProducts()
        }, 350)

        return () => clearTimeout(timeout)
    }, [search]);


    return {products}
}

export default useProducts;