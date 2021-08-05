'use strict';

// const Service = require('egg').Service;
const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  async getUser() {
    const { app } = this;
    return await app.mysql.select('user');
  }
  async setUser(body) {
    const { ctx, app } = this;
    const { roleId, userIds } = body;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('delete from role_user where role_id=?', [ roleId ]);
      userIds.forEach(async userId => {
        await conn.insert('role_user', { role_id: roleId, user_id: userId });
      });
      await conn.commit();
      ctx.success('success');
    } catch (error) {
      console.log(error, '======');
      await conn.rollback();
      ctx.err('fail');
    }
  }
  async getResource() {
    const { app } = this;
    return await app.mysql.select('resource');
  }
  async setResource(body) {
    const { ctx, app } = this;
    const { roleId, resourceIds } = body;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('delete from role_resource where role_id=?', [ roleId ]);
      resourceIds.forEach(async resourceId => {
        await conn.insert('role_resource', { role_id: roleId, resource_id: resourceId });
      });
      await conn.commit();
      ctx.success('success');
    } catch (error) {
      console.log(error, '======');
      await conn.rollback();
      ctx.err('fail');
    }
  }
}

module.exports = RoleService;
