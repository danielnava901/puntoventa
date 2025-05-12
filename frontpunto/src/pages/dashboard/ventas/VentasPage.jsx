import {useEffect, useState} from "react";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import PageLayout from "../PageLayout.jsx";
import Title from "../../../components/Title.jsx";
import {CardOrder} from "../../../components/CardOrder";
import {BigButton} from "../../../components/BigButton";
import {GridLayout} from "../../../components/GridLayout";
import useOrders from "../../../hooks/useOrders.js";

const VentasPage = () => {
    const navigate = useNavigate();
    const {orders, loading} = useOrders();

    if(loading) return <div>Cargando datos...</div>

    return (
        <PageLayout showHeader={false} extraCls="gap-4 mt-[10px] md:mt-0">
            <Title>Ordenes</Title>
            <BigButton onClick={() => {
                navigate("/punto/nueva-orden")
            }}>Nueva orden</BigButton>
            <GridLayout>
                {
                    orders.length === 0 && (
                        <p className="text-center text-gray-500">No hay órdenes registradas.</p>
                    )
                }
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