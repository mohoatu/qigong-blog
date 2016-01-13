var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'qigong-blog'
    },
    port: 3000,
    db: 'mongodb://localhost/qigong-blog-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'qigong-blog'
    },
    port: 3000,
    db: 'mongodb://localhost/qigong-blog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'qigong-blog'
    },
    port: 3000,
    db: 'mongodb://localhost/qigong-blog-production'
  }
};

module.exports = config[env];
