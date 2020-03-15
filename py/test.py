#!/usr/bin/python
# -*- coding: utf-8 -*-
import pymysql
import time
import datetime
import threading
import requests

time_mid = datetime.datetime.now().hour
if time_mid > (datetime.datetime.now()+datetime.timedelta(hours=20)).hour:
    print(time_mid+24)
print(time_mid)
