import sys
sys.path.insert(0, 'C:\\Users\\Julien\\Desktop\\Cours_Informatique\\YNOV\\YDAYS\\anonymisation_project\\scripts')
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