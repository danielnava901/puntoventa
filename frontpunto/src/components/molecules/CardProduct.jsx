import Text from "../atoms/Text.jsx";

const CardProduct = ({product, onClickProduct}) => {
    return <div className="
        flex
        flex-col
        px-4
        py-2
        shadow
        bg-white
        cursor-pointer
        hover:opacity-75
        text-sm
        md:text-md
    "
    onClick={() => {
        onClickProduct(product)
    }}
    >
        <Text className="font-bold">{product.name}</Text>
        <Text className="text-sm">${product.unit_price}</Text>
    </div>
}

export default CardProduct;