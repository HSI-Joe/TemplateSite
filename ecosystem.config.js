module.exports = {
  apps: [{
    name: 'TemplateSite',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '35.168.77.218',
      key: '~/.ssh/ServerKeyPair.pem',
      ref: 'origin/master',
      repo: 'git@github.com:HSI-Joe/TemplateSite.git',
      path: '/home/ubuntu/TemplateSite',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
