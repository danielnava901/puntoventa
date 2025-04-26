<?php

namespace App\Repository;

use App\consts\OrderStatus;
use App\Entity\Order;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 */
class OrderRepository extends ServiceEntityRepository
{


    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

//    /**
//     * @return Order[] Returns an array of Order objects
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

//    public function findOneBySomeField($value): ?Order
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }


    public function createSimpleOrder(User $user, $orderName) : Order {
        $entityManager = $this->getEntityManager();

        $order = new Order();
        $order->setOrderName($orderName);
        $order->setUser($user);
        $order->setStatus(OrderStatus::STATUS_OPEN);
        $order->setCreatedAt(new \DateTimeImmutable());
        $order->setTotal(0.00);

        $entityManager->persist($order);
        $entityManager->flush();

        return $order;
    }
}
