import PageLayout from "../PageLayout.jsx";
import {ProductsTable} from "../../../components/ProductsTable";
import useOrderProducts from "../../../hooks/useOrderProducts.js";
import {useEffect, useState} from "react";
import DateInput from "../../../components/DateInput.jsx";
import Title from "../../../components/Title.jsx";

export const ReportPage = () => {
    const today = new Date();
    const [desde, setDesde] = useState(today);
    const [hasta, setHasta] = useState(today);
    const [desdeEpoch, setDesdeEpoch] = useState(Math.floor(
        new Date(today.setHours(0, 0, 0, 0)).getTime() / 1000));
    const [hastaEpoch, setHastaEpoch] = useState(Math.floor(
        new Date(today.setHours(23, 59, 59, 999)).getTime() / 1000
    ));
    const {products} = useOrderProducts(desdeEpoch, hastaEpoch);


    return (
        <PageLayout showHeader={false}>
            <div className="w-full flex mb-6">
                <Title>Reporte de ventas</Title>
            </div>
            <div className="w-full flex gap-4 flex-wrap">
                <div className="flex flex-col">
                    <label htmlFor="desde" className="font-bold">Desde</label>
                    <DateInput
                        initialDate={desde}
                        name="desde"
                        onChange={({date, seconds}) => {
                            console.log({date, seconds});
                            setDesde(date);
                            setDesdeEpoch(seconds);
                        }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="hasta" className="font-bold">Hasta</label>
                    <DateInput
                        initialDate={hasta}
                        name="hasta"
                        onChange={({date, seconds}) => {
                            console.log({date, seconds});
                            setHasta(date);
                            setHastaEpoch(seconds);
                        }} />
                </div>
            </div>
            <div className="w-full mt-8 flex flex-col overflow-auto max-h-[350px] md:max-h-full">
                <ProductsTable products={products} />
            </div>
        </PageLayout>
    )
}