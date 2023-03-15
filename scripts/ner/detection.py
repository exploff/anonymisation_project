import sys
sys.path.insert(0, 'C:\\Users\\Julien\\Desktop\\Cours_Informatique\\YNOV\\YDAYS\\anonymisation_project\\scripts')
import database as db
import spacy

import re

CLEANR = re.compile('<.*?>')

# Supprime les balises HTML / XML d'un texte
def cleantext(raw_html):
    cleantext = re.sub(CLEANR, '', raw_html)  
    return cleantext


connection = db.mysql_connection()
cursor = connection.cursor()

table = sys.argv[1]
database = sys.argv[2]

def detection(table, database):
    # Récupération des colonnes de type texte de la table spécifiée
    query = f"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '{database}' AND TABLE_NAME = '{table}' AND DATA_TYPE IN ('varchar', 'text', 'longtext', 'mediumtext', 'blob', 'mediumblob', 'longblob')"
    cursor.execute(query)
    columns = cursor.fetchall() 
    # Configuration de spacy
    nlp = spacy.load("en_core_web_md")
    # Parcours des colonnes
    data = []

    for column in columns:
        column_name = column[0]
        query = f"SELECT {column_name} from {table}"
        cursor.execute(query)
        results = cursor.fetchall()
        # Parcours des résultats
        j_out = {}
        j_out['column'] = column_name
        j_out['results'] = []
        for row in results:
            for value in row:
                if value is not None:
                    # Nettoyage du texte
                    value = value.lower()
                    value = cleantext(value)
                    # Détection des entités nommées
                    doc = nlp(value)
                    for token in doc.ents:
                        if token.label_ in ['PERSON', 'NORP', 'FACILITY', 'GPE', 'LOC', 'PRODUCT', 'WORK_OF_ART', 'LANGUAGE']:
                            j_out['results'].append({'type': token.label_, 'value': str(token)})
                            #data += f"Element de type \"{token.label_}\" trouvé : {token}\n"
                    
        # Affichage des résultats de la colonne courante si des entités nommées ont été trouvées
        if j_out['results']:
            data.append(j_out)
            #print(data)
    print(data)
detection(table, database)

connection.commit()
connection.close()

sys.exit(0)
