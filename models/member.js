"use strict";

const _ = require("lodash");
const jsonStore = require("./json-store");

const member = {
  store: new jsonStore("./models/member-store.json", { members: [] }),
  collection: "members",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },
  setMemberAssessmentNumber(memberID, assessmentNum){
    let member = this.store.findOneBy(this.collection, { id: memberID });
    member.numOfAssessments = assessmentNum;
  },
  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  removeMember(id) {
    const member = this.getMemberById(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

};

module.exports = member;