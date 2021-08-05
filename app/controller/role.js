'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base');
class RoleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  async index() {
    // console.log('index');
    const { ctx, app, service } = this;
    let { pageNum, pageSize, ...where } = ctx.query;
    // console.log(JSON.stringify(where));
    // console.log(JSON.parse(where), '===-=-=');
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 3 : parseInt(pageSize);
    const entitys = await service[this.entity].index(pageNum, pageSize, where);
    // const { list } = await service[this.entity].index(pageNum, pageSize, where);
    const { list } = entitys;
    // console.log(entitys);

    for (let i = 0; i < list.length; i++) {
      let rows = await app.mysql.select('role_resource', {
        where: { role_id: list[i].id },
      });
      list[i].resourceIds = rows.map(row => row.resource_id);
      rows = await app.mysql.select('role_user', {
        where: { role_id: list[i].id },
      });
      list[i].userIds = rows.map(row => row.user_id);
    }
    // console.log(entitys);
    entitys.pageSize = pageSize;
    entitys.pageNum = pageNum;
    console.log(entitys);
    entitys && ctx.success(entitys);
  }
  async getUser() {
    const { ctx, service } = this;
    const user = await service.role.getUser();
    user && ctx.success(user);
  }
  async setUser() {
    const { ctx, service } = this;
    const body = ctx.request.body; // {roleId: 1, userIds: [1, 2, 3]}
    await service.role.setUser(body);
  }

  async getResource() {
    const { ctx, service } = this;
    const resource = await service.role.getResource();
    const resources = [];
    const sourceMap = {};
    resource.forEach(resc => {
      resc.children = [];
      sourceMap[resc.id] = resc;
      if (resc.parent_id === 0) {
        resources.push(resc);
      } else {
        sourceMap[resc.parent_id] && sourceMap[resc.parent_id].children.push(resc);
      }

    });
    ctx.success(resources);
  }

  async setResource() {
    const { ctx, service } = this;
    const body = ctx.request.body; // {roleId: 1, resourceIds: [1, 2, 3]}
    await service.role.setResource(body);
  }

}

module.exports = RoleController;
