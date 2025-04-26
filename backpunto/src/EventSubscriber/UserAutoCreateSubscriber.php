<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Event\CheckPassportEvent;

class UserAutoCreateSubscriber implements EventSubscriberInterface
{
    private $em;

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    public function onCheckPassportEvent(CheckPassportEvent $event): void
    {
        $passport = $event->getPassport();
        $userBadge = $passport->getBadge(UserBadge::class);
        $email = $userBadge->getUserIdentifier();

        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            $user = new User();
            $user->setEmail($email);
            $this->em->persist($user);
            $this->em->flush();
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CheckPassportEvent::class => 'onCheckPassportEvent',
        ];
    }
}
