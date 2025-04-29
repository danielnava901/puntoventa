import {useEffect, useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import PageLayout from "../PageLayout.jsx";
import Title from "../../../components/Title.jsx";
import {CardOrder} from "../../../components/CardOrder";
import {BigButton} from "../../../components/BigButton";
import {GridLayout} from "../../../components/GridLayout";

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
        if(!!response) setOrders(response);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageLayout showHeader={false} extraCls="gap-4 mt-[10px] md:mt-0">
            <Title>Ordenes</Title>
            <BigButton onClick={() => {
                navigate("/punto/nueva-orden")
            }}>Nueva orden</BigButton>
            <GridLayout>
                {
                    orders.map(order => {
                        return <CardOrder key={order.id} order={order} />
                    })
                }
            </GridLayout>
        </PageLayout>
    )
}

export default VentasPage