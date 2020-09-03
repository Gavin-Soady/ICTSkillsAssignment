'use strict';

const userstore = require('../models/userStore');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  addNewMemberPage(request, response) {
    const viewData = {
      title: "Add New Member"
    };
    response.render("addNewMember", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },
  
  addNewMember(request, response) {
    const newMember = request.body;
    newMember.id = uuid.v1();
    member.addMember(newMember );
    logger.info(`registering ${newMember .email}`);
    response.redirect("/trainerdashboard");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && user.password == request.body.password) {
      response.cookie('playlist', user.email);
      logger.info(`logging in ${user.email}`)
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
