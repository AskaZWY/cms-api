'use strict';
const { verify } = require('jsonwebtoken');

function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    verify(token, secret, function(err, payload) {
      if (err) {
        reject(err);
      } else {
        console.log(payload);
        resolve(payload);
      }
    });
  });
}
module.exports = (options, app) => {
  return async (ctx, next) => {
    // const authUrls = options.authUrls;
    const { authUrls } = app.config.auth;
    const { jwtSecret } = app.config;
    // console.log(authUrls, ctx.url);
    if (authUrls.includes(ctx.url)) {
      const token = ctx.get('Authorization');
      if (token) {
        try {
          const payload = await verifyToken(token, jwtSecret);
          ctx.session.payload = payload;
          await next();
        } catch (error) {
          ctx.err('需要登陆', 401);
        }
      } else {
        ctx.err('没有token', 401);
      }
    } else {
      await next();
    }
  };
};
