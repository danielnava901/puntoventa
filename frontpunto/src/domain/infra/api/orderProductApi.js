import {sender} from "../../../utils/sender.js";

const orderProductApi = {
    fetchGetOrderProducts: async (desde, hasta, token) => {
        const url = new URL("http://localhost:8000/api/orderProduct");
        url.searchParams.set("desde", desde);
        url.searchParams.set("hasta", hasta)

        return await sender({
            url: url,
            token,
            method: "GET"
        });
    }
}


export default orderProductApi