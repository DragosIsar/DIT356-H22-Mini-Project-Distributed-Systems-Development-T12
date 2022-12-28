'use strict'
const AWS = require('aws-sdk');

//AWS.config.Update({ region: "eu-central-1"});

const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"})
exports.handler = async (event, context, callback) => {

    const params = { 
      TableName: "DentistimoClinicsTable",
      ProjectionExpression: "#name, #owner, address, openinghours",
      ExpressionAttributeNames: {'#name': 'name', '#owner': 'owner'}
      
}
/*
ddb.scan(params, (err, data) => {
    let response = {}
    if(err) {
        console.log(err);
    }
    else{
        response = {
            body: JSON.stringify(data)
        }
        }
      console.log(JSON.stringify(data))  
    } 

})*/
const response = await ddb.scan(params).promise();
return response;
}