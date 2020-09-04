"use strict";

const member = require("../models/member");
const trainer = require("../models/trainer");

const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Welcome to Super Gym"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to our Super Gym"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("member", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Sign Up to our Super Gym"
    };
    response.render("signup", viewData);
  },
  addNewMemberPage(request, response) {
    const viewData = {
      title: "Add New Member"
    };
    response.render("addnewmember", viewData);
  },

  register(request, response) {
    const newMember = request.body;
    newMember.id = uuid.v1();
    member.addMember(newMember );
    logger.info(`registering ${newMember .email}`);
    response.redirect("/");
  },

  addNewMember(request, response) {
    const newMember = request.body;
    newMember.id = uuid.v1();
    member.addMember(newMember );
    logger.info(`registering ${newMember .email}`);
    response.redirect("/trainerdashboard");
  },

  authenticate(request, response) {
    const memberCheck = member.getMemberByEmail(request.body.email);
    if (memberCheck && memberCheck.password == request.body.password) {
      response.cookie("playlist", memberCheck.email);
      logger.info(`logging in ${memberCheck.email}`);
      response.redirect("/dashboard");
    } else {
      const trainerCheck = trainer.getTrainerByEmail(request.body.email);
      if (trainerCheck && trainerCheck.password == request.body.password) {
        response.cookie("playlist", trainerCheck.email);
        logger.info(`logging in ${trainerCheck.email}`);
        response.redirect("/trainerdashboard");
      } else{
        response.redirect("/login");
      }
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.playlist;
    return member.getMemberByEmail(memberEmail);
  },
  loadSettingsPage(request,response){
    const viewData = {
      title: "Update settings",
      member: member.getMemberById(request.params.id)
    };
    response.render("settings", viewData);

  },
  updateSettings(request,response){

    const updateMember = member.getMemberByEmail(request.body.email);


    updateMember.name = request.body.name;
    logger.info(`logging in ${updateMember.name}`);
    updateMember.gender = request.body.gender;
    updateMember.email = request.body.email;
    updateMember.password = request.body.password;
    updateMember.address = request.body.address;
    updateMember.height = request.body.height;
    updateMember.startingWeight = request.body.startingWeight;

     response.redirect("/dashboard");

  },
  deleteMember(request,response){
    member.removeMember(request.params.id);
    response.redirect("/trainerdashboard");
  },


};

module.exports = accounts;