'use strict'  
const AWS = require('aws-sdk'); 
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});
exports.handler = function(event, context, callback) {     
    let queryRecord = {         
        TableName : "DentistimoBookings",         
        Key: {             
            "clinicId": event.detail.clinicId,             
            "date": event.detail.date,                    
        } 
    }
    
    documentClient.get(queryRecord, async function(err, data){        
        let selectedClinic = await getClinicData(event);
        console.log(selectedClinic);
        let dentists = selectedClinic.dentists;
        let openingHours = selectedClinic.openinghours;        
        let record, newRecord, clinicHours;

        if( data !== null || typeof data != "undefined" ) { // If data exists
            record = await data.Item; // Assign data to record
            let time = event.detail.time;
            let bookings = event.detail.email;

          if(record == null) {
              console.log("new item created");
              
              clinicHours = parseOpeningHours(openingHours, event.detail.date); // Parse timeslots to create bookable times
              console.log("parsed hours:" + JSON.stringify(clinicHours));

              event.TtmeSlots = clinicHours; // Assign newly created time slots to payload's Timeslot
              newRecord = createNewBooking(event, clinicHours); // Adds new record if clinic and date do not exist
              
              let timeSlots = newRecord.timeSlots;

              newRecord = updateBooking(newRecord, time, bookings, dentists); // Update the record as allowed with requested booking from payload
              
              console.log("new record with parsed and payload: " + JSON.stringify(newRecord));

          } else if (record) { // When a record for clinic and date already exists            
              let timeSlots = record.timeSlots;
      
              console.log("if record exists " + JSON.stringify(event));
  
              newRecord = updateBooking(record, time, bookings, dentists); // Update the record as allowed with requested booking from payload
              
              console.log("update booking gave us: " + JSON.stringify(timeSlots));
  
              console.log("this is new record " + JSON.stringify(record));                
          }

          await writeBooking(newRecord); // Write the record to the database
    
          callback(null, data);
        } else {
            // why is data null or undefined? this is a system error, throw
            // the circuit breaker
            callback(err, null);
        }
    }); 
}

const getClinicData  = async function(event) { // Helper function to retrieve clinic data 
    let num = -1;
    let params = {         
        TableName : "DentistimoClinicsTable",         
        Key: {             
            "clinicId": parseInt(event.detail.clinicId)
        } 
    }  
    const myResolve = (myParam) => {
        num = myParam;
    }
    const myReject = (myParam) => {
        console.log(myParam);
    }

    await documentClient.get(params)
        .promise()
        .then((data) => {     
            num = -3;
            let clinic = data.Item;
            myResolve(clinic);
        }).catch((err) => {
            console.log(err);
            myReject(err);
        });
    return num;
}

const createNewBooking = function(event, clinicHours) { // Creates a new record with the passed payload
    let newRecord = {                 
      "clinicId": event.detail.clinicId,             
      "date": event.detail.date,
      "timeSlots": clinicHours                
    };  

    return newRecord;
}

const writeBooking = async function(record) { // Helper function that writes a new booking
  let query = {         
    TableName : "DentistimoBookings",         
    Item: record               
}  

  let num = -1;
  const myResolve = (myParam) => {
    num = myParam;
  }

  const myReject = (myParam) => {
      console.log(myParam);
  }

  let writeMe = await documentClient.put(query)
  .promise()
      .then((data) => {     
          console.log(num);
          myResolve(data);
      }).catch((err) => {
          console.log(err);
          myReject(err);
      });
  return writeMe;  
}

/* 
 *Lines 131 - 215 authored by Ella 
 */

const parseOpeningHours = function(openingHours, date) {
    let openingHoursForDay;

    console.log("OP " + JSON.stringify(openingHours));
    
    const y = date.slice(0,4)
    const m = date.slice(4,6)
    const d = date.slice(6,8)
    
    const ymd = y + "-" + m + "-" + d
    
    const parsedDate = new Date(ymd)
    const weekday = parsedDate.getDay()
    console.log("weekDay" + weekday)
    
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
        
    console.log("check", openingHoursForDay)
    let hours = openingHoursForDay.split(":")
    let startH = parseFloat(hours[0])
    console.log(startH)
    hours = openingHoursForDay.split("-")
    const endH = parseFloat(hours[1].split(":")[0])
   
    let i = 0
    let newTimeSlots=[]
    let t = ""
    
    // While clinic for hours are within range of start to (end - 0.5)
    while(startH <= endH - 0.5) {
        // Assign starting hour to t and cast as Int
        t = parseInt(startH);
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
}

const updateBooking = function(record, inputTime, email, dentists) {  
    console.log("updateBooking");

    let timeSlots = record.timeSlots;

    console.log("clinicId: " + JSON.stringify(record.clinicId) + 
        ", payload time: " + JSON.stringify(typeof inputTime) + 
        ", payload email: " + JSON.stringify(email) );
   
    if (timeSlots.length > 0) {  // if there are timeslots on the given day...
        // check if record for a given time exists
        let found = timeSlots.find(element => (element.time == inputTime)); // check if record for a given time exists
        
        console.log("found bookings for this time: " + JSON.stringify(found) );
        
        if ( (! found || typeof found === "undefined" ) ) { // this timeslot is not available
            // send a mail saying the requested date is not available for booking (failed)
            console.log("didn't find the record");

        } else {  // the timeslot is available, see if it is available        
            let allBookings = found.bookings // bookings arrays for this time
            let bookings = found.bookings.length // number of emails stored within selected time
            
            console.log(" dentists: " + JSON.stringify(dentists) + 
                " existing email(s) for this time: " + JSON.stringify(allBookings)+
                " input: " + JSON.stringify(inputTime));
                
            if (bookings < dentists) { // compare amount of bookings to num of dentists
                let newBookings = allBookings.splice(allBookings, 0, email); // add email to email array
                found.bookings = allBookings;
                console.log("after splice, record:" + JSON.stringify(found) );

                let foundIndex = record.timeSlots.indexOf(found); // Retrieves index of element we are looking for within the array
                record.timeSlots[foundIndex] = found; // Updates value stored in array for updated newBookings val in entire record               
                console.log(
                    "index in time slot: " + JSON.stringify(foundIndex) +
                    "\nnew record timeslots " + JSON.stringify(record.timeSlots) );

            } else { // When a time is fully booked, return error email
                console.log("error: reached limit of " + JSON.stringify(bookings) + " bookings for this time.");
            }
            console.log("all bookings:" + JSON.stringify(allBookings));
        } 
    }
    return record;
}