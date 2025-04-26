import PageLayout from "../PageLayout.jsx";
import {ProductsTable} from "../../../components/ProductsTable";
import useOrderProducts from "../../../hooks/useOrderProducts.js";
import {useEffect, useState} from "react";
import DateInput from "../../../components/DateInput.jsx";

export const ReportPage = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();;
    const [desde, setDesde] = useState(yesterday)
    const [hasta, setHasta] = useState(today)
    const {products} = useOrderProducts(desde, hasta);


    return (
        <PageLayout showHeader={false}>
            <div className="w-full flex">
                <span>Reporte de ventas</span>
            </div>
            <div className="w-full flex gap-4">
                <div className="flex flex-col">
                    <label htmlFor="desde" className="font-bold">Desde</label>
                    <DateInput
                        initialDate={desde}
                        onChange={({date, seconds}) => {
                            console.log({date, seconds});
                            setDesde(seconds);
                        }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="hasta" className="font-bold">Hasta</label>
                    <DateInput
                        initialDate={hasta}
                        onChange={({date, seconds}) => {
                            console.log({date, seconds});
                            setHasta(seconds);
                        }} />
                </div>
            </div>
            <div>
                <ProductsTable products={products} />
            </div>
        </PageLayout>
    )
}