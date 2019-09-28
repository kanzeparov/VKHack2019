from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date
from django.contrib.postgres.fields import ArrayField

class Users(models.Model):
        userid = models.BigIntegerField(default=0, primary_key=True)
        promises = ArrayField(models.TextField(default=""))
        debted = models.IntegerField(default=0)
        paid = models.IntegerField(default=0)

class Promises(models.Model):
        promiseid = models.TextField(default="", primary_key=True)
        userid = models.BigIntegerField(default=0)
        description = models.TextField(default="")
        metrics = models.TextField(default="")
        category = models.IntegerField(default=0)
        wall_pub = models.BooleanField(default=False)
        story_pub = models.BooleanField(default=False)
        exp_date = models.BigIntegerField(default=0)
        pub_date = models.BigIntegerField(default=0)
        transactions = ArrayField(models.TextField(default=""))
        
class Payments(models.Model):
        paymentid = models.TextField(default="")
        sender = models.BigIntegerField(default=0)
        receiver = models.BigIntegerField(default=0)
        amount = models.BigIntegerField(default=0)