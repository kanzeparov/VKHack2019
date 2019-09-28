from __future__ import unicode_literals
import ast
import subprocess
import json

from django.shortcuts import render
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from webreceiver.models import Users, Promises, Payments

from collections import namedtuple

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
	db_add_promise(data['promiseid'], data['description'], data['userid'])
	response = HttpResponse('OK', content_type='application/json')
	return response

def db_add_promise(promiseid, desc, userid):
	r = Promises(promiseid=promiseid, userid=int(userid), description=desc, transactions=[])
	r.save()
	selected_promises = Users.objects.filter(userid=userid)[0].promises
	selected_promises.append(promiseid)
	r = Users(userid=int(userid), promises=selected_promises)
	r.save()

def load(request):
	rs = Users.objects.all()
	response = JsonResponse([{'userid': r.userid, 'promises': r.promises} for r in rs], safe=False)
	print(response)
	return response

def index(request):
	rs1 = Users.objects.all()
	rs2 = Promises.objects.all()
	rs3 = Payments.objects.all()
	context = {'user_list': rs1, 'promise_list': rs2, 'payment_list': rs3}
	return render(request, 'webreceiver/index.html', context)
