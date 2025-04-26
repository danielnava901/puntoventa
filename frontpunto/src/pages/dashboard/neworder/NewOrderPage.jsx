import Input from "../../../components/Input.jsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import PageLayout from "../PageLayout.jsx";
import ProductList from "../../../components/ProductList.jsx";
import SimpleProductsTable from "../../../components/SimpleProductsTable.jsx";
import Title from "../../../components/Title.jsx";
import PLink from "../../../components/PLink.jsx";
import {Button} from "../../../components/Button";
import useWindowWidth from "../../../hooks/useWindowWidth.js";

const NewOrderPage = () => {
    const {token} = useUserStore(state => state);
    const {width: windowWidth} = useWindowWidth();
    const [products, setProducts] = useState([]);
    const [showTable, setShowTable] = useState(false);
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

    const totalUnitProducts = products.reduce((prev, currentValue) => {
        return prev + currentValue.quantity
    }, 0);

    return (
        <PageLayout showHeader={false}>
            <div className="w-full flex items-center justify-between mb-8">
                <Title>Nueva Orden</Title>
                <PLink path="/punto"
                       extraCls="text-4xl font-bold cursor-pointer hover:opacity-75">&times;</PLink>
            </div>
            <div className="w-full flex gap-4">
                <div className="w-full md:min-w-1/2">
                    <div className="flex flex-col gap-4">
                        <Input
                            sty="underline"
                            input={comensal}
                            onChange={(newInput) => {
                                setComensal(newInput)
                            }} />
                        <div className="
                            flex
                            w-full
                            items-center
                            justify-between
                            items-end
                        ">
                            <Title>Comensal</Title>
                            <span className="underline text-blue-800 cursor-pointer flex md:hidden"
                                  onClick={() => {
                                      setShowTable(prev => !prev);
                                  }}
                            >
                                Prod ({totalUnitProducts})
                            </span>
                        </div>
                        <ProductList
                            extClass="max-h-[280px]"
                            onClickProduct={(product) => {
                            onSelectProduct(product)
                        }}/>
                        <Button onClick={onSubmit}>
                            Crear orden
                        </Button>
                    </div>
                </div>
                {
                    windowWidth < 768 ?
                    (showTable ? <div
                            className="absolute z-1
                                top-12
                                left-0
                                right-0
                                bg-gray-200
                                h-full
                                flex
                                flex-col
                            ">
                            <div className="w-full flex justify-end px-8 my-6">
                                <Title onClick={() => {setShowTable(false)}}>&times;</Title>
                            </div>
                            <SimpleProductsTable products={products} />
                    </div> : null) :
                        <SimpleProductsTable products={products} />
                }

            </div>
        </PageLayout>
    )
}


export default NewOrderPage;