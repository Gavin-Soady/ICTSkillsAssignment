"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const trainer = {
  store: new JsonStore("./models/trainer-store.json", { trainer: [] }),
  collection: "trainers",

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  }
};

module.exports = trainer;