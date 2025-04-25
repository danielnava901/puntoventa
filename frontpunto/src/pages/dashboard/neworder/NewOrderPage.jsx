import Input from "../../../components/Input.jsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import {sender} from "../../../utils/sender.js";
import useUserStore from "../../../store/useUserStore.jsx";
import PageLayout from "../PageLayout.jsx";

const NewOrderPage = () => {
    const {token} = useUserStore(state => state);
    const navigate = useNavigate();
    const [comensal, setComensal] = useState({
        value: "",
        type: "text",
        error: false
    });

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(comensal.error) {
            alert("Ingrese el nombre del comensal")
            return;
        }

        const response = await sender({
            url: "http://localhost:8000/api/order/new",
            data: {order_name: comensal.value},
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
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col items-center gap-4 my-8 w-1/4">
                    <Input
                        sty="underline"
                        input={comensal}
                        onChange={(newInput) => {
                            setComensal(newInput)
                        }} />
                    <span className="text-xl font-bold">Comensal</span>
                    <button type="submit" className="
                        bg-red-400
                        p-2 rounded
                        hover:cursor-pointer
                        hover:opacity-75
                        text-white
                        ">Crear orden</button>
                </form>
            </div>
        </PageLayout>
    )
}


export default NewOrderPage;