from django.db import models


class DoctrineMigrationVersions(models.Model):
    version = models.CharField(primary_key=True)
    executed_at = models.DateTimeField(blank=True, null=True)
    execution_time = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'doctrine_migration_versions'
