const client = require("../utils/Client");
const controllers = require("../controllers");
const { allBookedAppointments, confirmAppointment } = controllers.bookings;


const options = {
  // If function takes longer than 3 seconds, trigger a failure
  // After 30 seconds, try again.
};

//** To do once API Gateway is up and running **/


module.export = client;