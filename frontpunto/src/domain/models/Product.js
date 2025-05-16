
export default class Product {

    constructor(id, name, price) {
        if (!name) throw new Error("Product must have a name");
        if (price <= 0) throw new Error("Price must be positive");

        this.id = id;
        this.name = name;
        this.price = price;
    }


}