import sys
sys.path.insert(0, 'D:\\YNOV\\YDAYS\\anonymisation_project\\scripts')
import database as db


connection = db.mysql_connection()
cursor = connection.cursor()

table = sys.argv[1]
column = sys.argv[2]
condition = sys.argv[3]
request = "UPDATE " + table + " SET " + column + " = 'xxxxxxxx' WHERE " + column + " LIKE '%" + condition + "%'"

cursor.execute(request)
connection.commit()
connection.close()

print("Script de character masking done ! " + request)
sys.exit(0)