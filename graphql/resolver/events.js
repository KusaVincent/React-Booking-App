const Event = require("../../models/event");
const { dateToString } = require("../../helpers/date");
const { transformEvent } = require("./merge");

module.exports = {
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return transformEvent(event);
        });
      })
      .catch(err => {
        throw err;
      });
  },

  createEvent: args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: "5e34fcf9b7f975266c5388da"
    });
    let createdEvent;
    return event
      .save()
      .then(result => {
        createdEvent = transformEvent(result);
        return User.findById("5e34fcf9b7f975266c5388da");
      })
      .then(user => {
        if (!user) {
          throw new Error("user not found");
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
