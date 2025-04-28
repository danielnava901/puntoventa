import {useEffect, useState} from "react";
import Modal from "./Modal.jsx";
import Title from "./Title.jsx";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";

export const NewProductForm = ({onAddProduct}) => {
    const {token} = useUserStore(state => state);
    const initValue = {name: "", quantity: 1, price: 0.00, error: false};
    const [isOpen, setIsOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(initValue);

    const onCreateProduct = async () => {
        if(newProduct.name.trim().length === 0) {
            alert("Falta el nombre del producto");
            return;
        }

        if(newProduct.price <= 0) {
            alert("Falta el precio del producto");
            return;
        }

        let response = await sender({
            url: "http://localhost:8000/api/product/new",
            data: newProduct,
            token
        });

        console.log(response);
        onAddProduct(response.product);
        setIsOpen(false);
        setNewProduct(initValue);
    }


    return (
        <div className="w-full">
            <div className="text-right">
                <span className="underline text-blue-800 cursor-pointer"
                      onClick={() => {
                          setIsOpen(true);
                      }}>Nuevo producto
                </span>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setNewProduct(initValue);
                    setIsOpen(false)
                }}
                footer={
                    <button
                        className="px-4
                        py-2
                        bg-gray-800
                        text-white
                        rounded
                        hover:opacity-75
                        cursor-pointer
                    "
                        onClick={() => {
                            onCreateProduct();
                        }}
                    >
                        Agregar
                    </button>
                }
            >
                <div className="mb-8">
                    <Title isSubtitle={true}>Agregar un nuevo producto</Title>
                </div>
                <div className="flex gap-4 w-full">

                    <div className="flex-1 flex flex-col">
                        <span>Producto</span>
                        <input type="text"
                               value={newProduct.name}
                               className="w-full border border-gray-400"
                               onChange={(ev) => {
                                   let {target: {value}} = ev;
                                   setNewProduct({...newProduct,
                                       name: value,
                                       error: value.trim().length === 0
                                   })
                               }}
                        />
                    </div>
                    <div className="w-[65px] flex flex-col">
                        <span>Cantidad</span>
                        <input type="number"
                               className="w-full border border-gray-400"
                               min={1}
                               value={newProduct.quantity}
                               onChange={(ev) => {
                                   let {target: {value}} = ev;
                                   setNewProduct({...newProduct,
                                       quantity: value,
                                       error: value.trim().length === 0
                                   })

                               }}
                        />
                    </div>
                    <div className="w-[85px] flex flex-col ">
                        <span>$ x Unid</span>
                        <input type="number"
                               className="w-full border border-gray-400"
                               min={1}
                               value={newProduct.price}
                               onChange={(ev) => {
                                   let {target: {value}} = ev;
                                   setNewProduct({...newProduct,
                                       price: value,
                                       error: value.trim().length === 0
                                   })

                               }}
                        />
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default NewProductForm;