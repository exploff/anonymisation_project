import sys
sys.path.insert(0, 'C:\\Users\\Julien\\Desktop\\Cours_Informatique\\YNOV\\YDAYS\\anonymisation_project\\scripts')
import database as db


connection = db.mysql_connection()
cursor = connection.cursor()
request = "UPDATE " + sys.argv[1] + " SET " + sys.argv[2] + " = NULL"
for i in range(3, len(sys.argv)):
    request += ", " + sys.argv[i] + " = NULL"

cursor.execute(request)
connection.commit()
connection.close()

print("Script de suppression done ! " + request)
sys.exit(0)