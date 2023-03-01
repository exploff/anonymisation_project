import sys
sys.path.insert(0, 'E:\\github\\anonymisation_project\\scripts')
import database as db


connection = db.mysql_connection()
cursor = connection.cursor()
request = "UPDATE " + sys.argv[1] + " SET " + sys.argv[2] + " = 'xxxxxxxx'"
for i in range(3, len(sys.argv)):
    request += ", " + sys.argv[i] + " = 'xxxxxxxx'"

cursor.execute(request)
connection.commit()
connection.close()

print("Script de character masking done ! " + request)
sys.exit(0)