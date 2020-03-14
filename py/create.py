import pymysql

conn=pymysql.connect(host='cdb-ef3lz554.cd.tencentcdb.com', user='root', passwd='@Sustc161827', db='SUSTC', port=10125, charset='utf8')

cursor=conn.cursor() #控制光标
sql = """CREATE TABLE traffic (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
block_id int(3),
block_des VARCHAR(500),
bound VARCHAR(50) NOT NULL,
expedite VARCHAR(15),
congested VARCHAR(15),
blocked VARCHAR(15),
unknown VARCHAR(15),
status int(1),
description VARCHAR(50),
reg_date TIMESTAMP NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
cursor.execute(sql)
conn.commit()#提交事务
conn.close()# 断开与数据库的链接