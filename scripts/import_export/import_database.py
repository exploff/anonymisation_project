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

        command = ("mysql -u" + str(os.getenv('USER')) + " -p" + str(os.getenv('PASSWORD')) + " " + str(os.getenv('DATABASE')) + " < " + str(os.getenv('DEPLOY_FOLDER')) + str(os.getenv('FILE_NAME'))).split()
        print(command)
        p = subprocess.Popen(command, stdout=subprocess.PIPE)
        p.communicate()

        # connection = db.mysql_connection()
        # cursor = connection.cursor()
        # cursor.execute(command)
        # cursor.close()
        # connection.close()

        # desactivate the cron task    

def isMysql():
    return True

upload_dump()