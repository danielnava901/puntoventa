import Input from "../../../components/Input.jsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import PageLayout from "../PageLayout.jsx";
import ProductList from "../../../components/ProductList.jsx";
import SimpleProductsTable from "../../../components/SimpleProductsTable.jsx";

const NewOrderPage = () => {
    const {token} = useUserStore(state => state);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [comensal, setComensal] = useState({
        value: "",
        type: "text",
        error: false
    });

    const onSelectProduct = (product) => {
        const existingProduct = products.find(p => p.id === product.id);
        let updatedProducts;

        if (existingProduct) {
            updatedProducts = products.map(prod => {
                if (prod.id === product.id) {
                    const newQuantity = prod.quantity + 1;
                    const newSubtotal = parseFloat(prod.unit_price) * newQuantity;
                    return {
                        ...prod,
                        quantity: newQuantity,
                        subtotal: newSubtotal
                    };
                }
                return prod;
            });
        } else {
            // Producto nuevo
            const newProduct = {
                id: product.id,
                name: product.name,
                quantity: 1,
                unit_price: parseFloat(product.unit_price),
                subtotal: parseFloat(product.unit_price)
            };
            updatedProducts = [...products, newProduct];
        }

        setProducts(updatedProducts);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(comensal.error || comensal.value.trim().length === 0) {
            alert("Ingrese el nombre del comensal")
            return;
        }

        const response = await sender({
            url: "http://localhost:8000/api/order/new",
            data: {
                order_name: comensal.value,
                products
            },
            token
        });

        if(!!response) {
            const {data} = response;
            navigate(`/punto/orden/${data.id}`)
        }else {
            navigate(`/punto`);
        }
    }

    return (
        <PageLayout showHeader={false}>
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex justify-end">
                    <span className="text-4xl font-bold cursor-pointer hover:opacity-75"
                          onClick={() => {
                              navigate("/punto")
                          }}
                    >&times;</span>
                </div>
                <form onSubmit={onSubmit} className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <Input
                            sty="underline"
                            input={comensal}
                            onChange={(newInput) => {
                                setComensal(newInput)
                            }} />
                        <span className="text-xl font-bold">Comensal</span>
                        <ProductList onClickProduct={(product) => {
                            onSelectProduct(product)
                        }}/>
                        <button type="submit" className="
                            bg-red-400
                            p-2 rounded
                            hover:cursor-pointer
                            hover:opacity-75
                            text-white
                        ">Crear orden</button>
                    </div>
                    <div>
                        {
                            products.length > 0 ? <SimpleProductsTable products={products} /> : null
                        }
                    </div>
                </form>
            </div>
        </PageLayout>
    )
}


export default NewOrderPage;