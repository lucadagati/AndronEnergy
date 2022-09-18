from dataclasses import dataclass
from random import random
import re
import requests
import numpy as np
import time
from datetime import datetime

api_url = "http://localhost:8060"
data = {"username": "device","password":"Uncharted3"}
response = requests.post(api_url+"/admin/login", json=data).json()
accessToken=response["accessToken"]
#response = requests.get(api_url+"/pod",headers={'Authorization': 'Bearer '+str(accessToken)}).json()
#print(response)
print(accessToken)
counter=0

while 1:

    energy=np.random.exponential(2)
    energy=round(energy, 2)
    #print(energy)
    x=datetime.now()
    x=x.strftime('%Y-%m-%d %H:%M:%S')
    print(x)
    #time_istant=str(x.year)+'-'+str(x.month)+'-'+str(x.day)+' '+str(x.hour)+':'+str(x.minute)+':'+str(x.second)
    res=requests.put(api_url+"/podOp/Update/StoredEnergy/Pod2",params={"updateElem":'StoredEnergy',"id":"Pod2"},json={"time":x,"storedEnergy":energy},headers={'Authorization': 'Bearer '+str(accessToken)})
    print("Sended ",res)
    time.sleep(5)
