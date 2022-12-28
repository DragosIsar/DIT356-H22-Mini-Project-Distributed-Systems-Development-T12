'use strict'  
const AWS = require('aws-sdk'); 
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});  
exports.handler = function(event, context, callback) {     l
    let params = {         
        TableName : "DentistimoBookings",         
        Item: {             
            "ClinicId": event.ClinicId,             
            "Date": event.Date,
            "TimeSlots": [{
                "Email": [{
                    event.email
                }],
                "Time": event.time
            }]                     
        }     
    }  
    documentClient.put(params, function(err, data){          
        if(err) {         
            callback(err, null);     
        }     
        callback(null, data);  
    }) 
}