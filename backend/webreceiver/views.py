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

from webreceiver.models import Users

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

def load(request):
	rs = Users.objects.all()
	response = JsonResponse([{'userid': r.userid, 'promises': r.promises} for r in rs], safe=False)
	print(response)
	return response

def index(request):
	rs = Users.objects.all()
	context = {'user_list': rs}
	return render(request, 'webreceiver/index.html', context)
