import sys
sys.path.insert(0, 'D:\\YNOV\\YDAYS\\anonymisation_project\\scripts')
import randomisation.generator as generator
import database as db

def recupids(table, connection):
    cursor = connection.cursor(buffered=True)
    cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'db' AND TABLE_NAME = '" +
                   table+"' AND COLUMN_KEY = 'PRI'")
    results = cursor.fetchall()
    return results


def recupvalues(table, fields, connection):
    id = ', '.join([x for x, in fields])
    cursor = connection.cursor()
    cursor.execute("SELECT " + id + " FROM "+table)
    results = cursor.fetchall()
    return results


def update(table, fields, value, ids, conditions, cursor):
    conditionWhere = ' AND '.join(
        [f'{x[0]} = {y}' for x, y in zip(ids, conditions)])
    sql = "UPDATE " + table + " SET " + fields + \
        " = '" + str(value) + "' WHERE " + conditionWhere
    cursor.execute(sql)


def random_general(connection, table, type, fields):
    ids = recupids(table, connection)
    valuesIds = recupvalues(table, ids, connection)
    randoms = []

    size = len(valuesIds)
    if type == "name":
        randoms = generator.get_fake_name(size)
    elif type == "fullname":
        randoms = generator.get_fake_fullname(size)
    elif type == "email":
        randoms = generator.get_fake_email(size)
    elif type == "fulladdress":
        randoms = generator.get_fake_address(size)
    elif type == "city":
        randoms = generator.get_fake_city(size)
    elif type == "zip":
        randoms = generator.get_fake_zip(size)
    elif type == "country":
        randoms = generator.get_fake_country(size)
    elif type == "number":
        randoms = generator.get_fake_number(size)
    elif type == "text":
        randoms = generator.get_fake_text(size)
    else:
        print('Type anonymisation not found')
        sys.exit(1)

    cursor = connection.cursor()
    for line in valuesIds:
        value = randoms.pop()
        update(table, fields, value, ids, line, cursor)
    cursor.close()


connection = db.mysql_connection()

table = sys.argv[1]
type = sys.argv[2]
args = sys.argv
field = sys.argv[3:]
print('debug')
print(field)
print(len(field))
if len(field) > 1:
    for colonne in field:
        print(colonne)
        random_general(connection, table, type, colonne)
else:
    random_general(connection, table, type, field[0])

connection.commit()
connection.close()

print("Script de randomisation done ! ")
sys.exit(0)
