'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async index() {
    const { ctx, app, service } = this;
    let { pageNum, pageSize, ...where } = ctx.query;
    console.log(typeof where);
    // console.log(JSON.stringify(where));
    // console.log(JSON.parse(where), '===-=-=');
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 3 : parseInt(pageSize);
    const entitys = await service[this.entity].index(pageNum, pageSize, where);
    entitys.pageSize = pageSize;
    entitys.pageNum = pageNum;
    // console.log(entitys);
    entitys && ctx.success(entitys);
  }
  async create() {
    const { ctx, app, service } = this;
    const entity = ctx.request.body;
    const res = await service[this.entity].create(entity);
    res.affectedRows > 0 ? ctx.success('创建成功') : ctx.err('创建失败');
  }
  async update() {
    const { ctx, app, service } = this;
    const { id } = ctx.params;
    // const user = ctx.request.body
    const res = await service[this.entity].update(id);
    res.affectedRows > 0 ? ctx.success('更新成功') : ctx.err('更新失败');
  }
  async destroy() {
    const { ctx, app, service } = this;
    const { id } = ctx.params;
    let ids = ctx.request.body;
    if (Object.keys(ids).length === 0) {
      ids = [ id ];
    }
    // console.log(ids); ['1']
    const res = await service[this.entity].delete(ids);
    res.affectedRows > 0 ? ctx.success('删除成功') : ctx.err('删除失败');
  }
}

module.exports = BaseController;
