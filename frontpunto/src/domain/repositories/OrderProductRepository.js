import {sender} from "../../utils/sender.js";

export default class OrderProductRepository {

    async getOrderProducts(desde, hasta, token) {
        const url = new URL("http://localhost:8000/api/orderProduct");
        url.searchParams.set("desde", desde);
        url.searchParams.set("hasta", hasta)
        console.log({url})
        return await sender({
            url: url,
            token,
            method: "GET"
        });
    }

}