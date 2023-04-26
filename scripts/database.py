import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

def recupids(table, connection):
    cursor = connection.cursor(buffered=True)
    db = os.getenv('DATABASE') 
    if db is None:
        db = "db"
    cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '" + db + "' AND TABLE_NAME = '" +
                   table+"' AND COLUMN_KEY = 'PRI'")
    results = cursor.fetchall()
    return results

def recupvalues(table, fields, connection):
    id = ', '.join([x for x, in fields])
    cursor = connection.cursor()
    cursor.execute("SELECT " + id + " FROM "+table)
    results = cursor.fetchall()
    return results

def mysql_connection():
    load_dotenv()
    connectionAttribute = {}
    connectionAttribute['db'] = os.getenv('DATABASE')
    connectionAttribute['host'] = os.getenv('HOST')
    connectionAttribute['user'] = os.getenv('USER')
    connectionAttribute['password'] = os.getenv('PASSWORD')

    # Connection Mysql
    try:
        connection = mysql.connector.connect(host=connectionAttribute['host'],
                                            database=connectionAttribute['db'],
                                            user=connectionAttribute['user'],
                                            password=connectionAttribute['password'])
        if connection.is_connected():
            db_Info = connection.get_server_info()
            #print("Connected to MySQL Server version ", db_Info)
            connection.autocommit = False
            return connection

    except Error as e:
        print("Error while connecting to MySQL", e)

    # Connection PostGres

# mysql_connection()