import {useEffect, useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import PageLayout from "../PageLayout.jsx";

const VentasPage = () => {
    const [orders, setOrders] = useState([])
    const {token} = useUserStore();
    const navigate = useNavigate();

    const getData = async () => {
        const response = await sender({
            url: "http://localhost:8000/api/order/",
            method: "GET",
            token
        });
        setOrders(response.orders);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageLayout showHeader={false}>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <span className="
                        flex
                        justify-center
                        items-center
                        p-2
                        rounded
                        shadow-lg
                        w-[70px]
                        h-[70px]
                        bg-white
                        hover:cursor-pointer
                        hover:opacity-75
                    "
                          onClick={() => {
                              navigate("/punto/nueva-orden")
                          }}
                    >Nuevo</span>
                </div>
                <div className="flex gap-4 mt-8">
                    {
                        orders.map(order => {
                            return <div  key={order.id}
                                 className="
                                    p-4
                                    border
                                    border-gray-600
                                    flex
                                    rounded
                                    cursor-pointer
                                    hover:opacity-75
                                    bg-white
                                    flex-col
                                    gap-4
                                "
                                onClick={() => {
                                    navigate(`/punto/orden/${order.id}`)
                                }}
                            >
                                <div className="fond-bold text-lg">
                                    {order.order_name}
                                </div>
                                <div className="text-xs">{order.diff}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default VentasPage