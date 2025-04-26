import PageLayout from "../PageLayout.jsx";
import {useNavigate, useParams} from "react-router";
import {useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import useOrder from "../../../hooks/useOrder.js";
import ProductList from "../../../components/ProductList.jsx";
import SimpleProductsTable from "../../../components/SimpleProductsTable.jsx";
import consts from "../../../consts.js";
import Title from "../../../components/Title.jsx";
import {Button} from "../../../components/Button";

const OrderPage = () => {
    const {token} = useUserStore(state => state);
    const [trigger, setTrigger] = useState(0);
    const {orderId} = useParams();
    const {order} = useOrder(orderId, trigger);
    const navigate = useNavigate();

    const addProduct = async (productId) => {
        const response = await sender({
            url: `http://localhost:8000/api/order/${orderId}/addProduct/${productId}`,
            token,
            data: {productId}
        });
        setTrigger(prev => prev + 1);
    }

    const onClickClose = async () => {
        const response = await sender({
            url: `http://localhost:8000/api/order/${orderId}/close`,
            method: "POST",
            token
        });

        setTrigger(prev => prev + 1);
    }

    if(!order) return <div>Cargando</div>

    return <PageLayout onBack={() => {navigate("/punto")}} extraCls="h-full">
        <div className="w-full flex h-full">
            <div className="flex flex-col gap-4 flex-1 px-8">
                <div className="flex gap-4 justify-between items-center">
                    <div className="flex gap-4">
                        <Title>Orden #{orderId}</Title>
                        <Title>{order.order_name}</Title>
                    </div>
                    <div className={`
                        px-2
                        py-1
                        ${consts.status[order.status]}
                    `}>{consts[order.status]}</div>
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
                    {
                        order.status === "OPEN" ? <div>
                            <Button
                                extraCls="w-full
                                    hover:cursor-pointer
                                    hover:opacity-75
                                    bg-black text-white p-4 flex justify-center
                                    items-center
                                "
                                onClick={() => {
                                    onClickClose();
                                }}
                            >Pagar</Button>
                        </div> : null
                    }

                </div>
            </div>
        </div>
    </PageLayout>
}

export default OrderPage;