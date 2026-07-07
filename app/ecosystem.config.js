// PM2 config - keeps the app running on the EC2 instance
module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'app.js',
      env: {
        PORT: 3000,
      },
    },
  ],
};
