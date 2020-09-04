"use strict";

const _ = require("lodash");
const member = require("./member");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");

const gymUtilities = {

  getBMI(memberID) {
    let memberAssessments = assessmentStore.getMemberAssessments(memberID);
    let weight = 0;
    if( memberAssessments.length >= 1){
       weight = memberAssessments[memberAssessments.length-1].weight;
    }
    else{
      weight = member.getMemberById(memberID).startingWeight;
    }
    let height = member.getMemberById(memberID).height;
    let BMI =  weight/((height/100)*(height/100));
    return BMI.toFixed(1);

  },
  getBMICategory(memberID) {
    let bmi =  this.getBMI(memberID);

    let bmiCategory = "";

    if(bmi< 18.5){
      bmiCategory = "Under Weight";
    }
    else if(bmi >= 18.5 && bmi <= 24.9){
      bmiCategory = "Normal Weight";
    }
    else if(bmi >= 25 && bmi <= 29.9){
      bmiCategory = "Over Weight";
    }
    else if(bmi >= 30 && bmi <= 39.9){
      bmiCategory = "Obese";
    }
    else {
      bmiCategory = "Very Severely Obese";
    }
    return bmiCategory;

  },
  isIdealBodyWeight(memberID){
    let isIdealWeight = false;
    let bmi =  this.getBMI(memberID);
    if(bmi >= 18.5 && bmi <= 24.9){
      isIdealWeight = true;
    }
    return isIdealWeight;
  },
  getTrend(memberID,newWeight){
    let trend = false;
    let memberAssessments = assessmentStore.getMemberAssessments(memberID);
    let weight = 0;
    if( memberAssessments.length >= 1){
      weight = memberAssessments[memberAssessments.length-1].weight;
    }
    else{
      weight = member.getMemberById(memberID).startingWeight;
    }
    //let trend = false;
    if( newWeight < weight ){
      trend = true;
    }

    return trend;

  },
  setGoal(memberID,memberGoal,isGoalReached){
    const setMemberGoal = member.getMemberById(memberID);
    setMemberGoal.goal = memberGoal;
    setMemberGoal.isGoalReached = isGoalReached;

  },
  isGoalReached(memberID){
    let isGoalReached=false;
    const setMemberGoal = member.getMemberById(memberID);
    if(setMemberGoal.isGoalReached === 'yes'){
      isGoalReached=true;
    }
    return isGoalReached;
  }

};

module.exports = gymUtilities;