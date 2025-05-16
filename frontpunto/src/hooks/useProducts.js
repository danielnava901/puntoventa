import {useEffect, useState} from "react";
import ProductRepository from "../domain/repositories/ProductRepository.js";
import ProductService from "../domain/services/ProductService.js";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const useProducts = (search) => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const allProducts = await productService.getProducts(search);
            if(!!allProducts) setProducts(allProducts)
        }catch (e) {
            console.log({error: error.message});
        }
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