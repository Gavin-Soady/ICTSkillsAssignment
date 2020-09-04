"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const accounts = require("./controllers/accounts.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");

//get
router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/addnewmemberpage", accounts.addNewMemberPage);
router.get("/logout", accounts.logout);
router.get("/dashboard", dashboard.index);
router.get("/trainerdashboard", trainerdashboard.index);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);
router.get("/trainerdashboard/deleteassessment/:id", trainerdashboard.deleteAssessment);
router.get("/about", about.index);
router.get("/showMember/:id",trainerdashboard.showMember);
router.get("/settings/:id", accounts.loadSettingsPage);
router.get("/accounts/deleteMember/:id", accounts.deleteMember);
router.get("/getgoalpage", dashboard.loadMemberGoalPage);
router.get("/getgoalpagetrainer/:id", trainerdashboard.loadMemberGoalPage);

//post
router.post("/register", accounts.register);
router.post("/registernewmember", accounts.addNewMember);
router.post("/authenticate", accounts.authenticate);
router.post("/dashboard/addassessment", dashboard.addAssessment);
router.post("/trainerdashboard/addassessment/:id", trainerdashboard.addAssessment);
router.post("/assessment/:memberid/addcomment/:id", trainerdashboard.addComment);
router.post("/updateSettings/:id", accounts.updateSettings);
router.post("/setgoal", dashboard.setMemberGoal);
router.post("/setgoaltrainer/:id", trainerdashboard.setMemberGoal);

module.exports = router;
