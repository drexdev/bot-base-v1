const { Event } = require("../base");
const config = require("../config/client.json");

new Event({
  name: "ready",
  execute(client) {
    const status = config.status;
    const time = config.statusTime;

    let index = 0;

    const nextStatus = () => {
      client.user.setActivity(status[index]);
      index = (index + 1) % status.length;
    };

    nextStatus();
    setInterval(nextStatus, time);
  },
});
