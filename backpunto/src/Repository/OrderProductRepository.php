<?php

namespace App\Repository;

use App\Entity\OrderProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OrderProduct>
 */
class OrderProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderProduct::class);
    }

    //    /**
    //     * @return OrderProduct[] Returns an array of OrderProduct objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('o')
    //            ->andWhere('o.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('o.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?OrderProduct
    //    {
    //        return $this->createQueryBuilder('o')
    //            ->andWhere('o.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }


    /**
     * @throws \Doctrine\DBAL\Exception
     */
    public function getAllOrderProducts($desde, $hasta)
    {
        $cn = $this->getEntityManager()->getConnection();

        $stmt = $cn->executeQuery("
            SELECT 
                p.id as product_id, 
                p.name as product_name,
                SUM(op.quantity) as quantity,
                printf('%.2f', SUM(op.price)) as price
            FROM order_product op
                JOIN `order` on `order`.id = op.order_id_id
                JOIN product p on op.product_id = p.id
            WHERE 
                strftime('%s', op.created_at) BETWEEN :desde AND :hasta
            GROUP BY p.name   
            ORDER BY  SUM(op.price) DESC
        ", [
            "desde" => $desde,
            "hasta" => $hasta
        ]);

        return $stmt->fetchAllAssociative();
    }
}
