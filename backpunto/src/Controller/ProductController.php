<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;


#[Route('/api/product')]
final class ProductController extends AbstractController
{
    #[Route('/', name: 'product_get_all', methods: ["GET"])]
    public function getProducts(
        Request $request,
        ProductRepository $productRepository,
        LoggerInterface $logger
    ): JsonResponse
    {
        $search = $request->query->get("search", "");
        $logger->debug("SEARCHHHHHHHH ".$search);

        $products = $productRepository
            ->createQueryBuilder('product')
            ->where("product.name LIKE :search ")
            ->setParameter('search', '%' . $search . '%')
            ->getQuery()
            ->getResult()
        ;

        $productArray = [];
        foreach ($products as $product) {
            $productArray[] = $product->toArray();
        }

        return $this->json([
            "products" => $productArray
        ]);
    }


}
