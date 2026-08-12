/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path')

module.exports = {
  apps: [
    {
      name: 'joshuas-point-preview',
      cwd: __dirname,
      script: path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next'),
      args: 'start --hostname 0.0.0.0 --port 3001',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
  ],
}
