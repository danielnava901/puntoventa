from datetime import datetime
from django.db import connection


class OrderProductService:

    @staticmethod
    def get_products_by_date(desde, hasta):
        desde = datetime.fromtimestamp(int(desde)).strftime('%Y-%m-%d %H:%M:%S')
        hasta = datetime.fromtimestamp(int(hasta)).strftime('%Y-%m-%d %H:%M:%S')

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT 
                    p.id as product_id, 
                    p.name as product_name,
                    SUM(op.quantity) as quantity,
                    CAST(SUM(op.price) AS DECIMAL(10,2)) as price
                FROM order_product op
                    JOIN "order" on "order".id = op.order_id_id
                    JOIN product p on op.product_id = p.id
                WHERE 
                    op.created_at BETWEEN %s AND %s
                GROUP BY p.id, p.name   
                ORDER BY SUM(op.price) DESC
            """, [desde, hasta])
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
            print({
                "rows": rows
            })
            results = [dict(zip(columns, row)) for row in rows]

            return results
