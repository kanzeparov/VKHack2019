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
        "paymentid": randomString(20),
        "sender" : 345,
        "promiseid": "ZQvdKyZAcYQMruSUpMct",
        "amount" : 1000
    }
    print(payload)
    r = requests.post("http://" + sys.argv[1] + "/submitpayment", json=payload)
