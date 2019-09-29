#!/usr/bin/python

import requests
import datetime
import random
import os, sys
import time
import string

def randomString(stringLength):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(stringLength))

if len(sys.argv) != 2:
    exit("usage: {} addr".format(sys.argv[0]))

for user_id in range(1):
    payload = {
        "promiseid": randomString(20),
        "description" : "Как меня зовут?",
        "userid": 346,
        'metrics': "",
        'category': 0,
        'wall_pub': True,
        'story_pub': False,
        'exp_date': 0,
        'pub_date': 0,
        'transactions': []
    }
    print(payload)
    r = requests.post("https://" + sys.argv[1] + "/submitpromise", cert='stunnel.pem', json=payload, verify=False)
    print(r)
