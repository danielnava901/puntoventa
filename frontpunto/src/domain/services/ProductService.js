export default class ProductService {

    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    updateProductList(product, products) {
        const existingProduct = products.find(p => p.id === product.id);
        let updatedProducts;

        if (existingProduct) {
            updatedProducts = products.map(prod => {
                if (prod.id === product.id) {
                    const newQuantity = prod.quantity + 1;
                    const newSubtotal = parseFloat(prod.unit_price) * newQuantity;
                    return {
                        ...prod,
                        quantity: newQuantity,
                        subtotal: newSubtotal
                    };
                }
                return prod;
            });
        } else {
            // Producto nuevo
            const newProduct = {
                id: product.id,
                name: product.name,
                quantity: product.quantity || 1,
                unit_price: parseFloat(product.unit_price),
                subtotal: parseFloat(product.unit_price) * parseFloat(product.quantity || 1)
            };
            updatedProducts = [...products, newProduct];
        }

        return updatedProducts;
    }

    async getProducts(search, token) {
        return await this.productRepository.getAllProducts(search, token);
    }
}