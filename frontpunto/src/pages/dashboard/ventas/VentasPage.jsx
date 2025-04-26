import {useEffect, useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import PageLayout from "../PageLayout.jsx";
import consts from "../../../consts.js";

const VentasPage = () => {
    const [orders, setOrders] = useState([])
    const {token} = useUserStore();
    const navigate = useNavigate();
    const statusColor = {
        "OPEN": "border-green-700",
        "CLOSED": "border-b-6 border-gray-00",
        "PENDING": "border-b-6 border-blue-200",
        "CANCELED": "border-b-6 border-red-200"
    }

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
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <span className="font-bold text-2xl">Ordenes </span>
                </div>
                <div className="flex flex-col">
                    <span className="
                        flex
                        justify-center
                        items-center
                        p-2
                        rounded
                        shadow-lg
                        w-[170px]
                        h-[70px]
                        bg-gray-800
                        text-white
                        hover:cursor-pointer
                        hover:opacity-75
                    "
                          onClick={() => {
                              navigate("/punto/nueva-orden")
                          }}
                    >Nueva orden</span>
                </div>
                <div className="grid grid-cols-4 gap-4 max-h-[500px] overflow-auto">
                    {
                        orders.map(order => {
                            return <div  key={order.id}
                                 className={`
                                    p-4
                                    flex
                                    rounded-tl
                                    rounded-tr
                                    cursor-pointer
                                    hover:opacity-75
                                    bg-white
                                    flex-col
                                    gap-4
                                    border-b-6 
                                    ${consts.status_border[order.status]}
                                 `}
                                onClick={() => {
                                    navigate(`/punto/orden/${order.id}`)
                                }}
                            >
                                <div >
                                    <div className="">#{order.id}{` `}</div>
                                    <div className="fond-bold text-lg">{order.order_name}</div>
                                    <div className="fond-bold text-sm">${order.total}</div>
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