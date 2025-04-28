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
    const [showTable, setShowTable] = useState(false);
    const {orderId} = useParams();
    const {order} = useOrder(orderId, trigger);
    const navigate = useNavigate();

    const addProduct = async (product) => {
        const response = await sender({
            url: `http://localhost:8000/api/order/${orderId}/addProduct/${product.id}?quantity=${product.quantity}`,
            token,
            data: {productId: product.id}
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

    const totalUnitProducts = order.products.reduce((prev, currentValue) => {
        return prev + Number(currentValue.quantity)
    }, 0);

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
                        text-xs
                        md:text-md
                        ${consts.status[order.status]}
                    `}>{consts[order.status]}</div>
                </div>
                {/*Oculto para grandes pantallas, solo para moviles */}
                <div className="flex
                    md:hidden
                    justify-end
                    items-center
                    gap-2
                    text-gray-600
                    font-bold
                    underline
                    cursor-pointer
                    "
                     onClick={() => {
                         setShowTable(prev => !prev);
                     }}
                >
                    <span>Productos ({totalUnitProducts}) - Total ${order.total}</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor"
                             className="size-5">
                          <path fillRule="evenodd"
                                d="M.99 5.24A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25l.01 9.5A2.25 2.25 0 0 1 16.76 17H3.26A2.267 2.267 0 0 1 1 14.74l-.01-9.5Zm8.26 9.52v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 0 0 .627-.74Zm1.5 0a.75.75 0 0 0 .627.74h5.373a.75.75 0 0 0 .75-.75v-.615a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625Zm6.75-3.63v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75ZM17.5 7.5v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75Z"
                                clipRule="evenodd"/>
                        </svg>

                    </span>
                </div>
                <ProductList
                    extClass="max-h-[450px] md:max-h-[calc(100%) -10px]"
                    onClickProduct={async (product, quantity = 1) => {
                    await addProduct(product)
                }}/>
            </div>
            <div className={`
                h-[calc(100% - 65px)]
                min-w-full
                md:min-w-[400px] 
                bg-white 
                flex-col 
                ${showTable ? "flex absolute top-10 left-0" : "hidden"} 
                md:flex
            `}>
                {showTable ? <div className="w-full flex justify-end items-center">
                    <span className="text-4xl cursor-pointer"
                        onClick={() => {setShowTable(false)}}>&times;</span>
                </div> : null}
                <SimpleProductsTable products={order.products} extraCls="h-full" />
                <div className="
                    w-full
                    mt-auto
                    border-t-1
                    flex
                    flex-col
                    gap-4
                    border-dashed
                    border-gray-400
                    py-2
                    px-1
                ">
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