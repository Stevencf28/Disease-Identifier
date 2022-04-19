from flask import Flask, request, jsonify
import traceback
import pandas as pd
import joblib
import numpy as np
from os.path import dirname
from symptomsDictModel import symptomsDict
from flask_cors import CORS, cross_origin

diseases=np.array(['(vertigo) Paroymsal  Positional Vertigo', 'AIDS', 'Acne', 
'Alcoholic hepatitis', 'Allergy', 'Arthritis', 'Bronchial Asthma', 
'Cervical spondylosis', 'Chicken pox', 'Chronic cholestasis', 'Common Cold', 
'Dengue', 'Diabetes ', 'Dimorphic hemmorhoids(piles)', 'Drug Reaction', 'Fungal infection', 
'GERD', 'Gastroenteritis', 'Heart attack', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 
'Hepatitis E', 'Hypertension ', 'Hyperthyroidism', 'Hypoglycemia', 'Hypothyroidism', 
'Impetigo', 'Jaundice', 'Malaria', 'Migraine', 'Osteoarthristis', 'Paralysis (brain hemorrhage)', 
'Peptic ulcer diseae', 'Pneumonia', 'Psoriasis', 'Tuberculosis', 'Typhoid', 'Urinary tract infection', 
'Varicose veins', 'hepatitis A'])

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# route for rfc model
@app.route("/rfc-predict", methods=['POST'])
def predictRfc():
    if rfcModel:
        try:
            json_ = [request.json]
            query = pd.get_dummies(pd.DataFrame(json_))
            prediction = diseases[rfcModel.predict(query)]
            return jsonify({'prediction': str(prediction[0])})
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model to use')

@app.route('/rfc-predict-another', methods=['POST'])
def predictRfcAnother():
    if rfcModel:
        try:
            symptoms = symptomsDict
            symptoms = dict.fromkeys(symptoms,0)
            body = request.json
            for symp in body:
                symptoms[symp] = body[symp]
            arrayJson = [symptoms]
            input = pd.get_dummies(pd.DataFrame(arrayJson))
            prediction = diseases[rfcModel.predict(input)]
            return jsonify({'prediction': str(prediction[0])})
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model to use')

if __name__ == '__main__':
    path=dirname(dirname(__file__)).replace('\\','/')
    rfcModelPath = path + '/model/clf_rfc.pkl'
    rfcModel = joblib.load(rfcModelPath)

    print('Models loaded')
    columnsPath = path + '/model/model_columns.pkl'
    model_columns = joblib.load(columnsPath)
    print ('Model columns loaded')
    app.run(port=12345, debug=True)
