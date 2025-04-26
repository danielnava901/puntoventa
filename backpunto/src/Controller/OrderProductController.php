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
    #[Route('/all', name: 'app_order_product_all')]
    public function getAll(
        Request $request,
        OrderProductRepository $orderProductRepository
    ): JsonResponse
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        if( empty($data) ||
            !isset($data["desde"])  ||
            !isset($data["hasta"])
        ) {
            return $this->json([
                "error" => "No hay datos"
            ], Response::HTTP_BAD_REQUEST);
        }

        $products = $orderProductRepository->getAllOrderProducts($data["desde"], $data["hasta"]);

        return $this->json([
            "data" => $products
        ]);
    }
}
