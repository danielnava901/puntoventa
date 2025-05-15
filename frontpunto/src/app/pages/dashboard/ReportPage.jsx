import PageLayout from "../../components/layouts/PageLayout.jsx";
import {ProductsTable} from "../../components/molecules/ProductsTable.jsx";
import useOrderProducts from "../../../hooks/useOrderProducts.js";
import {useState} from "react";
import DateInput from "../../components/atoms/DateInput.jsx";
import Title from "../../components/atoms/Title.jsx";

const toEpochStart = (date) =>
    Math.floor(new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), 0, 0, 0).getTime() / 1000);
const toEpochEnd = (date) =>
    Math.floor(new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), 23, 59, 59, 999).getTime() / 1000);


export const ReportPage = () => {
    const today = new Date();
    const [range, setRange] = useState({
        desde: today,
        hasta: today,
        desdeEpoch: toEpochStart(today),
        hastaEpoch: toEpochEnd(today),
    });
    const {products} = useOrderProducts(range.desdeEpoch, range.hastaEpoch);


    return (
        <PageLayout showHeader={false}>
            <div className="w-full flex mb-6">
                <Title>Reporte de ventas</Title>
            </div>
            <div className="w-full flex gap-4 flex-wrap">
                <div className="flex flex-col">
                    <label htmlFor="desde" className="font-bold">Desde</label>
                    <DateInput
                        initialDate={range.desde}
                        name="desde"
                        onChange={({date, seconds}) => {
                            //setDesde(date);
                            //setDesdeEpoch(seconds);

                            setRange(prev => ({
                                ...prev,
                                desde: date,
                                desdeEpoch: toEpochStart(new Date(date))
                            }));
                        }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="hasta" className="font-bold">Hasta</label>
                    <DateInput
                        initialDate={range.hasta}
                        name="hasta"
                        onChange={({date, seconds}) => {
                            //setHasta(date);
                            //setHastaEpoch(seconds);
                            console.log({date})
                            setRange(prev => ({
                                ...prev,
                                hasta: date,
                                hastaEpoch: toEpochStart(new Date(date))
                            }));
                        }} />
                </div>
            </div>
            <div className="w-full mt-8 flex flex-col flex-1 overflow-auto">
                <ProductsTable products={products} />
            </div>
        </PageLayout>
    )
}