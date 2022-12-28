#!/bin/bash


if [ -d "build" ]
then
    rm -rf build
fi 
mkdir build
cd build
zip DeleteFromDDB.zip ../src/DeleteFromDDB/index.js
zip DeleteFromEB.zip ../src/DeleteFromEB/index.js
zip ReadFromDDB.zip ../src/ReadFromDDB/index.js
zip WriteToDDB.zip ../src/WriteToDDB/index.js
zip WriteToEB.zip ../src/WriteToEB/index.js
zip ReadAllClinics.zip ../src/ReadAllClinics/index.js

aws s3 cp DeleteFromDDB.zip s3://dentistimo
aws s3 cp DeleteFromEB.zip s3://dentistimo
aws s3 cp ReadFromDDB.zip s3://dentistimo
aws s3 cp WriteToDDB.zip s3://dentistimo
aws s3 cp WriteToEB.zip s3://dentistimo
aws s3 cp ReadAllClinics.zip s3://dentistimo
