const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'eu-north-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'dentistimo-registry';
const healthPath = '/health';
const clinicPath = '/clinic';
const clinicsPath = '/clinics';
const appointmentPath = '/appointment';
const appointmentsPath = '/appointments';

exports.handler = async function (event) {
  console.log('Request event: ', event);
  let response;

  switch(true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === clinicPath:
      response = await getClinic(event.queryStringParameter.clinicId);
      break;
    case event.httpMethod === 'GET' && event.path === clinicsPath:
      response = buildResponse(200);
      break;
  }
}