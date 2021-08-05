'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base');
const { sign } = require('jsonwebtoken');
class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
  // 注册
  async signup() {
    const { ctx, app } = this;
    const { body } = ctx.request;
    const { agreement, phoneBefore, repassword, phone, captcha, ...user } = body;
    user.phone = phoneBefore + phone;
    // console.log(captcha, ctx.session.captcha);

    if (captcha !== ctx.session.captcha) {
      console.log(ctx.cookies.get('EGG_SESS'));
      console.log('ffffffff');
      return ctx.err('验证码不正确');
    }
    if (user.password !== repassword) {
      return ctx.err('密码不一致');
    }
    // await this.create();
    const finduser = await this.app.mysql.select('user', { where: { username: user.username }, limit: 1 });
    // console.log(finduser, '+++++');
    if (finduser && finduser.length > 0) {
      return ctx.err('用户名已存在');
    }
    const res = await app.mysql.insert('user', user);
    res.affectedRows > 0 ? ctx.success({
      id: res.insertId,
    }) : ctx.err('创建失败');
  }
  // 登录
  async signin() {
    console.log('login');
    const { ctx, config } = this;
    const { username, password } = ctx.request.body;
    let user = await this.app.mysql.select('user', { where: { username, password }, limit: 1 });
    if (user && user.length > 0) {
      // ctx.success(user);
      user = JSON.parse(JSON.stringify(user[0]));
      delete user.password;
      // 登录成功后要查询此用户拥有的访问权限
      // 先查此用户属于什么角色，在查此角色拥有哪些权限
      const sql = `
        SELECT resource.* FROM user INNER JOIN 
        role_user ON user.id = role_user.user_id INNER JOIN 
        role_resource ON role_user.role_id = role_resource.role_id INNER JOIN
        resource ON role_resource.resource_id = resource.id
        where user.id = ?
      `;
      const authList = await this.app.mysql.query(sql, [ user.id ]);
      const resources = [];
      const sourceMap = {};
      authList.forEach(resc => {
        resc.children = [];
        sourceMap[resc.id] = resc;
        if (resc.parent_id === 0) {
          resources.push(resc);
        } else {
          sourceMap[resc.parent_id] && sourceMap[resc.parent_id].children.push(resc);
        }

      });
      user.resources = resources;
      ctx.success({ token: sign(user, config.jwtSecret), resources });
    } else {
      ctx.err('用户名或者密码不正确');
    }
  }
}

module.exports = UserController;
