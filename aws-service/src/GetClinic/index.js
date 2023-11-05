'use strict';
const AWS = require('aws-sdk');

exports.handler = async(event, context, callback) => {
    try {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    console.log(event.pathParameters);
    const params = { TableName: "DentistimoClinicsTable",
    Key: {
        clinicId: {
            N: event.pathParameters.clinicId 
        }
    }
};
console.log(event);
const getClinic = await ddb.getItem(params).promise();
var response = {
    statusCode : 200,
    body : JSON.stringify(getClinic.Item),
    isBase64Encoded : false,
    headers:{
        "content-type" : "application/json",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        
    }
};

    callback(null, response);
} catch (e) {console.log(e)}
        };
