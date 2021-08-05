/* eslint-disable strict */
module.exports = {
  success(data, status = 200) {
    this.body = {
      code: 0,
      data,
      status,
    };
  },
  err(data, status = 404) {
    this.body = {
      code: 1,
      data,
      status,
    };
  },
};
