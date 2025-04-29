<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use App\Service\OrderService;
use App\Service\ProductService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


#[Route('/api/product')]
final class ProductController extends AbstractController
{
    #[Route('/', name: 'product_get_all', methods: ["GET"])]
    public function getProducts(
        Request $request,
        ProductService $productService,
        LoggerInterface $logger
    ): JsonResponse
    {
        $search = $request->query->get("search", "");
        $logger->debug("SEARCHHHHHHHH ".$search);

        $products = $productService->getBySearch($search);

        return $this->json([
            "data" => $products,
            "errors" => []
        ]);
    }


    #[Route('/', name: 'product_new', methods: ["POST"])]
    public function create(
        Request $request,
        ProductService $productService,
        ProductRepository $productRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if(empty($data) || !isset($data["name"])) {
            return $this->json([
                "error" => "No data"
            ], Response::HTTP_BAD_REQUEST);
        }

        $name = $data["name"];
        $price = $data["price"];
        $quantity = $data["quantity"];

        $newProduct = $productService->createProduct($name, $price);

        if(!$newProduct) {
            return $this->json([
                "data" => null,
                "errors" => ["Error al crear producto"]
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        return $this->json([
            "data" => array_merge($newProduct->toArray(), ["quantity" => $quantity]),
            "errors" => []
        ], Response::HTTP_CREATED);
    }
}
