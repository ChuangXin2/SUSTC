#!/usr/bin/python
# -*- coding: utf-8 -*-
import pymysql
import xlwt

conn = pymysql.connect(host='cdb-ef3lz554.cd.tencentcdb.com', user='root', passwd='@Sustc161827', db='SUSTC', port=10125, charset='utf8')

cursor = conn.cursor()
sql = 'select * from traffic'
cursor.execute(sql)
results = cursor.fetchall()
book = xlwt.Workbook(encoding='utf-8')
sheet = book.add_sheet('traffic0')
sheet.write(0, 0, 'block_Id')
sheet.write(0, 1, 'block_des')
sheet.write(0, 2, 'bound')
sheet.write(0, 3, 'expedite')
sheet.write(0, 4, 'congested')
sheet.write(0, 5, 'blocked')
sheet.write(0, 6, 'unknown')
sheet.write(0, 7, 'Workbook')
sheet.write(0, 8, 'status')
sheet.write(0, 9, 'description')
sheet.write(0, 10, 'reg_date')
i = 0
s = 0
for result in results:
    i = i+1
    if i > 65000:
        i = i-65000
        s = s+1
        sheet = book.add_sheet('traffic'+str(s))
        sheet.write(0, 0, 'block_Id')
        sheet.write(0, 1, 'block_des')
        sheet.write(0, 2, 'bound')
        sheet.write(0, 3, 'expedite')
        sheet.write(0, 4, 'congested')
        sheet.write(0, 5, 'blocked')
        sheet.write(0, 6, 'unknown')
        sheet.write(0, 7, 'Workbook')
        sheet.write(0, 8, 'status')
        sheet.write(0, 9, 'description')
        sheet.write(0, 10, 'reg_date')
    for j in range(1, 11):
        sheet.write(i, j-1, result[j])
book.save('traffic.xlsx')
conn.commit()
conn.close()
