import PageLayout from "../PageLayout.jsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import useProducts from "../../../hooks/useProducts.js";
import useOrder from "../../../hooks/useOrder.js";
import Input from "../../../components/Input.jsx";
import ProductList from "../../../components/ProductList.jsx";
import SimpleProductsTable from "../../../components/SimpleProductsTable.jsx";

const OrderPage = () => {
    const {token} = useUserStore(state => state);
    const [trigger, setTrigger] = useState(0);
    const {orderId} = useParams();
    const {order} = useOrder(orderId, trigger);
    const navigate = useNavigate();
    const [search, setSearch] = useState({value: "", error: false, type: "text", placeholder: "Buscar producto"})
    const {products} = useProducts(search.value);

    const addProduct = async (productId) => {
        const response = await sender({
            url: `http://localhost:8000/api/order/${orderId}/addProduct/${productId}`,
            token,
            data: {productId}
        });
        setTrigger(prev => prev + 1);
    }

    if(!order) return <div>Cargando</div>

    return <PageLayout onBack={() => {
        navigate("/punto")
    }}>
        <div className="w-full flex h-full">
            <div className="flex flex-col gap-4 flex-1 px-8">
                <div className="flex gap-4 items-center">
                    <span className="text-2xl">Orden #{orderId}</span>
                    <span className="text-2xl font-bold">{order.order_name}</span>
                </div>
                <ProductList onClickProduct={async (product) => {
                    await addProduct(product.id)
                }}/>
            </div>
            <div className="min-w-[400px] bg-white h-full flex flex-col">
                <SimpleProductsTable products={order.products} />
                <div className="w-full mt-auto border-t-1
                    flex
                    flex-col
                    gap-4
                    border-dashed border-gray-400 py-2 px-1">
                    <div className="flex items-center justify-between">
                        <span className="font-bold">Total</span>
                        <span className="text-lg">${order.total}</span>
                    </div>
                    <div>
                        <button className="
                        w-full
                        hover:cursor-pointer
                        hover:opacity-75
                        bg-black text-white p-4 flex justify-center
                        items-center">Pagar</button>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
}

export default OrderPage;