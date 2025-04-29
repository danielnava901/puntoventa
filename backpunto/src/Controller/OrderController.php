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
use App\Service\OrderService;
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
            "data" => $orderArray,
            "errors" => [],
        ], Response::HTTP_OK);
    }


    #[Route('/', name: 'order_new_user_order', methods: ["POST"])]
    public function newUserOrder(
        #[CurrentUser] User $user,
        Request $request,
        OrderService $orderService
    ) : JsonResponse
    {

        //$logger->debug("ENTRAMOS .... !!!!!!!!!!!!!!!!!!!!!");
        $data = json_decode($request->getContent(), true);

        if( empty($data) ||
            !isset($data["order_name"])  ||
            strlen(trim($data["order_name"])) === 0
        ) {
            return $this->json([
                "data" => null,
                "errors" => ["No hay datos"]
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $order = $orderService->createOrder($user, $data['order_name'], $data['products'] ?? []);
        } catch (\Exception $e) {
            return $this->json([
                "data" => null,
                "errors" => [$e->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            "data" => $order->toArray(),
            "errors" => []
        ], Response::HTTP_CREATED);
    }


    #[Route('/{orderId}', name: 'order_get_order', methods: ["GET"])]
    public function getOrder(Request $request,
                             int $orderId,
                             OrderRepository $orderRepository): JsonResponse
    {
        $order = $orderRepository->find($orderId);

        return $this->json([
            "data" => $order->toArray(),
            "errors" => []
        ]);
    }



    #[Route('/{orderId}/products', name: 'order_add_product_to_order', methods: ["POST"])]
    public function addProduct(Request $request,
        int $orderId,
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        OrderService $orderService
    ): JsonResponse
    {
        $quantity = $request->query->get("quantity", 1);
        $data = json_decode($request->getContent(), true);
        $productId = $data["productId"];

        $orderProduct = $orderService->addOrderProduct($orderId, $productId, $quantity);


        if(!$orderProduct) {
            return $this->json([
                "errors" => ["Order or product not found"]
            ], Response::HTTP_NOT_FOUND);
        }


        return $this->json([
            "data" => [
                "product_id" => $productId,
                "order_id" => $orderId,
                'order_product' => $orderProduct->toArray()
            ],
            "erros" => [],
        ]);
    }



    #[Route('/{orderId}', name: 'order_close_order', methods: ["PATCH"])]
    public function closeOrder(
        Request $request,
        int $orderId,
        OrderService $orderService
    ): JsonResponse
    {
        $order = $orderService->close($orderId);

        if(!$order) {
            $this->json([
                "data" => null,
                "errors" => ["Order not find"]
            ]);
        }

        return $this->json([
            "data" => [
                "order" => $order->toArray(),
                "status" => OrderStatus::STATUS_CLOSED,
            ],
            "errors" => []
        ]);
    }

}
