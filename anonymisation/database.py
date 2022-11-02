import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def mysql_connection(attribute):
    try:
        connection = mysql.connector.connect(host=attribute['host'],
                                            database=attribute['database'],
                                            user=attribute['user'],
                                            password=attribute['password'])
        if connection.is_connected():
            info = connection.get_server_info()
            print("Connected to MySQL Server version ", info)
            connection.autocommit = False
            return connection

    except Error as e:
        print("Error while connecting to MySQL", e)

attribute = {
    'host': os.getenv('HOST'),
    'database': os.getenv('DATABASE'),
    'user': os.getenv('USER'),
    'password': os.getenv('PASSWORD')
}

mysql_connection(attribute)