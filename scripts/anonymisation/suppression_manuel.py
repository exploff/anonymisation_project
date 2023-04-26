import sys
import os
parent_dir = os.path.dirname(os.path.abspath(__file__))
module_dir = os.path.join(parent_dir, '..')
sys.path.insert(0, module_dir)
import database as db


connection = db.mysql_connection()
cursor = connection.cursor()

table = sys.argv[1]
column = sys.argv[2]
condition = sys.argv[3]
request = "UPDATE " + table + " SET " + column + " = NULL WHERE " + column + " LIKE '%" + condition + "%'"

cursor.execute(request)
connection.commit()
connection.close()

print("Script de suppression done ! " + request)
sys.exit(0)