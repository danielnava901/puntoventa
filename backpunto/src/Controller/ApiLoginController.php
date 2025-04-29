<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\AuthService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ["POST"])]
    public function login(
        Request $request,
        EntityManagerInterface $em,
        AuthService $authService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        if (!$email) {
            return $this->json([
                'error' => 'Email is required'
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $result = $authService->handleLoginOrRegister($email);
            $user = $result["user"];
            $token = $result["token"];
        }catch (\Exception $e) {
            return $this->json([
                "data" => null,
                "errors" => [$e->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        }


        return $this->json([
            "data" => [
                'user' => $user->getUserIdentifier(),
                'token' => $token,
            ],
        ]);
    }
}
