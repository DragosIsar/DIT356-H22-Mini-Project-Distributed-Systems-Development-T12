const bookings = require("../models").bookings;
const clinics = require("../models").clinics;

// finds clinic by name
const findClinic = async (name) => {
  return await clinics.findOne({ name: name })
};

// appointment confirmation
const confirmAppointment = async (m) => {
  const obj = JSON.parse(m)
  // match clinic passed within object
  const clinic = await findClinic(obj.clinic);
  // create new booking
  const booking = await bookings
    .create({
      clinic: clinic._id,
      patient: obj.patient,
      time: obj.time,
      date: obj.date,
    })
    .then((res) => res)
    // set confirmation to false if error occurs
    .catch((err) => ({ confirmed: false }));
    // add new booking to all bookings
  const allBookings = { ...booking._doc };
  // if all bookings do not have confirmed as an attribute property
  if (!allBookings.hasOwnProperty["confirmed"]) {
    // set confirmation property to true
    allBookings["confirmed"] = true
    // assign all bookings of clinic to clinic
    allBookings.clinic = clinic;
  }
  return JSON.stringify(allBookings);
};


// gets all booked appointments for clinic
const allBookedAppointments = async (m) => {
  const msg = JSON.parse(m);

  const res = await bookings.find().populate("clinic").then(res => res).catch(err => []);
  console.log(res)
  return JSON.stringify({ message: msg, booked: res });
};

module.exports = {
  confirmAppointment: confirmAppointment,
  allBookedAppointments: allBookedAppointments,
};