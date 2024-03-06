module.exports = {
    apps: [{
      name: 'Surtigas_bot',
      script: 'index.js',
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'production'
      }
    }]
  };
  