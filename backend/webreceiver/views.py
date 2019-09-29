from __future__ import unicode_literals
import ast
import subprocess
import json
import string
import random

from django.shortcuts import render
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from webreceiver.models import Users, Promises, Payments

from collections import namedtuple

def randomString(stringLength):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(stringLength))

# Create your views here.
@csrf_exempt
def submituser(request):
	data = json.loads(request.body)
	db_add_user(data['userid'], data['promises'])
	response = HttpResponse('OK', content_type='application/json')
	return response

def db_add_user(userid, promises):
	r = Users(userid=int(userid), promises=[int(x) for x in promises.split(',')])
	r.save()

@csrf_exempt
def submitpromise(request):
	data = json.loads(request.body)
	data['promiseid'] = randomString(20)
	print(data)
	db_add_promise(data['promiseid'], data['description'], data['userid'],
				   data['metrics'], data['category'], data['wall_pub'], data['story_pub'],
				   data['exp_date'], data['pub_date'], data['transactions'],
				   data['usercity'], data['userphoto'], data['username'],
				   data['usersurname'])
	response = HttpResponse('OK', content_type='application/json')
	return response

def db_add_promise(promiseid, desc, userid, metrics, category, wall_pub, story_pub,
				   exp_date, pub_date, transactions, usercity, userphoto,
				   username, usersurname):
	r = Promises(promiseid=promiseid, userid=int(userid), description=desc,
				 metrics=metrics, category=category, wall_pub=wall_pub, 
				 story_pub=story_pub, exp_date=exp_date, pub_date=exp_date,
				 transactions=transactions, usercity=usercity, userphoto=userphoto,
				 username=username, usersurname=usersurname)
	r.save()
	if (Users.objects.filter(userid=userid)):
		selected_promises = Users.objects.filter(userid=userid)[0].promises
	else:
		selected_promises = []
	selected_promises.append(promiseid)
	r = Users(userid=int(userid), promises=selected_promises)
	r.save()

@csrf_exempt
def submitpayment(request):
	data = json.loads(request.body)
	data['paymentid'] = randomString(20)
	db_add_payment(data['paymentid'], data['sender'], data['promiseid'],
				   data['amount'], data['photo'])
	response = HttpResponse('OK', content_type='application/json')
	return response

def db_add_payment(paymentid, sender, promiseid, amount, photo):
	r = Payments(paymentid=paymentid, sender=int(sender),
				 promiseid=promiseid, amount=amount,
				 photo=photo)
	r.save()
	promise = Promises.objects.filter(promiseid=promiseid)[0]
	selected_transactions = Promises.objects.filter(promiseid=promiseid)[0].transactions
	selected_transactions.append(paymentid)
	r = Promises(userid=promise.userid, promiseid=promise.promiseid, description=promise.description,
				 metrics=promise.metrics, category=promise.category,
				 wall_pub=promise.wall_pub, story_pub=promise.story_pub, exp_date=promise.exp_date,
				 pub_date=promise.pub_date, transactions=selected_transactions,
				 usercity=promise.usercity, userphoto=promise.userphoto, image=promise.image,
				 username=promise.username, usersurname=promise.usersurname)
	r.save()

def submitimage(request):
	info = json.loads(request.body)
	promiseid = info['promiseid']
	image = info['image']
	promise = Promises.objects.filter(promiseid=promiseid)[0]
	r = Promises(userid=promise.userid, promiseid=promise.promiseid, description=promise.description,
				 metrics=promise.metrics, category=promise.category,
				 wall_pub=promise.wall_pub, story_pub=promise.story_pub, exp_date=promise.exp_date,
				 pub_date=promise.pub_date, transactions=promise.transactions, image=image,
				 usercity=promise.usercity, userphoto=promise.userphoto,
				 username=promise.username, usersurname=promise.usersurname)
	r.save()

'''
	=================================================================
	========================= GET REQUESTS ==========================
	=================================================================
'''
@csrf_exempt
def getpromises(request):
	objects = Promises.objects.all()
	obj2 = Payments.objects.all()
	promises = [{'promiseid': o.promiseid,
			     'userid': o.userid,
			     'description': o.description,
			     'metrics': o.metrics,
			     'category': o.category,
			     'wall_pub': o.wall_pub,
			     'story_pub': o.story_pub,
			     'exp_date': o.exp_date,
			     'pub_date': o.pub_date,
			     'image' : o.image,
			     'transactions': [{'paymentid': x.paymentid,
				 				   'sender': x.sender,
								   'promiseid': x.promiseid,
								   'amount': x.amount,
								   'photo': x.phoot} for x in [Payments.objects.filter(paymentid=x)[0] for x in o.transactions]],
			     'usercity': o.usercity,
			     'userphoto': o.userphoto,
			     'username': o.username,
			     'usersurname': o.usersurname} for o in objects]
	print(promises)
	response = JsonResponse(promises, safe=False)
	print(response)
	return response

@csrf_exempt
def getprombyusers(request):
	print("hui")
	users_id = json.loads(request.body)['ids']
	promises = []
	for user in users_id:
		if (Promises.objects.filter(userid=user)):
			promises = Promises.objects.filter(userid=user)
	response = JsonResponse([{'promiseid': o.promiseid,
							  'userid': o.userid,
							  'description': o.description,
							  'metrics': o.metrics,
							  'category': o.category,
							  'wall_pub': o.wall_pub,
							  'story_pub': o.story_pub,
							  'exp_date': o.exp_date,
							  'pub_date': o.pub_date,
							  'image': o.image,
							  'transactions': o.transactions,
							  'usercity': o.usercity,
							  'userphoto': o.userphoto,
							  'username': o.username,
							  'usersurname': o.usersurname}
			   for o in promises], safe=False)
	print(response)
	return response

def index(request):
	rs1 = Users.objects.all()
	rs2 = Promises.objects.all()
	rs3 = Payments.objects.all()
	context = {'user_list': rs1, 'promise_list': rs2, 'payment_list': rs3}
	return render(request, 'webreceiver/index.html', context)
