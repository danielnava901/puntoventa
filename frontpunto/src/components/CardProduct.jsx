const CardProduct = ({product, onClickProduct}) => {
    return <div className="flex
                    flex-col
                    px-4
                    py-2
                    shadow
                    bg-white
                    cursor-pointer
                    hover:opacity-75
                "
    onClick={() => {
        onClickProduct(product)
    }}
    >
        <div>
            <div>{product.name}</div>
            <div>${product.unit_price}</div>
        </div>
    </div>
}

export default CardProduct;