'use strict';
const AWS = require('aws-sdk');

//AWS.config.Update({ region: "eu-central-1"});

exports.handler = async(event, context, callback) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    let result = {};
    let timeSlots;

//
    //  return {
    //     statusCode : 200,
    //     body: JSON.stringify({
    //         "id":event.pathParameters.clinicId,
    //         "date":event.pathParameters.date
    //     }),
    //     isBase64Encoded : false,
    //     headers:{"content-type" : "application/json"}
          
    // };

//

    // to be changed upon template update (it should be clinicId instead)
    const responseClinic = await getClinic( event.pathParameters.clinicId);
    
    if(JSON.stringify(responseClinic)!=="{}") {

        const responseBooking = await getSchedule(event.pathParameters.clinicId, event.pathParameters.date);
        
        console.log("responseB " + responseBooking.Item + " " + JSON.stringify(responseBooking));
        
        // if(responseBooking === null) {
        //     //todo
        // }
            
        if(JSON.stringify(responseBooking)=="{}" ) {
           
             
            const openingHours = responseClinic.Item.openinghours;
            console.log("test" + openingHours);
            
            // parse opening hours for the day from clinic record to create a new
            // availability array
            timeSlots = parseOpeningHours(openingHours, event.pathParameters.date);
            
            result = {
                clinicId: event.pathParameters.clinicId,
                date: event.pathParameters.date,
                timeSlots: timeSlots
            };
            
            console.log("New entry");
    
            return {
                statusCode : 200,
                body: JSON.stringify(result),
                isBase64Encoded : false,
                headers:{
                    "content-type" : "application/json",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                }
            };
                
        } else if(JSON.stringify(responseBooking)===null) {
            // this is an error case...throw the circuit breaker here
            console.log("get booking response is null");
            
            // if no clinic exists then return a bad record to the client
            // client will check for clinicId 0, and show error if it sees it
            result = {
                clinicId: "0",
                date: 19700101,
                timeSlots: null
            };
            
            console.log ("Error entry");

            return {
                statusCode : 404,
                body: JSON.stringify(result),
                isBase64Encoded : false,
                headers:{
                    "content-type" : "application/json",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                }
            };
            
    
        } else {
            
            const slots = responseBooking.Item.timeSlots.L;
            const dentists = responseClinic.Item.dentists.N;
            
            // parse the existing schedule
            let parsedTimeSlots = parseTimeSlots( dentists, slots );
    
            result = {
                clinicId: event.pathParameters.clinicId,
                date: event.pathParameters.date,
                timeSlots: parsedTimeSlots
            };
            
            console.log("Existing entry");
            
            return {
                statusCode : 200,
                body: JSON.stringify(result),
                isBase64Encoded : false,
                headers:{
                    "content-type" : "application/json",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    
                }
            };
        }
        
    } else {
        result = ["Invalid Clinic "];
    // }
    
    return {
        statusCode : 404,
        body: JSON.stringify(result),
        isBase64Encoded : false,
        headers:{
            "content-type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    
    }

    async function getClinic(clinicId) {
        const paramsClinic = { TableName: "DentistimoClinicsTable",
            Key: {
                "clinicId":{
                    N:clinicId 
                },
            }
                
            };
        return await ddb.getItem(paramsClinic).promise();
        //return {"city":{"S":"Gothenburg"},"coordinate":{"M":{"longitude":{"N":"11.940386"},"latitude":{"N":"57.709872"}}},"dentists":{"N":"2"},"owner":{"S":"Carmen Corona"},"address":{"S":"Lindholmsallén 19"},"openinghours":{"M":{"wednesday":{"S":"7:00-12:00"},"thursday":{"S":"7:00-17:00"},"friday":{"S":"8:00-16:00"},"tuesday":{"S":"8:00-17:00"},"monday":{"S":"6:00-15:00"}}},"id":{"N":"3"},"name":{"S":"The Crown"}}
 
    }
    
    async function getSchedule(clinicId, date) {
        console.log(clinicId + " " + date);
        const paramsBooking = {
            TableName : "DentistimoAppointmentsTable",         
            Key: {             
                "clinicId": {
                    N: clinicId 
                    },             
                "date":{ 
                    S: date 
                },
            } 
        }; 
        
        return await ddb.getItem(paramsBooking).promise();
    }

    function parseOpeningHours(openingHours, date) {
        let openingHoursForDay;

        // console.log("OP " + JSON.stringify(openingHours));
        
        // const y = date.slice(0,4)
        // const m = date.slice(4,6)
        // const d = date.slice(6,8)
        
        // const ymd = y + "-" + m + "-" + d
        
        const parsedDate = new Date(date);
        const weekday = parsedDate.getDay();
        console.log("weekDay" + weekday);
        
        switch (weekday) {
            case 0:
                openingHoursForDay = openingHours.M.sunday;
            break;
            case 1:
                openingHoursForDay = openingHours.M.monday;
            break;
            
            case 2:
                openingHoursForDay = openingHours.M.tuesday;
            break;
            
            case 3:
                openingHoursForDay = openingHours.M.wednesday;
            break;
            
            case 4:
                openingHoursForDay = openingHours.M.thursday;
            break;
            
            case 5:
                openingHoursForDay = openingHours.M.friday;
            break;
            
            case 6:
                openingHoursForDay = openingHours.M.saturday;
            break;
    
        }
        
        if(typeof openingHoursForDay === "undefined") {
            return [];    
        } else {
            openingHoursForDay = openingHoursForDay.S;
        }
            
        console.log("check", openingHoursForDay);
        
        let hours = openingHoursForDay.split(":");
        let startH = parseFloat(hours[0]);
        
        
        hours = openingHoursForDay.split("-");
        const endH = parseFloat(hours[1].split(":")[0]);
        console.log("start hour", startH, "end hour", endH);
        
        let i = 0;
        let newTimeSlots=[];
        let t = "";
        
        while(startH <= endH - 0.5) {
            console.log("start of loop", startH, endH);
            t = parseInt(startH, 10);
        
            if(startH % 1 === 0.5) {
                t += ":30";    
            } else {
                t += ":00";    
            }

            if(t!=="14:30" && t!=="12:00" && t!=="12:30") {
                newTimeSlots[i] = {"time":t, "available":true};
                i++;
            }
    
            startH += 0.5;
            console.log("end of while", startH, endH);
        }
        console.log("out of while");
        return newTimeSlots;
        
    }
    
    function parseTimeSlots( dentists, input ) {
        let slots = [];
        let i = 0;
        console.log("dentists" + dentists);
        input.forEach(slot => {
            const bookings = slot.M.bookings.L;

            if(bookings.length < dentists){
                slots[i] = {"time":slot.M.time.S, "available":true};
                i++;
            } else {
                console.log(slot.M.time.S);
                slots[i] = {"time":slot.M.time.S, "available":false};
                i++;
            }
        });
        return slots;
    }
    
};
