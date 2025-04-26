import consts from "../consts.js";
import {useNavigate} from "react-router";

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
            <div >
                <div className="">#{order.id}{` `}</div>
                <div className="fond-bold text-lg">{order.order_name}</div>
                <div className="fond-bold text-sm">${order.total}</div>
            </div>
            <div className="text-xs">{order.diff}</div>
        </div>
    )
}