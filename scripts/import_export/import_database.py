import sys
sys.path.insert(0, 'C:\\Users\\Julien\\Desktop\\Cours_Informatique\\YNOV\\YDAYS\\anonymisation_project\\scripts')
import database as db
import os
from dotenv import load_dotenv
import subprocess


def upload_dump():

    # Check if the dump is mysql or postgres
    if isMysql():
        # TODO
        # Check if a database is already presents
        # If not, import the dump

        # Import the dump
        load_dotenv()       

        destFile = os.getenv('DEPLOY_FOLDER') + os.getenv('FILE_NAME')
        os.popoen("docker exec -it db mysql source %s" % (os.getenv('USER'), os.getenv('PASSWORD'), os.getenv('DATABASE'), destFile))


        # connection = db.mysql_connection()
        # cursor = connection.cursor()
        # cursor.execute(command)
        # cursor.close()
        # connection.close()

        # desactivate the cron task    

def isMysql():
    return True




upload_dump()