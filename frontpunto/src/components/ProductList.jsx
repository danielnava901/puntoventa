import {useState} from "react";
import useProducts from "../hooks/useProducts.js";
import Input from "./Input.jsx";
import {GridLayout} from "./GridLayout";
import CardProduct from "./CardProduct.jsx";

const ProductList = ({onClickProduct, extClass=""}) => {
    const [search, setSearch] = useState({value: "",
        error: false, type: "text", placeholder: "Buscar producto"})
    const {products} = useProducts(search.value);

    return <div className={`flex flex-col gap-4 ${extClass}`}>
        <Input
            input={search}
            sty="search"
            onChange={(input) => {setSearch(input)}} />

        <GridLayout>
            {
                products.map(product => {
                    return <CardProduct onClickProduct={onClickProduct} product={product} />
                })
            }
        </GridLayout>
    </div>
}

export default ProductList;