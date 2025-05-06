from backpuntodj.models.category import Category
from backpuntodj.models.product import Product


class ProductService:

    @staticmethod
    def create_product(name, price):
        category = Category.objects.get(pk=1)
        product = Product.objects.create(
            name=name,
            unit_price=float(price),
            category=category
        )

        return product
