import pymysql
import time
import datetime
import threading as thd

keys = {
    "info-hour1": "55b5c532f41cda833338735982e156a0",
    "info-hour2": "4bf675666ef3716cf0c78eafb22c172c",
    "info-hour3": "b8b5a0ea842e01800f4d41b2ea5264e6",
    "info-hour4": "9dc43fbd8fe2d77a2be5c839bb8b0d63",
    "info-hour5": "cd16da37bc74816e7481de803a46d148",
    "info-hour6": "5989c44a7ad03e66e4ab9112af7c9206",
    "info-hour7": "8a490c31be45559b4c880f9ac9996145",
    "info-hour8": "b8ab9ef8c8b80bf784754196b27a0bec",
    "info-hour9": "c0ac36cf13fc327203e18939dd859fb9",
    "info-hour10": "57c0e2e033ba005979d295567c6fd0c0",
    "info-hour11": "b9580ab1233aa7fc4560bcc4d7260820",
    "info-hour12": "0d7ff34bf9c711dd0b8797a5aa3f3832",
    "info-hour13": "c70a1e55a9a255599dfe9003f06ff720",
    "info-hour14": "a14ce6ad6dc76dde320af540a1e4c26b",
    "info-hour15": "dda23161a7c80bd45095e79f92f03afc",
    "info-hour16": "fbc37f9624a11daf6b3af9ac8fa1918e",
    "info-hour17": "cbbf350d8f94beb0c9f17ae6b92140cb",
    "info-hour18": "4047da50f3d2a224abe6fcadecfd7c99",
    "info-hour19": "b7e48d2982382d5c45177b697b35d8d4",
    "info-hour20": "912b85a9fa16651bc57096db7a58b832",
    "info-hour21": "57c0e2e033ba005979d295567c6fd0c0",
    "info-hour22": "57c0e2e033ba005979d295567c6fd0c0",
    "info-hour23": "57c0e2e033ba005979d295567c6fd0c0",
    "info-hour24": "57c0e2e033ba005979d295567c6fd0c0",
    "info-hour-other": "57c0e2e033ba005979d295567c6fd0c0"
}


def insert():
    conn = pymysql.connect(host='cdb-ef3lz554.cd.tencentcdb.com', user='root', passwd='@Sustc161827', db='SUSTC', port=10125, charset='utf8')

    cursor = conn.cursor() #控制光标

    now_time = datetime.datetime.now()
    datetime.datetime.now().strftime('%Y-%m-%d')
    sql = 'DROP TABLE traffic;'

    cursor.execute(sql)
    conn.commit()   # 提交事务
    conn.close()    # 断开与数据库的链接


def fn():
    insert()
    thd.Timer(300, fn).start()


fn()
