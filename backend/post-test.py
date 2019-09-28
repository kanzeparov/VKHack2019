#!/usr/bin/python

import requests
import datetime
import random
import os, sys
import time

#ids = ['232323']
ids = ['192423556', '47895486', '256083609']

if len(sys.argv) != 2:
    exit("usage: {} addr".format(sys.argv[0]))

for user_id in ids:
    payload = {
        "userid": user_id,
        "promises" : ', '.join(str(x) for x in range(3))
    }
    print(payload)
    r = requests.post("http://" + sys.argv[1] + "/submituser", json=payload)
