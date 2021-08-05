'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  async index(pageNum, pageSize, where) {
    // console.log(where, 'ggg');
    // where = { where: {} };
    const { app } = this;
    const list = await app.mysql.select(this.entity, {
      where,
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    const count = await app.mysql.count(this.entity, where);
    return { list, count };
  }
  async create(entity) {
    const { app } = this;
    return await app.mysql.insert(this.entity, entity);
  }
  async update(id) {
    const { ctx, app } = this;
    const entity = await app.mysql.select(this.entity, { where: { id } });
    // console.log(user, id, '------');
    // user.username = 'gggg';
    // user = JSON.parse(JSON.stringify(user))
    const body = ctx.request.body;
    delete entity['0'];
    // for (const key in body) {
    //   entity[key] = body[key];
    // }
    Object.assign(entity, body);
    return await app.mysql.update(this.entity, entity, { where: { id } });
  }
  async delete(ids) {
    const { app } = this;
    return await app.mysql.delete(this.entity, { id: ids });
  }
}

module.exports = BaseService;
