import sys
import os
parent_dir = os.path.dirname(os.path.abspath(__file__))
module_dir = os.path.join(parent_dir, '..')
sys.path.insert(0, module_dir)
import randomisation.generator as generator
import database as db

def update(table, field, condition, value, ids, conditions, cursor):
    conditionWhere = ' AND '.join(
        [f'{x[0]} = {y}' for x, y in zip(ids, conditions)])
    sql = "UPDATE " + table + " SET " + field + \
        " = '" + str(value) + "' WHERE " + conditionWhere + " AND " + field + " LIKE '%" + condition + "%'"
    cursor.execute(sql)


def random_general(connection, table, type, field, condition):
    ids = db.recupids(table, connection)
    valuesIds = db.recupvalues(table, ids, connection)
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
        update(table, field, condition, value, ids, line, cursor)
    cursor.close()


connection = db.mysql_connection()

table = sys.argv[1]
type = sys.argv[2]
column = sys.argv[3]
condition = sys.argv[4]

random_general(connection, table, type, column, condition)

connection.commit()
connection.close()

print("Script de randomisation done ! ")
sys.exit(0)
