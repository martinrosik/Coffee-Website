const cron = require("node-cron");
const sendEmail = require("./mailer");

function scheduleReservationReminder(reservation) {
  const reminderDate = new Date(reservation.reservationDate);
  reminderDate.setHours(reminderDate.getHours() - 24);

  const minute = reminderDate.getMinutes();
  const hour = reminderDate.getHours();
  const day = reminderDate.getDate();
  const month = reminderDate.getMonth() + 1;

  const cronTime = `${minute} ${hour} ${day} ${month} *`;

  cron.schedule(cronTime, () => {
    sendEmail(
      reservation.email,
      "Reservation Reminder",
      `Hi ${reservation.name}, this is a reminder for your reservation at ${reservation.reservationDate}`
    );
  });

  console.log(`Scheduled email for ${reservation.name} at ${reminderDate}`);
}

module.exports = scheduleReservationReminder;
