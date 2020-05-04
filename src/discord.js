import discord from 'discord.js';

export default class Discord {
  client = null;

  constructor(token) {
    this.client = new discord.Client();

    this.client.on('ready', () => {
      this.client.user.setStatus('online');
    });

    this.client.login(token);
  }

  async waitForLogin(interval = 1000, maxRetries = 5) {
    for (let retries = 0; retries < maxRetries; retries++) {
      await new Promise((resolve) => {
        setTimeout(resolve, interval);
      });

      if (this.client.readyAt) {
        return;
      }
    }

    throw new Error(`Failed to login to Discord - timeout after ${(maxRetries * interval) / 1000}s`);
  }

  // Asskandi is US Eastern
  getScheduleEvents(serverTimezone = 'America/New_York') {
    return [
      {
        summary: 'Rallying Cry (Onyxia)',
        description: 'Marisa - Aptitude',
        date: new Date(),
      },
    ];
  }

  disconnect() {
    this.client.destroy();
  }
}
