import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def mysql_connection():
    connectionAttribute = {}
    connectionAttribute['db'] = "db"
    connectionAttribute['host'] = "localhost"
    connectionAttribute['user'] = "user"
    connectionAttribute['password'] = "password"

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

# attribute = {}
# attribute['db'] = str(os.getenv('HOST'))
# attribute['host'] = str(os.getenv('DATABASE'))
# attribute['user'] = str(os.getenv('USER'))
# attribute['password'] = str(os.getenv('PASSWORD'))



# mysql_connection()