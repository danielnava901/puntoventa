const consts =  {
    OPEN: "Orden Abierta",
    CLOSED: "Orden cerrada",
    CANCELED: "Orden cancelada",
    status: {
        OPEN: "bg-green-700 text-white",
        CLOSED: "bg-gray-400 text-white",
        CANCELED: "bg-red-400 text-white",
        PENDING: "bg-blue-200 text-white",
    },
    status_border: {
        OPEN: "border-green-700",
        CLOSED: "border-gray-00",
        PENDING: "border-blue-200",
        CANCELED: "border-red-200"
    }
}

export default consts