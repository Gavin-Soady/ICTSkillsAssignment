"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const member = require("../models/member.js");
const gymUtility = require("../models/gym-utility.js");

const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);

    const viewData = {
      title: "Member Dashboard",
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id).reverse(),
      member: member.getMemberById(loggedInMember.id),
      BMI : gymUtility.getBMI(loggedInMember.id),
      BMICategory: gymUtility.getBMICategory(loggedInMember.id),
      isIdealWeight: gymUtility.isIdealBodyWeight(loggedInMember.id),
      trend: gymUtility.getTrend(loggedInMember.id),
      goalReached: gymUtility.isGoalReached(loggedInMember.id)
    };
    logger.info("about to render", viewData);
    response.render("dashboard", viewData);
  },

  deleteAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    let trend = gymUtility.getTrend(loggedInMember.id, request.body.weight);

    const newAssessment = {
      id: uuid.v1(),
      memberId: loggedInMember.id,
      date: new Date().toString().substring(4, 16),
      time: new Date().toString().substring(16, 25),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      trend:trend
    };
    logger.debug("Adding a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  loadMemberGoalPage(request, response){
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Add Member Goal",
      member:loggedInMember
    }
    response.render("setGoal", viewData);
  },
  setMemberGoal(request, response){
    const loggedInMember = accounts.getCurrentMember(request);
    gymUtility.setGoal(loggedInMember.id, request.body.goal);
    //gymUtility.isGoalReached(loggedInMember.id);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;

