import Input from "../../components/atoms/Input.jsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import useUserStore from "../../../store/useUserStore.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import ProductList from "../../components/organisms/ProductList.jsx";
import SimpleProductsTable from "../../components/molecules/SimpleProductsTable.jsx";
import Title from "../../components/atoms/Title.jsx";
import PLink from "../../components/atoms/PLink.jsx";
import {Button} from "../../components/atoms/Button.jsx";
import useWindowWidth from "../../../hooks/useWindowWidth.js";
import Modal from "../../components/molecules/Modal.jsx";
import OrderRepository from "../../../domain/repositories/OrderRepository.js";
import OrderService from "../../../domain/services/OrderService.js";
import useSelectProducts from "../../../hooks/useSelectProducts.js";
import ProductService from "../../../domain/services/ProductService.js";
import ProductRepository from "../../../domain/repositories/ProductRepository.js";

const oderRepository = new OrderRepository();
const orderService = new OrderService(oderRepository);
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const NewOrderPage = () => {
    const {token} = useUserStore(state => state);
    const {width: windowWidth} = useWindowWidth();
    const {products, setProducts, totalUnitProducts} = useSelectProducts();
    const [showTable, setShowTable] = useState(false);
    const [comensal, setComensal] = useState({
        value: "",
        type: "text",
        error: false
    });
    const navigate = useNavigate();

    const onSelectProduct = (product) => {
        let updatedProducts = productService.updateProductList(product, products);
        setProducts(updatedProducts);
    }

    const redirectToOrderPage = (order) => {
        if(order?.id) {
            navigate(`/punto/orden/${order.id}`)
        }else {
            navigate(`/punto`);
        }
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const order = await orderService.createOrder(comensal.value, products, token);
            redirectToOrderPage(order);
        }catch (e) {
            alert(e.message);
        }
    }


    return (
        <PageLayout showHeader={false} >
            <div className="w-full flex items-center justify-between mb-8">
                <Title>Nueva Orden</Title>
                <PLink path="/punto"
                       extraCls="text-4xl font-bold cursor-pointer hover:opacity-75">&times;</PLink>
            </div>
            <div className="w-full flex gap-4 h-screen overflow-hidden">
                <div className="w-full md:min-w-1/2">
                    <div className="flex flex-col gap-4 h-screen overflow-hidden pb-8">
                        <Input
                            sty="underline"
                            input={comensal}
                            onChange={(newInput) => {
                                setComensal(newInput)
                            }} />
                        <div className="
                            flex
                            w-full
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
                        <div className="flex-1 overflow-auto mb-8">
                            <ProductList onClickProduct={(product) => {
                                onSelectProduct(product)
                            }}/>
                        </div>

                        <div className="h-[200px]">
                            <Button onClick={onSubmit}>
                                Crear orden
                            </Button>
                        </div>
                    </div>
                </div>

                {/*Muestra Si la pantalla es grande (web)*/}
                {
                    windowWidth > 768 ? <div className="md:min-w-1/2 overflow-auto flex-1">
                        <SimpleProductsTable products={products} />
                    </div> : null
                }

            </div>

            <Modal onClose={() => {setShowTable(false)}}
                   isOpen={windowWidth <= 768 && showTable}>
                <div className="flex-1 overflow-auto p-4">
                    <SimpleProductsTable products={products} />
                </div>
            </Modal>
        </PageLayout>
    )
}


export default NewOrderPage;