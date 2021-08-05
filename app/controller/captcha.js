'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');
class CaptchaController extends Controller {
  async index() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({});
    ctx.session.captcha = captcha.text;
    console.log(ctx.session.captcha);
    ctx.set('Content-Type', 'image/svg+xml');
    // ctx.success(captcha.data);
    ctx.body = captcha.data;
  }
  async checkCaptcha() {
    const { ctx } = this;
    const { captcha } = ctx.request.body;
    // console.log(captcha);
    // console.log(ctx.session.captcha);
    if (captcha.toLowerCase() === ctx.session.captcha.toLowerCase()) {
      ctx.success('验证码识别成功');
    } else {
      ctx.err('验证码错误');
    }
  }
}

module.exports = CaptchaController;
