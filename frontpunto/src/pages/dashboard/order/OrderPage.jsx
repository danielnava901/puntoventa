import PageLayout from "../PageLayout.jsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import useProducts from "../../../hooks/useProducts.js";
import useOrder from "../../../hooks/useOrder.js";
import Input from "../../../components/Input.jsx";

const OrderPage = () => {
    const {token} = useUserStore(state => state);
    const {orderId} = useParams();
    const {order} = useOrder(orderId)
    const navigate = useNavigate();
    const [search, setSearch] = useState({value: "", error: false, type: "text", placeholder: "Buscar producto"})
    const {products} = useProducts(search.value);

    const addProduct = async (productId) => {
        const response = await sender({
            url: `http://localhost:8000/api/order/${orderId}/addProduct/${productId}`,
            token,
            data: {productId}
        });
    }

    if(!order) return <div>Cargando</div>

    return <PageLayout onBack={() => {
        navigate("/punto")
    }}>
        <div className="w-full flex h-full">
            <div className="flex flex-col gap-4 flex-1 px-8">
                <div>
                    <div className="flex gap-4 items-center">
                        <span className="text-2xl">Orden #{orderId}</span>
                        <span className="text-2xl font-bold">{order.order_name}</span>
                    </div>
                    <div>
                        <Input
                            input={search}
                            sty="search"
                            onChange={(input) => {setSearch(input)}} />
                    </div>
                </div>

                <div className="grid gap-4 auto-cols-max grid-flow-col">
                    {
                        products.map(product => {
                            return <div key={product.id}
                                className="flex
                                    flex-col
                                    px-4
                                    py-2
                                    shadow
                                    bg-white
                                    cursor-pointer
                                    hover:opacity-75
                                "
                                onClick={() => {

                                }}
                            >
                                <div>
                                    <div>{product.name}</div>
                                    <div>${product.unit_price}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="min-w-[400px] bg-white h-full pt-8">
                Lista
            </div>
        </div>
    </PageLayout>
}

export default OrderPage;