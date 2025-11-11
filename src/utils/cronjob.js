const cron = require("node-cron");
const sendEmail = require("./sendEmail");
import ConnectionRequestModel from "../models/connectionRequest";
const { subDays, startOfDay, endOfDay } = require("date-fns");

// scheduled for every morining At 8 AM 

cron.schedule("0 8 * * *", async () => {
  // Send emails to all people who got friend requests the previous day

  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((request) => request.fromUserId.email)),
    ];

    for (const email of listOfEmails) {
      //send emails
      try {
        const res = await sendEmail.run(
          "New friend Request pending for " + email,
          "There are so many friend requests pending, Please login to DevTinder and accept or reject the request."
        );
      } catch (error) {
        console.log(error);
        }
    }
  } catch (error) {
    console.log(error);
  }
});
