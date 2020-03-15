#!/usr/bin/python
# -*- coding: utf-8 -*-
import pymysql

conn = pymysql.connect(host='cdb-ef3lz554.cd.tencentcdb.com', user='root', passwd='@Sustc161827', db='SUSTC', port=10125, charset='utf8')

cursor = conn.cursor() #控制光标
sql = 'DROP TABLE traffic;'
cursor.execute(sql)
conn.commit()#提交事务
conn.close()# 断开与数据库的链接