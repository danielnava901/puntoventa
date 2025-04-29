<?php

namespace App\Service;

use App\consts\OrderStatus;
use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Entity\User;
use App\Repository\OrderProductRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;

class OrderService
{

    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProductRepository $productRepository,
        private OrderRepository $orderRepository,
        private OrderProductRepository $orderProductRepository
    ) {}


    public function addProducts(Order $order, array $products = []): array
    {
        $total = 0.00;

        foreach ($products as $product) {
            $productObj = $this->productRepository->find($product["id"]);
            if(!$productObj) continue;

            $newOrderProduct = new OrderProduct();
            $newOrderProduct
                ->setOrderId($order)
                ->setQuantity($product["quantity"])
                ->setPrice((float)$product["quantity"] * $product["unit_price"])
                ->setCreatedAt(new \DateTimeImmutable())
                ->setProduct($productObj)
            ;
            $this->entityManager->persist($newOrderProduct);

            $total = $total + (float)$product["quantity"] * $product["unit_price"];
        }

        $order->setTotal($total);
        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $order->getOrderProducts()->toArray();
    }

    public function createOrder(User $user, string $orderName, array $products = []) : Order
    {

        $order = $this->orderRepository->createSimpleOrder($user, $orderName);

        if(isset($products)) {
            $this->addProducts($order, $products);
        }

        return $order;
    }

    public function addOrderProduct($orderId, $productId, $quantity)
    {
        $order = $this->orderRepository->find($orderId);
        $product = $this->productRepository->find($productId);

        if(!$order || !$product) {
            return false;
        }

        $orderTotal = $order->getTotal();
        $orderProduct = $this->orderProductRepository->createQueryBuilder("op")
            ->where(" op.orderId = :orderId ")
            ->andWhere(" op.product = :productId")
            ->setParameter("orderId", $orderId)
            ->setParameter("productId", $productId)
            ->getQuery()
            ->getResult()
        ;

        if(!empty($orderProduct)) {
            $orderProduct = $orderProduct[0];

            $prevQuantity = $orderProduct->getQuantity();
            $prevPrice = $orderProduct->getPrice();

            $orderTotal = $orderTotal + ($product->getUnitPrice() * $quantity );
            $orderProduct->setQuantity($prevQuantity + $quantity);
            $orderProduct->setPrice($prevPrice + ($product->getUnitPrice() * $quantity ));

        }else {

            $orderProduct = new OrderProduct();
            $orderTotal = $orderTotal + $product->getUnitPrice() * $quantity;
            $orderProduct
                ->setOrderId($order)
                ->setProduct($product)
                ->setPrice($product->getUnitPrice() * $quantity)
                ->setCreatedAt(new \DateTimeImmutable())
                ->setQuantity($quantity)
            ;

        }

        $order->setTotal($orderTotal);
        $this->entityManager->persist($orderProduct);
        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $orderProduct;

    }

    public function close($orderId): object|bool
    {
        $order = $this->orderRepository->find($orderId);
        if(!$order) return false;

        $order->setStatus(OrderStatus::STATUS_CLOSED);
        $order->setClosedAt(new \DateTimeImmutable());

        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $order;
    }
}