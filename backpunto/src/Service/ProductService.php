<?php

namespace App\Service;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\OrderProductRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;

class ProductService
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProductRepository $productRepository,
        private CategoryRepository $categoryRepository
    ) {}

    public function getBySearch(string $search): array
    {
        $products = $this->productRepository
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

        return $productArray;
    }

    public function createProduct($name, $price): object|bool
    {
        $existingProduct = $this->productRepository->findOneBy(["name" => $name]);
        $category = $this->categoryRepository->find(1);

        if(!$category) {
            return false;
        }

        if($existingProduct) return $existingProduct;

        $newProduct = new Product();
        $newProduct->setName($name)
            ->setCategory($category)
            ->setUnitPrice($price)
        ;

        $this->entityManager->persist($newProduct);
        $this->entityManager->flush();

        return $newProduct;
    }
}