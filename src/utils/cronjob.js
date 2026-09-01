const cron = require("node-cron");
const {subDays, startOfDay, endOfDay} = require("date-fns");

cron.schedule("0 8 * * *", () => {
    try {
        const yesterday = subDays(new Date(), 1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }).populate("fromUserId toUserId");
        
    } catch (error) {
        console.error(err);
    }
})