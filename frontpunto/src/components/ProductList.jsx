import {useState} from "react";
import useProducts from "../hooks/useProducts.js";
import Input from "./Input.jsx";

const ProductList = ({onClickProduct}) => {
    const [search, setSearch] = useState({value: "", error: false, type: "text", placeholder: "Buscar producto"})
    const {products} = useProducts(search.value);

    return <div className="flex flex-col gap-4">
        <Input
            input={search}
            sty="search"
            onChange={(input) => {setSearch(input)}} />

        <div className="grid gap-4 auto-cols-max grid-flow-col">
            {
                products.map(product => {
                    return <div key={product.id}
                                className="flex
                                    flex-col
                                    px-4
                                    py-2
                                    shadow
                                    bg-white
                                    cursor-pointer
                                    hover:opacity-75
                                "
                                onClick={() => {
                                    onClickProduct(product)
                                }}
                    >
                        <div>
                            <div>{product.name}</div>
                            <div>${product.unit_price}</div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default ProductList;