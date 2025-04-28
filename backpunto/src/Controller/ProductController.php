<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
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


    #[Route('/new', name: 'product_new_all', methods: ["POST"])]
    public function create(
        Request $request,
        CategoryRepository $categoryRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if(empty($data)) {
            return $this->json([
                "error" => "No data"
            ], Response::HTTP_BAD_REQUEST);
        }

        $name = $data["name"];
        $price = $data["price"];
        $quantity = $data["quantity"];

        $newProduct = new Product();
        $category = $categoryRepository->find(1);
        $newProduct->setName($name)
            ->setCategory($category)
            ->setUnitPrice($price)
        ;

        $entityManager->persist($newProduct);
        $entityManager->flush();


        return $this->json([
            "product" => array_merge($newProduct->toArray(), ["quantity" => $quantity])
        ]);
    }
}
