'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: "eu-central-1" })
const eventBridge = new AWS.EventBridge()

exports.handler = async (event, context, callback) => {
    console.log("Processing...");
      const params = {
      Entries: [ 
        {
          Detail: event.body,
          DetailType: 'CreateAppointment',
          EventBusName: 'dentistimoEventBus',
          Source: 'Test',
          Time: new Date 
        }
      ]
    };
    // const params = {
    //     Entries: [ 
    //   {
    //     Detail: JSON.stringify({
    //       "clinicId": event.clinicId,
    //       "date": event.date,
    //       "time": event.time,
    //       "email": event.email,
    //     }),
    //     DetailType: 'CreateAppointment',
    //     EventBusName: 'dentistimoEventBus',
    //     Source: 'Test',
    //     Time: new Date 
    //   }
    // ]
    // };
    const response = {
    statusCode: 200,
    isBase64Encoded : false,
    headers : {"content-type" : "application/json"},
    body: JSON.stringify(params)
  };
    console.log(JSON.stringify(params));
  // Publish to EventBridge
  const result = await eventBridge.putEvents(params).promise()
  console.log(result)
  //todo: handle error 
  return response
};