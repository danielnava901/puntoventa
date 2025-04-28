export const ProductsTable = ({products}) => {
    const formatted = (number) => {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    return (
        <div className="w-full overflow-auto flex-1">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cantidad</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
                </tr>
                </thead>
            </table>
            <div className="overflow-auto max-h-[calc(100vh-300px)]">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{product.product_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{product.quantity}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">${formatted(product.price)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}