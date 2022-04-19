######################################################################
# Data Exploration
######################################################################

import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('Data.csv')
df.drop('Unnamed: 133', axis=1, inplace=True)
print(df)
# print column names
print(df.columns.values)
# print data types
print(df.dtypes)
# describe dataframe
print(df.describe)
# get first 3 records
print(df.head(3))

######################################################################
# Handling Missing Values
######################################################################

# check null values in df
#sum of null values in each column
print(df.isnull().sum())
percent_missing = df.isnull().sum() * 100 / len(df)
#sum of null values in each column
print(df.isnull().sum())

#look for categorical data
categoricals = []
for col, col_type in df.dtypes.iteritems():
     if col_type == 'O':
          categoricals.append(col)
     
print(categoricals)

#HANDLING COLUMNS
#there are two column with similar  names fluid_overload and fluid_overload.1
df[df['fluid_overload'] == 1]
df[df['fluid_overload.1'] == 1].prognosis.unique()

#looking for symptoms and their prognosis that mostly telling the disease

data = {'Symptoms': [], 'Prognosis': [], 'length': []}
table = pd.DataFrame(data)
table = table.astype({"Symptoms": str, "Prognosis": object, 'length': int})
i = 0

for symp in sorted(df.columns.tolist()[:-1]):
    prognosis = df[df[symp] == 1].prognosis.unique().tolist()
    table = table.append({'Symptoms': symp}, {'Prognosis': prognosis}, {'length':len(prognosis)}) 
    table.at[i,'Prognosis'] = prognosis
    table.at[i, 'length'] = len(prognosis)
    i += 1

table.sort_values(by='length', ascending=False).head(10)
table.sort_values(by='length', ascending=True).head(10)

#CHANGING TARGET FEATURE TO NUMERICAL FOR MODEL TO UNDERSTAND IT

features = df.iloc[:,0:-1] #SEPARATING TARGET FEATURE FROM OTHER COLUMNS
target = df.prognosis #IDENTIFYING PROGNOSIS COLUMN AS TARGET FEATURE

from sklearn import preprocessing
le = preprocessing.LabelEncoder()

le.fit(target.tolist())

encoded_target = le.transform(target)

print(encoded_target) #each column has unique encoded number

#dividing data into testing and training
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(features, encoded_target, test_size=0.20, random_state=0)


######################################################################
# Model Implementation
######################################################################

from sklearn.metrics import confusion_matrix,accuracy_score,classification_report,roc_auc_score
from sklearn.svm import SVC

clf_svc= SVC()
clf_svc.fit(X_train,y_train)

predict = clf_svc.predict(X_test)

print('Accuracy Score: {}%'.format(round(accuracy_score(y_test,predict)*100,2)))
print(classification_report(y_test,predict))

# Random Forest Classifier
from sklearn.ensemble import RandomForestClassifier

clf_rfc = RandomForestClassifier(n_estimators=700,random_state=0,n_jobs=-1,verbose=4)
clf_rfc.fit(X_train,y_train)

predict = clf_rfc.predict(X_test)

print('Accuracy Score: {}%'.format(round(accuracy_score(y_test,predict) * 100,2)))
print(classification_report(y_test,predict))

import joblib
joblib.dump(clf_rfc, 'clf_rfc.pkl')
print("Model dumped")

model_columns = list(X_train.columns)
joblib.dump(model_columns, 'model_columns.pkl')
print("Model columns dumped")
