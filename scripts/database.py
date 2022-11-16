import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv


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
            print("Connected to MySQL Server version ", db_Info)
            connection.autocommit = False
            return connection

    except Error as e:
        print("Error while connecting to MySQL", e)

    # Connection PostGres

# mysql_connection()