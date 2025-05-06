from django.db import models


class User(models.Model):
    email = models.CharField(unique=True, max_length=255)
    roles = models.TextField()  # This field type is a guess.
    password = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'user'
