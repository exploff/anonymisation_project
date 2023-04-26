import sys
import os
parent_dir = os.path.dirname(os.path.abspath(__file__))
module_dir = os.path.join(parent_dir, '..')
sys.path.insert(0, module_dir)
import database as db
from dotenv import load_dotenv
import subprocess

def run_win_cmd(cmd):
    result = []
    print(cmd)
    process = subprocess.Popen(cmd,
                               shell=True,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE)
    for line in process.stdout:
        result.append(line)
    errcode = process.returncode
    for line in result:
        print(line)
    if errcode is not None:
        raise Exception('cmd %s failed, see above for details', cmd)

def upload_dump():

    # Check if the dump is mysql or postgres
    if isMysql():
        # TODO
        # Check if a database is already presents
        # If not, import the dump

        # Import the dump
        load_dotenv()

        destFile = os.getenv('DEPLOY_FOLDER') + os.getenv('FILE_NAME')
        run_win_cmd("docker exec " + str(os.getenv('DOCKER_MYSQL_NAME')) + " mysql -uroot -p" + str(os.getenv('PASSWORD')) +" -e \"drop database if exists " + str(os.getenv('DATABASE')) + "\"")
        run_win_cmd("docker exec " + str(os.getenv('DOCKER_MYSQL_NAME')) + " mysql -uroot -p" + str(os.getenv('PASSWORD')) + " -e \"create database " + str(os.getenv('DATABASE')) + "\"")
        
        run_win_cmd("cat ../../lportal.sql | docker exec -i db mysql -uroot -ppassword db")
        p1 = subprocess.Popen("cat ../../lportal.sql", stdout=subprocess.PIPE)
        p2 = subprocess.Popen("docker exec -i db mysql -uroot -ppassword db", stdin=p1.stdout, shell=True, stdout=subprocess.PIPE)
        #os.popoen("docker exec -it db mysql -uuser -ppassword source %s", destFile)

        # connection = db.mysql_connection()
        # cursor = connection.cursor()
        # cursor.execute(command)
        # cursor.close()
        # connection.close()

        # desactivate the cron task    

def isMysql():
    return True




upload_dump()