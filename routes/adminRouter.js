const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose= require('mongoose');
const express= require('express');

const ProgrammingTopics=require('../models/programmingTopics');
const ProgrammingQuestions=require('../models/programmingQuestions');

AdminBro.registerAdapter(AdminBroMongoose)

const app=express()

const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [{
    resource: ProgrammingTopics,
    resource: ProgrammingQuestions,
  }],
  rootPath: '/admin',
})

const ADMIN = {
  email: 'test@example.com',
  password: 'password',
}

const adminRouter=AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
    return null
  },
  cookieName: 'adminbro',
  cookiePassword: "this secret message won't allow you to hack this token",
})


module.exports= adminRouter;
