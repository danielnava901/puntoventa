import consts from "../../consts.js";
import {useNavigate} from "react-router";
import OrderSummay from "../molecules/OrderSummay.jsx";
import Text from "../atoms/Text.jsx";

export const CardOrder = ({order}) => {
    const navigate = useNavigate();
    return (
        <div className={`
            p-4
            flex
            rounded-tl
            rounded-tr
            cursor-pointer
            hover:opacity-75
            bg-white
            flex-col
            gap-4
            border-b-6 
            ${consts.status_border[order.status]}
        `}
        onClick={() => {
          navigate(`/punto/orden/${order.id}`)
        }}
        >
            <OrderSummay order={order} />
            <Text className="text-xs">{order.diff}</Text>
        </div>
    )
}