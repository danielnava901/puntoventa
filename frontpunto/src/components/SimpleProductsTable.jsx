const SimpleProductsTable = ({products, extraCls = ""}) => {
    return <div className={`overflow-x-auto w-full ${extraCls}`}>
        <table className="
                    w-full
                    divide-y
                    divide-gray-200
                    ">
        <thead className="bg-gray-100">
            <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cantidad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {
            products.map(product => {
                return <tr key={product.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{product.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">${product.subtotal}</td>
                </tr>
            })
        }
        </tbody>
    </table>
    </div>
}

export default SimpleProductsTable;