'use strict';  
const AWS = require('aws-sdk'); 
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
var ses = new AWS.SES({ region: "us-east-1" });
var log = true;

function clog (message){
    if (log) {
        console.log(message);
    }
}

exports.handler = function(event, context, callback) { 
    let detail = event.detail;

    let queryRecord = {         
        TableName : "DentistimoAppointmentsTable",         
        Key: {             
            "clinicId": parseInt(detail.clinicId),             
            "date": detail.date,                    
        } 
    };
    
    clog("detail: "+ JSON.stringify(detail));
    
    try {

    documentClient.get(queryRecord, async function(err, data){        
        
        let selectedClinic = await getClinicData(detail);
        
        clog("selected clinic:" + JSON.stringify(selectedClinic) + "date: " + JSON.stringify(detail.date));
        clog("clinic id: " + selectedClinic.clinicId);
        
        let dentists = selectedClinic.dentists;
        let openingHours = selectedClinic.openinghours;        
        let record, newRecord, clinicHours;

        if( data !== null || typeof data != "undefined" ) { // If data exists
            record = await data.Item; // Assign data to record
            clog("record " + record);
            let time = detail.time;
            let bookings = detail.email;

          if(record == null) {
              clog("new item created");
              
              clinicHours = parseOpeningHours(openingHours, detail.date); // Parse timeslots to create bookable times
              clog("parsed hours:" + JSON.stringify(clinicHours));

              detail.timeSlots = clinicHours; // Assign newly created time slots to payload's Timeslot
              newRecord = createNewBooking(detail, clinicHours); // Adds new record if clinic and date do not exist
              
                 newRecord = updateBooking(newRecord, time, bookings, dentists, detail); // Update the record as allowed with requested booking from payload
              
              clog("new record with parsed and payload: " + JSON.stringify(newRecord));

          } else if (record) { // When a record for clinic and date already exists            
              let timeSlots = record.timeSlots;
      
              clog("if record exists " + JSON.stringify(detail));
  
              newRecord = updateBooking(record, time, bookings, dentists, detail); // Update the record as allowed with requested booking from payload
              
              clog("update booking gave us: " + JSON.stringify(timeSlots));
  
              clog("this is new record " + JSON.stringify(record));                
          }

          await writeBooking(newRecord); // Write the record to the database
        try {
             callback(null, data);
        } catch (e) {clog(e)}
        } else {
            // why is data null or undefined? this is a system error, throw
            // the circuit breaker
            const sysError = "as we are experiencing a system error.";
            denialMail(detail, sysError);
            
                callback(err, null);
        } 
    }); 
    } catch (e) {clog(e)}
};

const getClinicData  = async function(event) { // Helper function to retrieve clinic data 
    let num = -1;
    let params = {         
        TableName : "DentistimoClinicsTable",         
        Key: {             
            "clinicId": parseInt(event.clinicId)
        } 
    };  
    const myResolve = (myParam) => {
        num = myParam;
    };
    const myReject = (myParam) => {
        clog(myParam);
    };

    await documentClient.get(params)
        .promise()
        .then((data) => {     
            num = -3;
            let clinic = data.Item;
            myResolve(clinic);
        }).catch((err) => {
            clog(err);
            myReject(err);
        });
    return num;
};

const createNewBooking = function(event, clinicHours) { // Creates a new record with the passed payload
    let newRecord = {                 
      "clinicId": parseInt(event.clinicId),
      "date": event.date,
      "timeSlots": clinicHours
    };  

    return newRecord;
};

const writeBooking = async function(record) { // Helper function that writes a new booking
  let query = {         
    TableName : "DentistimoAppointmentsTable",         
    Item: record               
};  

  let num = -1;
  const myResolve = (myParam) => {
    num = myParam;
  };

  const myReject = (myParam) => {
      clog(myParam);
  };

  let writeMe = await documentClient.put(query)
  .promise()
      .then((data) => {     
          clog(num);
          myResolve(data);
      }).catch((err) => {
          clog(err);
          myReject(err);
      });
  return writeMe;  
};

/* 
 *Lines 131 - 215 authored by Ella 
 */

