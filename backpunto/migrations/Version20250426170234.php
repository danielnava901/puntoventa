<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250426170234 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO category (id, name) VALUES (1, 'Comidas')");
        $this->addSql("INSERT INTO category (id, name) VALUES (2, 'Bebidas')");
        $this->addSql("INSERT INTO category (id, name) VALUES (3, 'Postres')");

        $this->addSql("INSERT INTO product (id, category_id, name, unit_price) VALUES (1, 1, 'Taco al pastor', 12.00)");
        $this->addSql("INSERT INTO product (id, category_id, name, unit_price) VALUES (2, 2, 'Refresco', 21.00)");
        $this->addSql("INSERT INTO product (id, category_id, name, unit_price) VALUES (3, 1, 'Gringa', 59.00)");
        $this->addSql("INSERT INTO product (id, category_id, name, unit_price) VALUES (4, 3, 'Fresas con crema', 30.00)");

    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM category WHERE id IN (1,2,3)");
        $this->addSql("DELETE FROM product WHERE id IN (1,2,3,4)");

    }
}
