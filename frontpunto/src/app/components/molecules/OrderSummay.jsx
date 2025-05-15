import Text from '../atoms/Text.jsx'
import Heading from "../atoms/Heading.jsx";

const OrderSummay = ({order}) => {

    return (
        <div>
            <Text className="" >#{order.id}{` `}</Text>
            <Heading className="fond-bold text-lg">{order.order_name}</Heading>
            <Text className="fond-bold text-sm">${order.total}</Text>
        </div>
    )
}

export default OrderSummay;