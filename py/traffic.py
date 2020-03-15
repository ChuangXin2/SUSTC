#!/usr/bin/python
# -*- coding: utf-8 -*-
import pymysql
import time
import datetime
import threading
import requests

keys = {
    "info-hour0": "57c0e2e033ba005979d295567c6fd0c0",
    "info-hour1": "55b5c532f41cda833338735982e156a0",
    "info-hour2": "4bf675666ef3716cf0c78eafb22c172c",
    "info-hour3": "b8b5a0ea842e01800f4d41b2ea5264e6",
    "info-hour4": "9dc43fbd8fe2d77a2be5c839bb8b0d63",
    "info-hour5": "cd16da37bc74816e7481de803a46d148",
    "info-hour6": "5989c44a7ad03e66e4ab9112af7c9206",
    "info-hour7": "8a490c31be45559b4c880f9ac9996145",
    "info-hour8": "b8ab9ef8c8b80bf784754196b27a0bec",
    "info-hour9": "c0ac36cf13fc327203e18939dd859fb9",
    "info-hour10": "b9580ab1233aa7fc4560bcc4d7260820",
    "info-hour11": "0d7ff34bf9c711dd0b8797a5aa3f3832",
    "info-hour12": "c70a1e55a9a255599dfe9003f06ff720",
    "info-hour13": "a14ce6ad6dc76dde320af540a1e4c26b",
    "info-hour14": "dda23161a7c80bd45095e79f92f03afc",
    "info-hour15": "fbc37f9624a11daf6b3af9ac8fa1918e",
    "info-hour16": "cbbf350d8f94beb0c9f17ae6b92140cb",
    "info-hour17": "4047da50f3d2a224abe6fcadecfd7c99",
    "info-hour18": "b7e48d2982382d5c45177b697b35d8d4",
    "info-hour19": "912b85a9fa16651bc57096db7a58b832",
    "info-hour20": "8bc618410443fd7217651ee2205713d1",
    "info-hour21": "4ad72edf72ba1f2f452675259200a99c",
    "info-hour22": "3068335b93165de2fa66f41d422faa89",
    "info-hour23": "6547a2085065ea16129b059feb6e5007",
    "info-hour24": "e792b6008eb38e144af0e946ab1be6c1",
    "info-hour25": "da08cd7d362e71d67825aec694a1b38e",
    "info-hour26": "dcadbe064c98ae0ece6d0a5d42c9dae3",
    "info-hour27": "fef57b82b1950ca0aac88a41f79596d9",
    "info-hour28": "4c7874986c84957a344326ad2cb5b86d",
    "info-hour29": "03a48b5da777f57279719f1058850081"
}
traffic = {
    '1': 15,
    '4': 0,
    '4': 5,
}


def insert(i, now_time):
    conn = pymysql.connect(host='cdb-ef3lz554.cd.tencentcdb.com', user='root', passwd='@Sustc161827', db='SUSTC', port=10125, charset='utf8')

    cursor = conn.cursor()

    fix = 1000000
    init_x = 116.081887
    init_x1 = 116.090896
    init_y = 40.278241
    init_y1 = 40.269232
    dif_x = (fix*init_x1 - fix*init_x)/fix
    dif_y = (fix*init_y1 - fix*init_y)/fix
    time_mid = datetime.datetime.now().hour
    if time_mid > (datetime.datetime.now()+datetime.timedelta(minutes=5*(time_mid+1))).hour:
        time_mid = time_mid+24
    key = keys['info-hour'+str(time_mid)]
    for j in range(0, 60):
        block_Id = str(i*60+j+1)
        new_x = (init_x * fix + dif_x * j * fix) / fix
        new_y = (init_y * fix + dif_y * i * fix) / fix
        bound = '' + str(new_x) + ',' + str(new_y) + ';' + str((new_x * fix + dif_x * fix) / fix) + ','\
                    + str((new_y * fix + dif_y * fix) / fix)
        url = 'https://restapi.amap.com/v3/traffic/status/rectangle?rectangle='+bound+'&&key=' + key
        if block_Id not in traffic:
            traffic[block_Id] = 11
        if traffic[block_Id] < 1:
            description = ''
            eva_description = ''
            expedite = ''
            congested = ''
            blocked = ''
            unknown = ''
            status = '0'
        else:
            r = requests.get(url)
            response_dict = r.json()
            if len(response_dict) == 4:
                if traffic[block_Id]<50:
                    traffic[block_Id] = traffic[block_Id] + 3
                repo_dicts = response_dict['trafficinfo']
                description = repo_dicts['description']
                evaluation = repo_dicts['evaluation']
                expedite = evaluation['expedite']
                congested = evaluation['congested']
                blocked = evaluation['blocked']
                unknown = evaluation['unknown']
                status = str(evaluation['status'])
                eva_description = evaluation['description']
                if len(description) == 0:
                    description = ''
                    eva_description = ''
                if len(expedite) == 0:
                    traffic[block_Id] = traffic[block_Id] - 4
                    expedite = ''
                    congested = ''
                    blocked = ''
                    unknown = ''
                    status = '0'
            else:
                traffic[block_Id] = traffic[block_Id] - 1
                description = ''
                expedite = ''
                congested = ''
                blocked = ''
                unknown = ''
                status = '0'
                eva_description = ''
        sql = 'insert into traffic(block_Id, block_des, bound, expedite, congested, blocked, ' \
              'unknown, status, description, reg_date) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);'
        value = [block_Id, description, bound, expedite, congested, blocked, unknown, status, eva_description, now_time]
        cursor.execute(sql, value)
    conn.commit()   # 提交事务
    conn.close()    # 断开与数据库的链接


def run(interval):
    while True:
        now_time = datetime.datetime.now()
        now_time = datetime.datetime.strftime(now_time, '%Y-%m-%d %H:%M:%S')
        print(now_time)
        for i in range(0, 60):
            threading.Thread(target=insert, args=(i, now_time, )).start()
        print('-'*100)
        time_remaining = interval - time.time() % interval
        time.sleep(time_remaining)


if __name__ == "__main__":
    interval = 300
    run(interval)
