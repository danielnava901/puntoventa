import consts from "../../consts.js";
import OrderSummay from "../molecules/OrderSummay.jsx";
import Text from "../atoms/Text.jsx";

export const CardOrder = ({order, onClick}) => {
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
        onClick={onClick}
        >
            <OrderSummay order={order} />
            <Text className="text-xs">{order.diff}</Text>
        </div>
    )
}