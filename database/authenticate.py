from sqlalchemy import *
import json
from flask import Flask
from flask import request, jsonify

engine = create_engine('')
connection = engine.connect()
print(engine.table_names())
metadata = MetaData()

labels = Table('labels', metadata, autoload=True, autoload_with=engine)

def outputResults():
    result = []
    select_st = select([labels])
    tags_res_list = connection.execute(select_st)
    for res in tags_res_list:
        output = {
        "label":res.label,
        "start_time":float(res.start_time),
        "end_time":float(res.end_time),
        "confidence":float(res.confidence)
        }
        result.append(output)
    output_string = json.dumps(result)
    return output_string


def insertLabel(labelList):
    for l in labelList:
        info = json.loads(l);
        # insert data via insert() construct
        ins = labels.insert().values(
            label=info['label'],
            start_time = info['start_time'],
            end_time = info['end_time'],
            confidence = info['confidence'])
        res = connection.execute(ins)

def searchText(search1):
    result = []
    query_sql = text("SELECT * FROM labels WHERE label LIKE '%" + search1 + "%'")
    tags_res_list = (connection.execute(query_sql)).fetchall()
    for res in tags_res_list:
        output = {
        "label":res.label,
        "start_time":float(res.start_time),
        "end_time":float(res.end_time),
        "confidence":float(res.confidence)
        }
        result.append(output)
    output_string = json.dumps(result)
    return output_string

def searchTime(startTime, endTime):
    result = []
    query_sql = text("SELECT * FROM labels WHERE start_time >= " + str(startTime) + " AND end_time <= "+ str(endTime))
    tags_res_list = (connection.execute(query_sql)).fetchall()
    for res in tags_res_list:
        output = {
        "label":res.label,
        "start_time":float(res.start_time),
        "end_time":float(res.end_time),
        "confidence":float(res.confidence)
        }
        result.append(output)
    output_string = json.dumps(result)
    return output_string


app = Flask(__name__)
@app.route("/output")
def out():
    return outputResults()
@app.route("/search-text")
def searchTex():
    return searchText(str(request.args.get('text')))
@app.route("/search-time")
def searchTim():
    return searchTime(float(request.args.get('start')), float(request.args.get('end')))
@app.route("/")
def hello():
  return "Hello World!"

if __name__ == "__main__":
  app.run()

