import sys
import os
parent_dir = os.path.dirname(os.path.abspath(__file__))
module_dir = os.path.join(parent_dir, '..')
sys.path.insert(0, module_dir)
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