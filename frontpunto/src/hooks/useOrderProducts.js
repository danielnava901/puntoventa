import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

const useOrderProducts = (desde, hasta) => {
    const {token} = useUserStore(state => state);
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const url = new URL("http://localhost:8000/api/orderProduct");
        url.searchParams.set("desde", desde);
        url.searchParams.set("hasta", hasta)
        const response = await sender({
            url: url,
            token,
            method: "GET"
        });

        if(!!response) setProducts(response);
    }

    useEffect(() => {
        getData();
    }, [desde, hasta]);

    return {products}
}

export default useOrderProducts;