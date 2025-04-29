<?php

namespace App\Controller;

use App\Repository\OrderProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/orderProduct', name: 'app_order_product')]
final class OrderProductController extends AbstractController
{
    /**
     * @throws \Doctrine\DBAL\Exception
     */
    #[Route('/', name: 'app_order_product_all', methods: ["GET"])]
    public function getAll(
        Request $request,
        OrderProductRepository $orderProductRepository
    ): JsonResponse
    {
        $desde = $request->query->get("desde", null);
        $hasta = $request->query->get("hasta", null);


        if( !isset($desde)  ||
            !isset($hasta)
        ) {
            return $this->json([
                "error" => "No hay datos"
            ], Response::HTTP_BAD_REQUEST);
        }

        $products = $orderProductRepository->getAllOrderProducts($desde, $hasta);

        return $this->json([
            "data" => $products,
            "errors" => []
        ]);
    }
}
