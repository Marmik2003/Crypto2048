from django.db import models

# Create your models here.

class User(models.Model):
    wltaddr = models.CharField(primary_key=True, max_length=50)
    gamestate = models.CharField(max_length=1000)
    counter = models.IntegerField(default=0)