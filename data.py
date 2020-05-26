import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("keyPAW.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Then query for documents
Temperature = db.collection(u'Temperature')
Humidity = db.collection(u'Humidity')
Water = db.collection(u'Water')

data_valuesT = []
data_keysT = []
horasT = []
fechasT = []
valuesT = []

data_valuesH = []
data_keysH = []
horasH = []
fechasH = []
valuesH = []

data_valuesW = []
data_keysW = []
horasW = []
fechasW = []
valuesW = []

for doc in Temperature.stream():
    data_valuesT += doc.to_dict().values()
    data_keysT += doc.to_dict().keys()

for doc in Humidity.stream():
    data_valuesH += doc.to_dict().values()
    data_keysH += doc.to_dict().keys()

for doc in Water.stream():
    data_valuesW += doc.to_dict().values()
    data_keysW += doc.to_dict().keys()


for i in range(len(data_keysT)):
    if(data_keysT[i] == "valor"):
        valuesT.append(data_valuesT[i])
    if(data_keysT[i] == 'fecha'):
        fechasT.append(data_valuesT[i])
    if(data_keysT[i] == 'hora'):
        horasT.append(data_valuesT[i])

for i in range(len(data_keysH)):
    if(data_keysH[i] == "valor"):
        valuesH.append(data_valuesH[i])
    if(data_keysH[i] == 'fecha'):
        fechasH.append(data_valuesH[i])
    if(data_keysH[i] == 'hora'):
        horasH.append(data_valuesH[i])

for i in range(len(data_keysW)):
    if(data_keysW[i] == "valor"):
        valuesW.append(data_valuesW[i])
    if(data_keysW[i] == 'fecha'):
        fechasW.append(data_valuesW[i])
    if(data_keysW[i] == 'hora'):
        horasW.append(data_valuesW[i])


dataT = {'Fecha': fechasT, 'Hora': horasT, 'Valor': valuesT}
dataH = {'Fecha': fechasH, 'Hora': horasH, 'Valor': valuesH}
dataW = {'Fecha': fechasW, 'Hora': horasW, 'Valor': valuesW}


dft = pd.DataFrame(dataT, columns=['Fecha', 'Hora', 'Valor'])
dfh = pd.DataFrame(dataH, columns=['Fecha', 'Hora', 'Valor'])
dfw = pd.DataFrame(dataW, columns=['Fecha', 'Hora', 'Valor'])


dft['Valor'] = dft['Valor'].astype('int')  # Cambio a int
dfh['Valor'] = dfh['Valor'].astype('int')  # Cambio a int
dfw['Valor'] = dfw['Valor'].astype('float')  # Cambio a int

horita = []

for i in range(len(dft['Hora'])):
    horita.append(dft['Hora'][i])
    horita[i] = horita[i][0:2]


plt.scatter(horita, dft['Valor'])
plt.title("Scatter plot of Time vs Value")
plt.xlabel("Time")
plt.ylabel("Value")
plt.grid(True)
plt.show()
