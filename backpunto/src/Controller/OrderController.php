<?php

namespace App\Controller;

use App\consts\OrderStatus;
use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Entity\User;
use App\Repository\OrderProductRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/order')]
final class OrderController extends AbstractController
{

    #[Route('/', name: 'order_get_all_by_user', methods: ["GET"])]
    public function getUserOrders(
        #[CurrentUser] User $user,
        OrderRepository $orderRepository,
        LoggerInterface $logger
    ): JsonResponse
    {
        $userId = $user->getId();
        $orders = $orderRepository->findBy([
            "user" => $userId,
            "status" => OrderStatus::STATUS_OPEN
        ]);
        $orderArray = [];
        foreach ($orders as $order) {
            $orderArray[] = $order->toArray();
        }

        return $this->json([
            "orders" => $orderArray,
        ], Response::HTTP_OK);
    }


    #[Route('/new', name: 'order_new_user_order', methods: ["POST"])]
    public function newUserOrder(
        #[CurrentUser] User $user,
        Request $request,
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        EntityManagerInterface $entityManager,
        LoggerInterface $logger
    ) : JsonResponse
    {

        $logger->debug("ENTRAMOS .... !!!!!!!!!!!!!!!!!!!!!");
        $data = json_decode($request->getContent(), true);

        if( empty($data) ||
            !isset($data["order_name"])  ||
            strlen(trim($data["order_name"])) === 0
        ) {
            return $this->json([
                "error" => "No hay datos"
            ], Response::HTTP_BAD_REQUEST);
        }

        $order = $orderRepository->createSimpleOrder($user, $data["order_name"]);

        if(isset($data["products"])) {
            $products = $data["products"];
            $total = 0.00;

            foreach ($products as $product) {
                $productObj = $productRepository->find($product["id"]);
                $newOrderProduct = new OrderProduct();
                $newOrderProduct
                    ->setOrderId($order)
                    ->setQuantity($product["quantity"])
                    ->setPrice((float)$product["quantity"] * $product["unit_price"])
                    ->setCreatedAt(new \DateTimeImmutable())
                    ->setProduct($productObj)
                ;
                $entityManager->persist($newOrderProduct);
                $entityManager->flush();

                $total = $total + (float)$product["quantity"] * $product["unit_price"];
            }

            $order->setTotal($total);
            $entityManager->persist($order);
            $entityManager->flush();
        }

        return $this->json([
            "data" => $order->toArray()
        ]);
    }


    #[Route('/{orderId}', name: 'order_get_order', methods: ["GET"])]
    public function getOrder(Request $request,
                             int $orderId,
                             OrderRepository $orderRepository): JsonResponse
    {
        $order = $orderRepository->find($orderId);

        return $this->json([
            "data" => $order->toArray()
        ]);
    }


    #[Route('/{orderId}/addProduct/{productId}', name: 'order_add_product_to_order',
        methods: ["POST"])]
    public function addProduct(Request $request,
        int $orderId,
        int $productId,
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        OrderProductRepository $orderProductRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $quantity = $request->query->get("quantity", 1);
        $order = $orderRepository->find($orderId);
        $product = $productRepository->find($productId);
        $orderTotal = $order->getTotal();

        $newOrderProduct = $orderProductRepository->createQueryBuilder("op")
            ->where(" op.orderId = :orderId ")
            ->andWhere(" op.product = :productId")
            ->setParameter("orderId", $orderId)
            ->setParameter("productId", $productId)
            ->getQuery()
            ->getResult()
        ;

        if(!empty($newOrderProduct)) {
            $newOrderProduct = $newOrderProduct[0];

            $prevQuantity = $newOrderProduct->getQuantity();
            $prevPrice = $newOrderProduct->getPrice();

            $orderTotal = $orderTotal + ($product->getUnitPrice() * $quantity );
            $newOrderProduct->setQuantity($prevQuantity + $quantity);
            $newOrderProduct->setPrice($prevPrice + ($product->getUnitPrice() * $quantity ));

        }else {
            $newOrderProduct = new OrderProduct();
            $orderTotal = $orderTotal + $product->getUnitPrice() * $quantity;
            $newOrderProduct
                ->setOrderId($order)
                ->setProduct($product)
                ->setPrice($product->getUnitPrice() * $quantity)
                ->setCreatedAt(new \DateTimeImmutable())
                ->setQuantity($quantity)
            ;

        }

        $order->setTotal($orderTotal);
        $entityManager->persist($newOrderProduct);
        $entityManager->persist($order);
        $entityManager->flush();



        return $this->json([
            "product_id" => $productId,
            "order_id" => $orderId,
            'order_product' => $newOrderProduct->toArray()
        ]);
    }


    #[Route('/{orderId}/getProducts', name: 'order_get_order_products', methods: ["GET"])]
    public function getOrderProducts(
        Request $request,
        int $orderId,
        OrderProductRepository $orderProductRepository
    ): JsonResponse
    {
        $oP = $orderProductRepository->find($orderId);


        return $this->json([
            "data" => $oP->toArray()
        ]);
    }


    #[Route('/{orderId}/close', name: 'order_close_order', methods: ["POST"])]
    public function closeOrder(
        Request $request,
        int $orderId,
        OrderRepository $orderRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $order = $orderRepository->find($orderId);
        $order->setStatus(OrderStatus::STATUS_CLOSED);
        $order->setClosedAt(new \DateTimeImmutable());

        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json([
            "order" => $order->toArray()
        ]);
    }

}
