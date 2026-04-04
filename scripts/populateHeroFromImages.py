import mysql.connector
import os
import re
from dotenv import load_dotenv


#this takes the list of hero portraits in public/images/heroIcon and uses it to fill the db

imgDir = "..\\public\\images\\heroIcon"
images = os.listdir(imgDir)

load_dotenv()
mydb = mysql.connector.connect(
    host = os.getenv("DB_HOST"),
    user = os.getenv("DB_USER"),
    database = os.getenv("DB_DATABASE")
)
def extractHeroName(imageName):
    return (imageName.replace("Port.png",""))
            
cursor = mydb.cursor()




for image in images:
    name = extractHeroName(image)
    sql = "INSERT INTO hero_table (name,imageName) values (%s,%s)"
    val = (name,image)
    cursor.execute(sql,val)
    

mydb.commit()

print(cursor.rowcount, "record inserted")
