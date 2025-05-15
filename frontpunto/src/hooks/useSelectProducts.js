import {useMemo, useState} from "react";

const useSelectProducts = () => {
    const [products, setProducts] = useState([])

    const totalUnitProducts = useMemo(() => {
        return products.reduce((acc, prod) => acc + prod.quantity, 0);
    }, [products]);

    return {products, setProducts, totalUnitProducts}
}

export default useSelectProducts;