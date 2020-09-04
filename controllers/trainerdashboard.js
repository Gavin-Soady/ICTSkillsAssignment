"use strict";

const accounts = require("./accounts.js");
const _ = require("lodash");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const member = require("../models/member.js");
const gymUtility = require("../models/gym-utility.js");
const uuid = require("uuid");

const trainerDashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    let allMembers = member.getAllMembers();
    allMembers = _.orderBy(allMembers, ["name"], ['asc']);
    for (let x = 0; x < allMembers.length;x++){
      member.setMemberAssessmentNumber(allMembers[x].id, assessmentStore.getMemberAssessments(allMembers[x].id).length)
    }
    const viewData = {
      title: "Members List",
      members: allMembers,    };
    //logger.info(viewData);
    response.render("membersList", viewData);
  },
  showMember(request, response){
    const viewData = {
      title: "Trainer Dashboard",
      member: member.getMemberById(request.params.id),
      assessments: assessmentStore.getMemberAssessments(request.params.id).reverse(),
      BMI: gymUtility.getBMI(request.params.id),
      BMICategory: gymUtility.getBMICategory(request.params.id),
      isIdealWeight: gymUtility.isIdealBodyWeight(request.params.id),
      trend: gymUtility.getTrend(request.params.id),
      goalReached: gymUtility.isGoalReached(request.params.id)
      };
    //logger.info(viewData);
    response.render("trainerDashboard", viewData);

  },

  deleteAssessment(request, response) {
    //const loggedInMember = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    //logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/showmember/"+request.params.member.id);
  },

  addAssessment(request, response) {
    let trend = gymUtility.getTrend(request.params.id, request.body.weight);
    const newAssessment = {
      id: uuid.v1(),
      memberId: request.params.id,
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
    response.redirect("/showmember/"+request.params.id);
  },
  addComment(request, response){

    let memberAssessment =  assessmentStore.getAssessment(request.params.id);
    memberAssessment.comment = request.body.comment;
    logger.info("Whats in the Params??", request.params.id);
    response.redirect("/showmember/"+request.params.memberid);
  }
  ,
  loadMemberGoalPage(request, response){
  const viewData = {
    title: "Add Member Goal",
    memberID: request.params.id
  }
  response.render("setGoalTrainer", viewData);
},
  setMemberGoal(request, response){
    gymUtility.setGoal(request.params.id, request.body.goal,request.body.goalachieved);
    gymUtility.isGoalReached(request.params.id);
    response.redirect("/showmember/"+request.params.id);
  }
};

module.exports = trainerDashboard;