const parseOpeningHours = function(openingHours, date) {
    let openingHoursForDay;
    
    // clog("date for ella: " + typeof date);

    // clog("OP " + JSON.stringify(openingHours));
    
    // const y = date.slice(0,4);
    // const m = date.slice(4,6);
    // const d = date.slice(6,8);
    
    // const ymd = y + "-" + m + "-" + d;
    
    const parsedDate = new Date(date);
    const weekday = parsedDate.getDay();
    clog("weekDay" + weekday);
    
    switch (weekday) {
        case 0:
            openingHoursForDay = openingHours.sunday;
        break;
        case 1:
            openingHoursForDay = openingHours.monday;
        break;
        
        case 2:
            openingHoursForDay = openingHours.tuesday;
        break;
        
        case 3:
            openingHoursForDay = openingHours.wednesday;
        break;
        
        case 4:
            openingHoursForDay = openingHours.thursday;
        break;
        
        case 5:
            openingHoursForDay = openingHours.friday;
        break;
        
        case 6:
            openingHoursForDay = openingHours.saturday;
        break;

    }
    
    if(typeof openingHoursForDay === "undefined") {
        return [];    
    } else {
        openingHoursForDay = openingHoursForDay;
    }
        
    clog("check", openingHoursForDay);
    let hours = openingHoursForDay.split(":");
    let startH = parseFloat(hours[0]);
    clog(startH);
    hours = openingHoursForDay.split("-");
    const endH = parseFloat(hours[1].split(":")[0]);
   
    let i = 0;
    let newTimeSlots=[];
    let t = "";
    
    // While clinic for hours are within range of start to (end - 0.5)
    while(startH <= endH - 0.5) {
        // Assign starting hour to t and cast as Int
        t = parseInt(startH, 10);
        if(startH % 1 === 0.5) {
            // If number has a remainder of 0.5 number is a whole hour
            t += ":30";    
        } else {
             // If number remainder is 0 then it is a whole hour
            t += ":00";    
        }
 
        if(t!=="14:30" && t!=="12:00" && t!=="12:30") {
            // If time value are not any of the above then they are clear to check booking
            newTimeSlots[i] = {"time":t, "bookings":[]};
            // Increment array of newTimeslots generated
            i++;
        }

        startH += 0.5;
    }
    return newTimeSlots;
};

const updateBooking = function(record, inputTime, email, dentists, event) {  
    clog("updateBooking");

    let timeSlots = record.timeSlots;

    clog("clinicId: " + JSON.stringify(record.clinicId) + 
        ", payload time: " + JSON.stringify(typeof inputTime) + 
        ", payload email: " + JSON.stringify(email) );
   
    if (timeSlots.length > 0) {  // if there are timeslots on the given day...
        // check if record for a given time exists
        let found = timeSlots.find(element => (element.time == inputTime)); // check if record for a given time exists
        
        clog("found bookings for this time: " + JSON.stringify(found) );
        
        if ( (! found || typeof found === "undefined" ) ) { // this timeslot is not available
            // send a mail saying the requested date is not available for booking (failed)
            const doesNotExist = "as appointments for the selected time does not exist.";
            denialMail(event, doesNotExist);
            clog("didn't find the record");

        } else {  // the timeslot is available, see if it is available        
            let allBookings = found.bookings; // bookings arrays for this time
            let bookings = found.bookings.length; // number of emails stored within selected time
            
            clog(" dentists: " + JSON.stringify(dentists) + 
                " existing email(s) for this time: " + JSON.stringify(allBookings)+
                " input: " + JSON.stringify(inputTime));
                
            if (bookings < dentists) { // compare amount of bookings to num of dentists
                if (allBookings.includes(email)) {
                    const alreadyExists = "due to a previously confirmed appointment you have made for this date and time.";
                    clog(alreadyExists);
                    denialMail(event, alreadyExists); // denial mail
                    clog("Error: you have already booked an appointment for this time.");
                } else {
                    allBookings.splice(allBookings, 0, email); // add email to email array
                    found.bookings = allBookings;
                    clog("after splice, record:" + JSON.stringify(found) );

                    let foundIndex = record.timeSlots.indexOf(found); // Retrieves index of element we are looking for within the array
                    record.timeSlots[foundIndex] = found; // Updates value stored in array for updated newBookings val in entire record  
                    acceptanceMail(event); // send acceptance confirmation email to end user
                    clog(
                        "index in time slot: " + JSON.stringify(foundIndex) +
                        "\nnew record timeslots " + JSON.stringify(record.timeSlots) );
                }
            } else { // When a time is fully booked, return error email
                const fullyBooked = "as we are fully booked for this date and time.";
                denialMail(event, fullyBooked);
                clog("error: reached limit of " + JSON.stringify(bookings) + " bookings for this time.");
            }
            clog("all bookings:" + JSON.stringify(allBookings));
        } 
    }
    return record;
};
const acceptanceMail = async function (event) {
  var params = {
    Destination: {
      ToAddresses: [event.email],
    },
    Message: {
      Body: {
        Text: { Data: "Welcome! Your booking request was successful for " + event.date + 
            " at " + event.time + ". Thank you for choosing Dentistimo!" },
      },
      Subject: { Data: "Successful booking" },
    },
    Source: "dentistimogoteborg@gmail.com",
  };
  return ses.sendEmail(params).promise();
};

const denialMail = async function (event, message) {
  var params = {
    Destination: {
      ToAddresses: [event.email],
    },
    Message: {
      Body: {
        Text: { Data: "Hello! We regret to inform you that your booking request for " + event.date + 
            " at " + event.time + " cannot be completed, " + message + " Please try again." + "http://localhost:3000/"},
      },
      Subject: { Data: "Unsuccessful booking request" },
    },
    Source: "dentistimogoteborg@gmail.com",
  };
  return ses.sendEmail(params).promise();
};