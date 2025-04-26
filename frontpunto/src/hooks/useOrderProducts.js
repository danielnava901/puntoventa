import {useEffect, useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

const useOrderProducts = (desde, hasta) => {
    const {token} = useUserStore(state => state);
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const response = await sender({
            url: "http://localhost:8000/api/order",
            token,
            data: {desde, hasta}
        })
    }

    useEffect(() => {
        console.log({desde, hasta})
    }, [desde, hasta]);

    return {products}
}

export default useOrderProducts;