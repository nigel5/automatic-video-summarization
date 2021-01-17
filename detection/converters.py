import json
import datetime

"""
Returns stringified json of vision api result
"""
def csv_to_json(path):
    obj = { "segments": [], "last_updated": datetime.datetime.now().isoformat(), "source": path }
    with open(path, "r") as f:
        for line in f:
            row = [x.strip() for x in line.split(',')]
            obj["segments"].append(
                {
                    "description": row[0],
                    "start_time": row[1],
                    "end_time": row[2],
                    "confidence": row[3]
                }
            )
        
    return json.dumps(obj)

if __name__ == "__main__":
    print(csv_to_json("output"))