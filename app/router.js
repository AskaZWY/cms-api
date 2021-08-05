'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('user', '/api/user', controller.user);
  router.resources('role', '/api/role', controller.role);
  router.resources('resource', '/api/resource', controller.resource);
  router.resources('roleResource', '/api/roleResource', controller.roleResource);
  router.resources('roleUser', '/api/roleUser', controller.roleUser);


  router.get('/api/role/getUser', controller.role.getUser);
  router.post('/api/role/setUser', controller.role.setUser);
  router.get('/api/role/getResource', controller.role.getResource);
  router.post('/api/role/setResource', controller.role.setResource);

  router.get('/api/captcha', controller.captcha.index);
  router.post('/api/checkCaptcha', controller.captcha.checkCaptcha);

  router.post('/api/signup', controller.user.signup); // 注册
  router.post('/api/signin', controller.user.signin); // 登录
  // router.get('/api/role/getRole', controller.role.getRole);
  // router.post('/api/role/setRole', controller.role.setRole);
};
