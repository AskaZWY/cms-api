'use strict';

// const Service = require('egg').Service;
const BaseService = require('./base');

class RoleUserService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role_user';
  }
}

module.exports = RoleUserService;
